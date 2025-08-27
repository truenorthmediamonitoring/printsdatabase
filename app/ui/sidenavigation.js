"use client"

import Link from "next/link"
import Image from "next/image"
import { Dot, LayoutDashboard, LogOut, MoveRight, Building, Users, Factory, Newspaper, Megaphone, EllipsisVertical, Radio, Text, User, ShieldCheck, ShieldOff, SunMedium, SunDim, MoonStar, Moon } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { usePathname } from "next/navigation"

export default function SideNavigation({ UserAccess }) {
    const { data: session, status } = useSession();
    const pathname = usePathname()

    const navlinks = [
        {
            id: 0,
            path: "/dashboard",
            linkname: "Dashboard",
            icon: LayoutDashboard,
        },
        {
            id: 1,
            path: "/users",
            linkname: "Users",
            icon: Users,
        },
        {
            id: 2,
            path: "/companies",
            linkname: "Companies",
            icon: Building,
        },
        {
            id: 3,
            path: "/industries-categories",
            linkname: "Industries & Cates.",
            icon: Factory,
        },
        {
            id: 4,
            path: "/publications-sources",
            linkname: "Publications & Sources",
            icon: Radio,
        },
        {
            id: 5,
            path: "/adverts",
            linkname: "Adverts",
            icon: Megaphone,
        },
        {
            id: 6,
            path: "/headlines",
            linkname: "Headlines",
            icon: Text,
        },
        {
            id: 7,
            path: "/news-items",
            linkname: "News Items",
            icon: Newspaper,
        },
    ]

    // const countrycodes = [
    //     { id: 0, code: "gh" },
    //     { id: 1, code: "ng" },
    //     { id: 2, code: "ci" },
    // ]

    const houroftheday = new Date().getHours();



    return (
        <>
            <div className="flex h-full flex-col justify-between py-2 md:ps-1">
                <div>
                    {/* SideNav Logo & Title  */}
                    <div className="flex justify-between items-center gap-4 px-2 py-2 md:py-6 rounded-lg shadow-sm mb-2 border border-zinc-200 bg-white">
                        <Link href="/dashboard">
                            <div className="flex justify-start items-center gap-2">
                                <Image
                                    src="/tnmmlogotransparent.PNG"
                                    width={70}
                                    height={70}
                                    alt="True North Logo"
                                    className="rounded-full"
                                />
                                <div className="w-full md:w-32">
                                    <p className="font-notosans font-normal text-black text-xs leading-none pl-0.5">True North Media Monitoring Ltd</p>
                                    <h1 className="font-notosans font-black text-black text-2xl leading-none">Prints Database</h1>
                                    {/* Countries */}
                                    <div className="flex flex-row justify-start items-center gap-2 pl-0.5">
                                        <span style={{ fontSize: "9px" }}>GH</span>
                                        <span style={{ fontSize: "9px" }}>NG</span>
                                        <span style={{ fontSize: "9px" }}>CI</span>
                                        {/* {countrycodes.map((item) => (
                                                <Image
                                                    key={item.id}
                                                    className={`rounded-sm`}
                                                    src={`https://flagcdn.com/w40/${item.code}.png`}
                                                    width={10}
                                                    height={10}
                                                    alt="Country flag"
                                                />
                                            ))} */}
                                    </div>

                                </div>
                            </div>

                        </Link>

                        {/* Small Screen Navigation */}
                        <div className="dropdown dropdown-end">
                            <button tabIndex={0} role="button"
                                className="btn py-0 px-2 border-0 text-black bg-zinc-50 shadow-sm hover:bg-zinc-100 md:hidden">
                                <EllipsisVertical size={15} />
                            </button>
                            <ul tabIndex={0} className="dropdown-content menu rounded-lg z-[100] w-80 p-2 shadow-md mt-3 bg-white border border-zinc-200">
                                <li>
                                    {navlinks.slice(0, 1).map((item) => (
                                        <a key={item.id} href={item.path} className="flex justify-between items-center gap-2 text-black/40 transition-all">
                                            <div className="flex items-center gap-2 text-zinc-400">
                                                <item.icon size={20} className={` ${item.path === pathname && "text-red-700"}`} />
                                                <span className={` ${item.path === pathname && "text-black"} font-semibold font-notosans text-sm transition-all`}>
                                                    {item.linkname}
                                                </span>
                                            </div>
                                            <Dot size={15} className={`${item.path === pathname ? "text-black" : "text-zinc-300"}`} />
                                        </a>
                                    ))}
                                </li>
                                <li>
                                    <ul>
                                        <li>
                                            {navlinks.slice(5).map((item) => (
                                                <a key={item.id} href={item.path} className="flex justify-between items-center gap-2 text-black/40 transition-all">
                                                    <div className="flex items-center gap-2 text-zinc-400">
                                                        <item.icon size={15} className={` ${item.path === pathname && "text-red-700"}`} />
                                                        <span className={` ${item.path === pathname && "text-black"} font-semibold font-notosans text-sm transition-all`}>
                                                            {item.linkname}
                                                        </span>
                                                    </div>
                                                    <Dot size={15} className={`${item.path === pathname ? "text-black" : "text-zinc-300"}`} />
                                                </a>
                                            ))}
                                        </li>
                                    </ul>
                                </li>
                                <div className="flex items-center gap-1 text-xs font-normal ps-3 mt-2 mb-1">
                                    <span className=" font-medium"></span>
                                </div>
                                <li>
                                    <ul>
                                        <li>
                                            {navlinks.slice(1, 5).map((item) => (
                                                <a key={item.id} href={item.path} className="flex justify-between items-center gap-2 text-black/40 transition-all">
                                                    <div className="flex items-center gap-2 text-zinc-400">
                                                        <ShieldCheck size={15} className="text-green-900/50" />
                                                        <item.icon size={15} className={` ${item.path === pathname && "text-red-700"}`} />
                                                        <span className={` ${item.path === pathname && "text-black"} font-semibold font-notosans text-sm transition-all`}>
                                                            {item.linkname}
                                                        </span>
                                                    </div>
                                                    <Dot size={15} className={`${item.path === pathname ? "text-black" : "text-zinc-300"}`} />
                                                </a>
                                            ))}
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <button
                                        onClick={() => signOut()}
                                        className="justify-between items-center gap-2 text-black/40 hover:bg-red-100 transition-all">
                                        <div className="flex items-center gap-2 text-black">
                                            <Dot size={15} className="text-red-700" />
                                            <span className={` font-semibold font-notosans text-sm`}>Signout</span>
                                        </div>
                                        <LogOut size={15} className="text-red-700" />
                                    </button>
                                </li>
                            </ul>
                        </div>
                        {/* Small Screen Navigation */}

                    </div>
                    {/* SideNav Logo & Title  */}

                    {/* User Id */}
                    {session && (
                        <div className="flex justify-between items-center gap-1.5 bg-zinc-50 text-black/40 px-2 py-4 rounded-lg shadow-sm transition-all mb-2 border border-zinc-100">
                            <div className="flex justify-start items-center gap-1.5">
                                <User size={25} className="text-black" />
                                <div className="text-black/40">
                                    {houroftheday >= 6 && houroftheday <= 11 && (
                                        <div style={{ fontSize: "9px" }} className="flex items-center gap-1 font-medium text-cyan-900 mb-0.5 ">
                                            <SunDim size={12} />
                                            <span>Morning</span>
                                        </div>
                                    )}
                                    {houroftheday >= 12 && houroftheday <= 16 && (
                                        <div style={{ fontSize: "9px" }} className="flex items-center gap-1 font-medium text-orange-600 mb-0.5 ">
                                            <SunMedium size={12} />
                                            <span>Afternoon</span>
                                        </div>
                                    )}
                                    {houroftheday >= 17 && houroftheday <= 23 && (
                                        <div style={{ fontSize: "9px" }} className="flex items-center gap-1 font-medium text-slate-900 mb-0.5 ">
                                            <Moon size={12} />
                                            <span>Evening</span>
                                        </div>
                                    )}
                                    {houroftheday >= 0 && houroftheday <= 5 && (
                                        <div style={{ fontSize: "9px" }} className="flex items-center gap-1 font-medium text-blue-900 mb-0.5 ">
                                            <MoonStar size={12} />
                                            <span>Early Morn</span>
                                        </div>
                                    )}
                                    <div className="font-bold text-md text-black leading-none">{session.user.name}</div>
                                    <div className="font-medium text-xs text-zinc-500">{session.user.email}</div>
                                </div>
                            </div>
                            {UserAccess === "Admin" ?
                                <ShieldCheck size={15} className="text-green-900" />
                                : <ShieldOff size={15} className="text-black" />}
                        </div>
                    )}
                    {/* User Id */}

                    {/* Large Screen Navigation */}
                    <ul tabIndex={0} className="dropdown-content menu rounded-lg z-[4] w-auto p-2 shadow-sm bg-white hidden md:block border border-zinc-100">
                        <li>
                            {navlinks.slice(0, 1).map((item) => (
                                <a key={item.id} href={item.path} className="flex justify-between items-center gap-2 text-black/40 transition-all">
                                    <div className="flex items-center gap-2 text-zinc-500">
                                        <item.icon size={20} className={` ${item.path === pathname && "text-red-700"}`} />
                                        <span className={` ${item.path === pathname && "text-black"} font-semibold font-notosans text-sm transition-all`}>
                                            {item.linkname}
                                        </span>
                                    </div>
                                    <MoveRight size={15} className={`${item.path === pathname ? "text-black" : "text-zinc-300"}`} />
                                </a>
                            ))}
                        </li>
                        <li>
                            <ul>
                                <li>
                                    {navlinks.slice(5).map((item) => (
                                        <a key={item.id} href={item.path} className="flex justify-between items-center gap-2 text-black/40 transition-all" >
                                            <div className="flex items-center gap-2 text-zinc-500">
                                                <item.icon size={15} className={` ${item.path === pathname && "text-red-700"}`} />
                                                <span className={` ${item.path === pathname && "text-black"} font-semibold font-notosans text-sm transition-all`}>
                                                    {item.linkname}
                                                </span>
                                            </div>
                                            <MoveRight size={15} className={`${item.path === pathname ? "text-black" : "text-zinc-300"}`} />
                                        </a>
                                    ))}
                                </li>
                            </ul>
                        </li>
                        <div className="flex items-center gap-1 text-xs font-normal ps-3 mt-2 mb-1">
                            <span className=" font-medium"></span>
                        </div>
                        <li>
                            <ul>
                                <li>
                                    {navlinks.slice(1, 5).map((item) => (
                                        <a key={item.id} href={item.path} className="flex justify-between items-center gap-2 text-black/40 transition-all">
                                            <div className="flex justify-between items-center gap-1.5 text-zinc-500">
                                                <ShieldCheck size={15} className="text-green-900/50" />
                                                <item.icon size={15} className={` ${item.path === pathname && "text-red-700"}`} />
                                                <span className={` ${item.path === pathname && "text-black"} font-semibold font-notosans text-sm transition-all`}>
                                                    {item.linkname}
                                                </span>
                                            </div>
                                            <MoveRight size={15} className={`${item.path === pathname ? "text-black" : "text-zinc-300"}`} />
                                        </a>
                                    ))}
                                </li>
                            </ul>
                        </li>
                    </ul>
                    {/* Large Screen Navigation */}

                </div>

                <button
                    onClick={() => signOut()}
                    className="hidden md:flex btn-ghost  justify-between items-center gap-2 bg-zinc-50 text-black/40 px-6 py-1 rounded-lg shadow-sm mb-1 hover:bg-red-100 transition-all mt-2">
                    <div className="flex items-center gap-2 text-black">
                        <Dot size={15} className="text-red-700" />
                        <span className={` font-semibold font-notosans text-sm`}>Signout</span>
                    </div>
                    <LogOut size={15} className="text-red-700" />
                </button>
            </div>
        </>
    )
}