"use client"
import { useEffect } from "react";
import DbsizeStats2 from "./dbsizestats";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import S3Stats from "./s3stats";

export default function Stats({ NewsItems, Adverts, Headlines }) {

    useEffect(() => {
        const interval = setInterval(() => {
            window.location.reload();
        }, 30000); // Refresh every 60 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const stats = [
        { id: 0, stat: Adverts.length, title: "Adverts", href: "/adverts" },
        { id: 2, stat: Headlines.length, title: "Headlines", href: "/headlines" },
        { id: 1, stat: NewsItems.length, title: "News Items", href: "/news-items" },
    ]

    return (
        <>
            <div className="stats stats-vertical lg:stats-horizontal bg-red-50 shadow-sm mb-10">
                {stats.map((item) => (
                    <div key={item.id} className="stat">
                        <div className="stat-desc text-red-950">{item.title}</div>
                        <div className="stat-value text-red-950">{item.stat}</div>
                        <Link href={item.href}>
                            <button type="button" className="btn-ghost btn-xs text-black rounded-full flex items-center gap-2 bg-zinc-50 shadow-sm px-5 hover:bg-zinc-100 transition-all mt-2">
                                <span className="font-bold">Visit Page</span>
                                <ArrowRight size={15} />
                            </button>
                        </Link>
                    </div>
                ))}
                <DbsizeStats2 />
                <S3Stats />
            </div>
        </>
    )
}