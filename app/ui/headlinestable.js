"use client"

import { Pencil, TextCursor, Trash2, X } from "lucide-react";
import DelHeadlineForm from "./delheadlineform";
import Search from "./search";
import XlsxDownloadBtn from "./xlsxdownloadbtn";
import Link from "next/link";
import { useState } from "react";

export default function HeadlinesTable({ Headlines, Industries }) {
    // console.log(Headlines);
    const [companyheadline, setCompanyHeadline] = useState({
        company: "",
        headline: "",
        id: ""
    });

    return (
        <>
            <Search />
            {Headlines.length > 0 && (
                <div>
                    <div className="overflow-auto w-full max-h-80 shadow-sm shadow-gray-300 rounded-xl md:flex-grow mb-4">
                        <table className="table table-xs table-pin-rows bg-zinc-100">
                            <tbody className=" bg-zinc-900">
                                <tr className="text-white text-xs">
                                    <th>Company</th>
                                    <th>Industry</th>
                                    <th>Category</th>
                                    <th>Print Publications</th>
                                    <th>Online Publications</th>
                                    <th>Page(s)</th>
                                    <th>Prominence</th>
                                    <th>With Picture(s)</th>
                                    <th>Focus</th>
                                    <th>Date</th>
                                    <th>Headline</th>
                                    <th>Theme</th>
                                    <th>Tone</th>
                                    <th>Country</th>
                                    <th>Actions</th>
                                </tr>
                            </tbody>
                            <tbody>
                                {Headlines && Headlines.slice(0, 100).map((item) => (
                                    <tr key={item._id} className="text-sm text-black  hover:bg-zinc-100">
                                        <td className="font-bold text-sm">{item.company}</td>
                                        <td>{item.industry}</td>
                                        <td>{item.category}</td>
                                        <td className="font-medium">
                                            <div className="flex justify-between items-center gap-2">
                                                <span>{item.publications.join(", ")}</span>
                                                {/* <span className=" text-army-green">{item.publications.length}</span> */}
                                            </div>
                                        </td>
                                        <td className="font-medium">
                                            <div className="flex justify-between items-center gap-2">
                                                <span>{item.onlinepublications.join(", ")}</span>
                                                {/* <span className=" text-army-green">{item.onlinepublications.length}</span> */}
                                            </div>
                                        </td>
                                        <td className="font-bold text-red-700">{item.pages.join(", ")}</td>
                                        <td>{item.prominence}</td>
                                        <td>{item.withpictures}</td>
                                        <td>{item.focus}</td>
                                        <td>{item.date.slice(0, 10)}</td>
                                        <td className="font-bold">{item.headline}</td>
                                        <td className="font-medium">{item.themes.join(", ")}</td>
                                        <td>{item.tone}</td>
                                        <td className="font-bold">{item.country}</td>
                                        <td>
                                            <div className="flex justify-center items-center gap-1">
                                                <Link href={`/headlines/edit/${item._id}`}
                                                >
                                                    <button
                                                        type="button"
                                                        className="btn-xs flex justify-start items-center gap-1.5 bg-zinc-200 hover:bg-zinc-300 transition-all text-zinc-700 rounded-full font-sans font-semibold text-xs py-0 px-2">
                                                        <Pencil size={13} />
                                                        <span>Edit</span>
                                                    </button>
                                                </Link>

                                                {/* Del Modal */}
                                                <button
                                                    onClick={() => {
                                                        document.getElementById('del_headline_modal').showModal();
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

                                                <dialog id="del_headline_modal" className="modal">
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
                                                            <DelHeadlineForm id={companyheadline.id} />
                                                        </div>
                                                    </div>
                                                </dialog>
                                                {/* Del Modal */}

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-wrap justify-between items-center gap-2">
                        <div className="badge badge-sm bg-army-green/5 text-army-green border-0 flex items-center gap-1.5">
                            <span>Count:</span>
                            <span className="font-bold">{Headlines.length}</span>
                        </div>
                        <XlsxDownloadBtn
                            Industries={Industries}
                        />
                    </div>
                </div>
            )}
        </>
    )
}