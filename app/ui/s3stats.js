"use client"

import { Cylinder } from "lucide-react";
import { useEffect, useState } from "react";

// Convert bytes to KB, MB, GB
const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

export default function S3Stats() {
    const [storage, setStorage] = useState(0);

    useEffect(() => {
        async function fetchStorage() {
            try {
                const res = await fetch("/api/s3Storage");
                const data = await res.json();
                setStorage(data.totalSize);
            } catch (error) {
                console.error("Error fetching S3 storage size:", error);
            }
        }

        fetchStorage();
    }, []);

    return (
        <>
            <div className="stat">
                <div className="stat-figure">
                    <Cylinder size={30} className="text-red-950" />
                </div>
                <div className="stat-desc text-red-950 flex justify-start items-center gap-1">
                    <span>S3 Bucket Storage Used:</span>
                </div>
                <div className="stat-value text-red-950">{formatBytes(storage)}</div>
                <div className="stat-desc text-zinc-950 font-medium">/ 5.00 GB</div>
            </div>
        </>
    )

}