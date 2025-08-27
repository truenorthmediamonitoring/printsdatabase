"use client"

import { Pencil, Play, Trash2, X } from "lucide-react";
import DelNewsitemForm from "./delnewsitemform";
import Search from "./search";
import XlsxDownloadBtn from "./xlsxdownloadbtn";
import Link from "next/link";
import { useState } from "react";

export default function NewsItemsTable({ NewsItems }) {
    const [companyheadline, setCompanyHeadline] = useState({
        company: "",
        headline: "",
        id: ""
    });
    return (
        <>
            <Search />
            {NewsItems.length > 0 && (
                <div>
                    <div className="overflow-auto w-full max-h-80 shadow-sm shadow-gray-300 rounded-xl md:flex-grow mb-4">
                        <table className="table table-xs table-pin-rows bg-zinc-100">
                            {NewsItems && (
                                <tbody className=" bg-zinc-900">
                                    <tr className="text-white text-xs">
                                        <th>Company</th>
                                        <th>Industry</th>
                                        <th>Category</th>
                                        <th>Source</th>
                                        <th>Headline</th>
                                        <th>News Segement</th>
                                        <th>Date</th>
                                        <th>Ave</th>
                                        <th>Resource</th>
                                        <th>Tone</th>
                                        <th>Country</th>
                                        <th>Summary</th>
                                        <th>Actions</th>
                                    </tr>
                                </tbody>
                            )}
                            <tbody>
                                {NewsItems && NewsItems.map((item) => (
                                    <tr key={item._id} className="text-sm text-black  hover:bg-zinc-100">
                                        <td className="font-bold text-base">{item.company}</td>
                                        <td>{item.industry}</td>
                                        <td>{item.category}</td>
                                        <td className="font-medium">{item.sources.join(", ")}</td>
                                        <td className="font-bold">{item.headline}</td>
                                        <td>{item.newssegment}</td>
                                        <td >{item.date.slice(0, 10)}</td>
                                        <td>{item.ave}</td>
                                        <td>
                                            <a href={item.url} download target="_blank">
                                                <button
                                                    type="button"
                                                    className="btn-xs flex justify-start items-center gap-1 bg-red-700 text-zinc-200 rounded-full font-sans font-semibold shadow text-xs px-2">
                                                    <Play size={15} />
                                                    <span>Play</span>
                                                </button>
                                            </a>
                                        </td>
                                        <td>{item.tone}</td>
                                        <td>{item.country}</td>
                                        <td>{item.summary}</td>
                                        <td>
                                            <div className="flex justify-center items-center gap-1">
                                                <Link href={`/news-items/edit/${item._id}`}
                                                >
                                                    <button
                                                        type="button"
                                                        className="btn-xs flex justify-start items-center gap-1.5 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 rounded-full font-sans font-semibold text-xs py-0 px-2 transition-all">
                                                        <Pencil size={13} />
                                                        <span>Edit</span>
                                                    </button>
                                                </Link>

                                                {/* Del Modal */}
                                                <button
                                                    onClick={() => {
                                                        document.getElementById('del_newsitem_modal').showModal();
                                                        setCompanyHeadline({
                                                            company: item.company,
                                                            headline: item.headline,
                                                            id: item._id,
                                                        });
                                                    }}
                                                    type="button"
                                                    className="btn-xs flex justify-start items-center gap-1 bg-red-700 text-white rounded-full font-sans font-semibold text-xs py-0.5 px-2">
                                                    <Trash2 size={13} className="" />
                                                    <span>Del</span>
                                                </button>

                                                <dialog id="del_newsitem_modal" className="modal">
                                                    <div className="modal-box max-w-md bg-zinc-50">
                                                        <form method="dialog">
                                                            {/* if there is a button in form, it will close the modal */}
                                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                                <X size={15} className="text-red-700" />
                                                            </button>
                                                        </form>

                                                        <div className="mb-5">
                                                            <div className="text-xs text-red-200 mb-2">{companyheadline.id}</div>
                                                            <span className="label-text text-base text-black">
                                                                Delete this entry for <span className="text-red-700 font-semibold">
                                                                    {companyheadline.company}
                                                                </span>
                                                            </span>
                                                            <h1 className="text-base text-black">
                                                                with headline <span className="text-red-700 font-semibold"> {companyheadline.headline}
                                                                </span> ?
                                                            </h1>
                                                        </div>

                                                        <div className="flex justify-between items-center">
                                                            <kbd className="kbd kbd-xs bg-zinc-100 text-black">esc</kbd>
                                                            <DelNewsitemForm id={companyheadline.id} />
                                                        </div>
                                                    </div>
                                                </dialog>
                                                {/* Del Modal */}


                                                {/*  */}

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end items-center gap-2">
                        <div className="badge badge-sm bg-army-green/5 text-army-green border-0 flex items-center gap-1.5">
                            <span>Count:</span>
                            <span className="font-bold">{NewsItems.length}</span>
                        </div>
                        <XlsxDownloadBtn />
                    </div>
                </div>
            )}
        </>
    )
}