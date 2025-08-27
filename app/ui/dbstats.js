"use client"

import { Database } from "lucide-react";
import { useEffect, useState } from "react"

// Function to convert bytes into KB, MB, GB
const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

export default function DbSizeStats({ dbSize, storageSize }) {
    const [stats, setStats] = useState({ dataSize: 0, storageSize: 0 });

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch("/api/dbStats");
                const data = await res.json();
                setStats(data);
            } catch (error) {
                console.error("Error fetching DB stats:", error);
            }
        }

        fetchStats();
    }, []);

    return (
        <>
            <div className="tooltip tooltip-left" data-tip="Data size on MongoDB Atlas">
                <div className="flex justify-start items-center gap-1.5 badge badge-lg bg-zinc-100 border-0">
                    <span className="text-xs text-black">Data size</span>
                    <div className="flex justify-start items-center gap-1.5 text-xs">
                        {/* 1.32 MB / 512.00 MB */}
                        <span className="text-black font-semibold">{formatBytes(stats.storageSize)}</span>
                        <span className="text-black">/ 512.00 MB</span>

                        {/* {formatBytes(stats.dataSize)} */}
                    </div>
                    <Database size={18} className=" text-red-700" />
                </div>
            </div>
        </>
    )
}