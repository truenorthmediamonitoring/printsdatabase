"use client"

import { TextSearch } from "lucide-react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { useState } from "react"

export default function Search() {
    const [searching, setsearching] = useState(false);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handlesearch = useDebouncedCallback((term) => {
        console.log(`Searching... ${term}`);

        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
            setsearching(false)
        }
        replace(`${pathname}?${params.toString()}`);
        setsearching(false)
    }, 500)

    return (
        <>
            <div className="grow mb-4 max-w-sm flex justify-start items-center gap-2 ">
                <label className="input input-sm flex w-full items-center gap-2 bg-army-green/5 rounded-full shadow-xs">
                    <TextSearch size={15} className="text-red-700" />
                    <input
                        name="headline"
                        type="text"
                        className="grow font-semibold text-black"
                        placeholder="Search"
                        required
                        onChange={(event) => {
                            handlesearch(event.target.value)
                            setsearching(true)
                        }}
                    />
                </label>
                <span
                    className={`
                loading loading-spinner loading-xs text-red-700 
                ${searching === false ? "invisible" : "visible"}
                `}></span>
            </div>
        </>
    )
}
