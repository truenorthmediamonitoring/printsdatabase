"use client"

import { RotateCw, ServerCrash } from "lucide-react";
import { useEffect } from "react";

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <main className="py-6 md:pt-24 px-4 h-screen md:px-10 rounded-lg bg-white shadow-sm overflow-scroll flex flex-col justify-center items-center gap-1">
            <div className=" bg-white w-80 rounded-2xl p-5 shadow-md flex flex-col items-center">
                <ServerCrash size={30} className="text-red-700 -rotate-3" />

                {/* <h1 className="mt-4 text-xl text-zinc-700 font-bold leading-none">502 (Bad Gateway)</h1> */}
                <h1 className="mt-4 text-xl text-zinc-700 font-bold leading-none">500</h1>
                <h4 className="text-sm text-zinc-700 font-normal leading-none">Something went wrong!</h4>
                <button
                    className="btn-sm rounded-full mt-4 bg-zinc-700 text-white font-medium flex items-center gap-2"
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    Refresh <RotateCw size={15} />
                </button>
            </div>
        </main>
    );
}