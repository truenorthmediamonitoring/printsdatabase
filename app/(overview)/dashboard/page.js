import { ArrowRight, Megaphone, Newspaper, House, Text } from "lucide-react"
import Link from "next/link"
import { getServerSession } from "next-auth"
import userAccess from "@/app/lib/getUserAccess"
import { redirect } from "next/navigation"
import { Suspense } from "react"

import { getNewsItems } from "@/app/lib/getNewsItems"
import { getAdvertEntries } from "@/app/lib/getAdvertEntries"
import { getHeadlines } from "@/app/lib/getHeadlines"
import Stats from "@/app/ui/stats"
import { SizeStatsSkeleton, StatsSkeleton } from "@/app/ui/skeletons"
import AuthorizedUser from "@/app/ui/authorizeduser"
import DbSizeStats from "@/app/ui/dbstats"

export default async function Dashboard() {
    const session = await getServerSession()
    // console.log(session);
    const useraccess = await userAccess(session.user.email);
    // console.log(useraccess);

    const dashboardmenuitems = [
        {
            id: 0,
            path: "/adverts",
            menuitem: "Advert",
            icon: Megaphone,
        },
        {
            id: 1,
            path: "/news-items",
            menuitem: "News Item",
            icon: Newspaper,
        },
        {
            id: 2,
            path: "/headlines",
            menuitem: "Headlines",
            icon: Text,
        },
    ]

    const newsitems = await getNewsItems()
    const adverts = await getAdvertEntries()
    const headlines = await getHeadlines()
    // Convert data to a plain object
    const NewsItems = JSON.parse(JSON.stringify(newsitems));
    const Adverts = JSON.parse(JSON.stringify(adverts));
    const Headlines = JSON.parse(JSON.stringify(headlines));

    return (
        <div className="py-6 md:pt-24 px-4 md:px-10 h-screen rounded-lg bg-white/70 shadow-sm overflow-scroll">
            <div className="flex flex-wrap justify-between items-center gap-2 mb-10">
                <div className="">
                    {/* {useraccess === "Admin" && (
                        <AuthorizedUser />
                    )} */}
                    <Link href="/">
                        <button
                            className="btn-ghost btn-xs rounded-full flex justify-start items-center gap-1 shadow-sm transition-all bg-zinc-100 text-black mb-5">

                            <House size={15} />
                            <span className="text-xs">Homepage</span>
                        </button>
                    </Link>
                    <h1 className=" text-3xl text-black font-notosans font-bold leading-none">Dashboard</h1>
                    <p className="label-text text-black">Overview of adverts, news items, and headlines with quick navigation.</p>
                </div>
                {/* <DbSizeStats /> */}
            </div>

            {/* Stats */}
            <Suspense fallback={<StatsSkeleton />}>
                <Stats
                    NewsItems={NewsItems}
                    Adverts={Adverts}
                    Headlines={Headlines}
                />
            </Suspense>
            {/* Stats */}

            {/* <div className="flex flex-wrap justify-start items-center gap-3">
                {dashboardmenuitems.map((item) => (
                    <Link key={item.id} href={item.path}>
                        <button type="button" className="btn-ghost btn-sm text-black rounded-full flex items-center gap-2 bg-zinc-100 shadow-sm px-5 hover:bg-red-100 transition-all">
                            <item.icon size={20} className="text-red-700" />
                            <span className="font-bold">{item.menuitem}</span>
                            <ArrowRight size={15} />
                        </button>
                    </Link>
                ))}
            </div> */}
        </div>
    )
}