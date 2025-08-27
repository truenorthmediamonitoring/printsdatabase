"use client"

import Image from "next/image"
import { countries } from "../lib/data"

import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import { Earth } from "lucide-react";
import Script from "next/script";

export default function SelectCountry() {
    const [selectedcountry, setselectedcountry] = useState("");

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSelection = useDebouncedCallback((country) => {
        console.log(`Searching... ${country}`);
        if (country === "") {
            setselectedcountry("")
        } else if (country === "Ghana") {
            setselectedcountry("gh")
        } else if (country === "Nigeria") {
            setselectedcountry("ng")
        } else if (country === "Côte d'Ivoire") {
            setselectedcountry("ci")
        }

        const params = new URLSearchParams(searchParams);

        if (country) {
            params.set("query", country);
        } else {
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 100)

    return (
        <>
            <div className="flex justify-start items-center gap-2 mb-5">
                <select
                    name="country"
                    className="select select-sm rounded-full shadow-sm bg-zinc-100 text-black font-semibold"
                    onChange={(event) => {
                        handleSelection(event.target.value);
                    }}
                // defaultValue={searchParams.get("query")?.toString()}
                >
                    {countries.map((item) => (
                        <option
                            key={item.id} className="text-sm" value={item.country === "All" ? "" : item.country}>
                            {item.country}
                        </option>
                    ))}
                </select>

                {!selectedcountry && (
                    <i className="fas fa-globe-africa text-blue-300"></i>
                )}

                {selectedcountry && (
                    <Image
                        className={`rounded-sm`}
                        src={`https://flagcdn.com/w40/${selectedcountry}.png`}
                        width={20}
                        height={20}
                        alt="Country flag"
                    />
                )}
            </div>

            <Script src="https://kit.fontawesome.com/dcd356c426.js" />
        </>

    )
}