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

export default function DbsizeStats2() {
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
            <div className="stat">
                <div className="stat-figure">
                    <Database size={30} className="text-red-950" />
                </div>
                <div className="stat-desc text-red-950 flex justify-start items-center gap-1">
                    <span>Data size on MongoDB</span>
                </div>
                <div className="stat-value text-red-950">{formatBytes(stats.storageSize)}</div>
                <div className="stat-desc text-zinc-950 font-medium">/ 512.00 MB</div>
            </div>
        </>
    )
}