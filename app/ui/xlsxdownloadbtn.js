"use client"

import { ArrowDownToDot, Dot, FileSpreadsheet, Info } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function XlsxDownloadBtn({ Industries }) {
    const [downloading, setdownloading] = useState(false);
    const [month, setMonth] = useState("");
    const [industry, setindustry] = useState("");

    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const pathname = usePathname()
    console.log(pathname);

    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];
    // console.log(formattedDate); // Outputs: YYYY-MM-DD

    const downloadExcel = async () => {
        setdownloading(true)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (pathname === "/headlines") {

            let query = "";
            if (start) query += `start=${start}`;
            if (end) query += `${start ? "&" : ""}end=${end}`;
            if (industry) query += `${start ? "&" : ""}${end ? "&" : ""}industry=${industry}`;

            const response = await fetch(`/api/dldheadlinesexcel${query ? "?" + query : ""}`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "HeadlinesReport" + start + end + industry + ".xlsx";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setdownloading(false)

        } else if (pathname === "/adverts") {
            let query = "";
            if (month) query += `month=${month}`;
            if (industry) query += `${month ? "&" : ""}industry=${industry}`;

            // const response = await fetch(`/api/dldadvertsexcel${month ? `?month=${month}` : ""}`);
            const response = await fetch(`/api/dldadvertsexcel${query ? "?" + query : ""}`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "AdvertsReport" + month + industry + ".xlsx";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setdownloading(false)
        } else if (pathname === "/news-items") {

            const response = await fetch(`/api/dldnewsitemsexcel${month ? `?month=${month}` : ""}`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "NewsitemsReport" + month + ".xlsx";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setdownloading(false)
        }

    };

    return (
        <>
            <div className="flex flex-col md:flex-row items-end md:items-center gap-2">

                {/* Month range selection  */}
                <div className={`flex items-center ${pathname !== "/headlines" && "hidden"}`}>
                    <div className=" max-w-52">
                        <input
                            type="date"
                            className="py-0.5 px-2 w-full text-sm font-bold rounded-lg focus:outline-none shadow-sm bg-zinc-800 text-white"
                            required
                            onChange={(e) => setStart(e.target.value)}
                            value={start}
                        />
                    </div>

                    <Dot size={10} color="black" />

                    <div className=" max-w-52">
                        <input
                            type="date"
                            className="py-0.5 px-2 w-full text-sm font-bold rounded-lg focus:outline-none shadow-sm bg-zinc-800 text-white"
                            required
                            onChange={(e) => setEnd(e.target.value)}
                            value={end}
                        />
                    </div>
                </div>

                {/* Add category and/or month to filter */}
                <div className={`max-w-52 ${pathname === "/headlines" && "hidden"}`}>
                    <input
                        type="month"
                        min="2018-01-01"
                        className="py-0.5 px-2 w-full text-sm font-bold rounded-lg focus:outline-none shadow-sm bg-zinc-800 text-white"
                        required
                        onChange={(e) => setMonth(e.target.value)}
                        value={month}
                    />
                </div>
                <div className={` ${pathname === "/news-items" && "hidden"}`}>
                    <select className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold"
                        required
                        defaultValue=""
                        onChange={(e) => setindustry(e.target.value)}
                    // value={industry}
                    >
                        <option className="text-xs" value="">Select Industry</option>
                        {Industries && Industries.map((item) => (
                            <option key={item._id} className="text-sm" value={item.industry}>{item.industry}</option>
                        ))}
                    </select>
                </div>

                {/* Download Buttons  */}
                <div className="flex items-center">
                    {downloading === false && (

                        <button
                            onClick={downloadExcel}
                            type="button"
                            className="btn-xs flex justify-start items-center gap-1.5 bg-army-green hover:bg-army-green/90 text-zinc-100 rounded-full font-sans font-semibold text-xs px-1.5 py-0.5">
                            <FileSpreadsheet size={15} />
                            <span>Download</span>
                            <ArrowDownToDot size={15} />
                        </button>
                    )}

                    {downloading === true && (
                        <button
                            type="button"
                            className="btn-ghost flex justify-start items-center gap-1.5 bg-army-green/40 text-zinc-100 rounded-full font-sans font-semibold text-xs px-1.5 py-0.5 btn-disabled">
                            <span className="loading loading-spinner loading-xs text-red-green"></span>
                            <span>Downloading...</span>
                        </button>
                    )}
                </div>

                <button
                    type="button"
                    className={`btn-ghost bg-zinc-50 text-army-green hover:bg-zinc-200 shadow-sm rounded-full font-sans font-semibold text-xs p-1 outline-none ${pathname === "/headlines" && "hidden"}`}
                    onClick={() => document.getElementById("info_modal").showModal()}
                >
                    <Info size={15} />
                </button>

                <button
                    type="button"
                    className={`btn-ghost bg-zinc-50 text-army-green hover:bg-zinc-200 shadow-sm rounded-full font-sans font-semibold text-xs p-1 outline-none ${pathname !== "/headlines" && "hidden"}`}
                    onClick={() => document.getElementById("info_modal_headlines").showModal()}
                >
                    <Info size={15} />
                </button>

                {/* <div className=" bg-black p-1 rounded-full">
                    <Info size={15} className=" text-zinc-200" />
                </div> */}
            </div>

            <dialog id="info_modal" className="modal">
                <div className="modal-box rounded-2xl bg-zinc-100">
                    <h3 className="font-bold text-lg">
                        <Info className="text-army-green" />
                    </h3>
                    <p className="py-4 text-black font-extralight">
                        Select a particular month or industry or both to filter and download, or just click download to download all entries.
                    </p>
                    <kbd className="kbd kbd-sm hidden md:inline-block text-white">
                        ESC
                    </kbd>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <dialog id="info_modal_headlines" className="modal">
                <div className="modal-box rounded-2xl bg-zinc-100">
                    <h3 className="font-bold text-lg">
                        <Info className="text-army-green" />
                    </h3>
                    <p className="py-4 text-black font-extralight">
                        Select a start date, end date or industry or all to filter and download, or just click download to download all entries.
                    </p>
                    <kbd className="kbd kbd-sm hidden md:inline-block text-white">
                        ESC
                    </kbd>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}