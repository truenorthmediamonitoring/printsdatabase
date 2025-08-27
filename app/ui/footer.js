"use client"

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname(); 

    const socialicons = [
        {
            id: 0,
            icon: "fab fa-linkedin-in",
        },
        {
            id: 1,
            icon: "fab fa-twitter",
        },
        {
            id: 2,
            icon: "fab fa-facebook-f",
        },
    ];
    return (
        <div className={`flex flex-col flex-wrap md:flex-row justify-between items-center md:items-start px-5 py-10 md:ps-32 md:pe-20 bg-white gap-10 ${pathname !== "/" && "hidden"}`}>
            <div className="flex items-center">
                <div className="text-center md:text-left">
                <span className="text-xs text-zinc-400 mb-1 inline-block leading-none">
                        Powered By
                    </span>
                    <p className="font-bold font-notosans text-md text-black mb-2 leading-none">
                        TRUE NORTH MEDIA <br /> MONITORING LTD
                    </p>
                    <span className="text-xs text-zinc-400 mb-2 inline-block">
                        Copyright © {new Date().getFullYear()} - All right reserved
                    </span>
                    <div className="flex justify-center md:justify-start items-center gap-3">
                        {socialicons.map((item) => (
                            <div key={item.id}>
                                <i className={`${item.icon} text-red-700`}></i>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
                <div className="flex flex-col gap-2.5 text-black text-center md:text-left">
                    <h6 className="font-bold font-notosans text-md">USEFUL LINKS</h6>
                    <Link href="/"
                        className="flex justify-start items-center gap-1 font-sans text-red-700">
                        <span className="text-sm">Visit our main site</span>
                        <ExternalLink size="10" />
                    </Link>
                </div>

                <div className="flex flex-col gap-2.5 text-black text-center md:text-left">
                    <h6 className="font-bold font-notosans text-md">SERVICES</h6>
                    <Link href="/media-monitoring">
                        <p className=" font-notosans font-light text-sm hover:underline">
                            Media Monitoring
                        </p>
                    </Link>
                    <Link href="/audience-measurement">
                        <p className=" font-notosans font-light text-sm hover:underline">
                            Audience Measurement
                        </p>
                    </Link>

                    <Link href="/consumer-journeys">
                        <p className=" font-notosans font-light text-sm hover:underline">
                            Consumer Journeys
                        </p>
                    </Link>
                </div>



                <div className="flex flex-col gap-2.5 text-black text-center md:text-left">
                    <h6 className="font-bold font-notosans text-md">CONTACT US</h6>
                    <p className=" font-notosans font-light text-sm">7 Okantar Ankrah</p>
                    <p className=" font-notosans font-light text-sm mb-2.5">
                        Chantan, Accra
                    </p>

                    <p className=" font-notosans font-light text-sm">
                        (+233) 541 180 487
                    </p>
                    <p className=" font-notosans font-light text-sm">
                        info@truenorthmonitoring.com
                    </p>
                    {/* <p className=" font-notosans font-light text-xs">
            FAQs
          </p> */}
                </div>
            </div>
        </div>
    );
}
