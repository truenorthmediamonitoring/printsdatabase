"use client"

import DelEntryForm from "./delentryform";
import Search from "./search";
import Image from "next/image";
import XlsxDownloadBtn from "./xlsxdownloadbtn";
import Link from "next/link";
import { FileImage, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

export default function AdvertEntriesTable({ Adverts, Industries}) {
    // console.log(Adverts[Adverts.length - 1]);
    const [companyidentifier, setCompanyIdentifier] = useState({
        company: "",
        identifier: "",
        id: ""
    });

    return (
        <>
            <Search />
            {Adverts.length > 0 && (
                <div>
                    <div className="overflow-auto w-full max-h-80 shadow-sm shadow-gray-300 rounded-xl md:flex-grow mb-4">
                        <table className="table table-xs table-pin-rows bg-zinc-100">
                            <tbody className=" bg-zinc-900">
                                <tr className="text-white text-xs">
                                    <th>Company</th>
                                    <th>Industry</th>
                                    <th>Category</th>
                                    <th>Publication</th>
                                    <th>Ad Size</th>
                                    <th>Rate</th>
                                    <th>Identifier</th>
                                    <th>Date</th>
                                    <th>Page(s)</th>
                                    <th>Color Format</th>
                                    <th>Image</th>
                                    <th>Country</th>
                                    <th>Actions</th>
                                </tr>
                            </tbody>
                            <tbody>
                                {Adverts && Adverts.slice(0, 100).map((item) => (
                                    <tr key={item._id} className="text-sm text-black  hover:bg-zinc-100">
                                        <td className="font-bold text-sm">{item.company}</td>
                                        <td>{item.industry}</td>
                                        <td>{item.category}</td>
                                        <td>{item.publications.join(", ")}</td>
                                        <td>{item.adsize}</td>
                                        <td>{item.rate}</td>
                                        <td className="font-bold">{item.identifier}</td>
                                        <td>{item.date.slice(0, 10)}</td>
                                        <td className="font-bold text-red-700">{item.pages.join(", ")}</td>
                                        <td className={`${item.colorformat === "Coloured" && "text-red-700 font-semibold"} `}>
                                            {item.colorformat}
                                        </td>
                                        <td>
                                            {/* <a href={item.imageurl} download target="_blank">
                                                <Image
                                                    style={{ width: "auto", height: "auto" }}
                                                    className="rotate-3 shadow-sm"
                                                    src={item.imageurl}
                                                    width={30}
                                                    height={30}
                                                    alt="Image File"
                                                />
                                            </a> */}
                                            <a href={item.imageurl} download target="_blank">
                                                <FileImage
                                                    size={30}
                                                    className="hover:rotate-6 text-zinc-500 shadow-md rounded-lg bg-white p-1 px-0 hover:bg-army-green hover:text-white transition-all" />
                                            </a>
                                        </td>
                                        <td>{item.country}</td>
                                        <td>
                                            <div className="flex justify-center items-center gap-1">

                                                <Link href={`/adverts/edit/${item._id}`}
                                                // className=" btn-disable"
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
                                                        document.getElementById('del_advert_modal').showModal();
                                                        setCompanyIdentifier({
                                                            company: item.company,
                                                            identifier: item.identifier,
                                                            id: item._id,
                                                        });
                                                    }}
                                                    type="button"
                                                    className="btn-xs flex justify-start items-center gap-1 bg-red-700 text-white rounded-full font-sans font-semibold text-xs py-0.5 px-2">
                                                    <Trash2 size={13} className="" />
                                                    <span>Del</span>
                                                </button>

                                                <dialog id="del_advert_modal" className="modal">
                                                    <div className="modal-box max-w-md bg-zinc-50">
                                                        <form method="dialog">
                                                            {/* if there is a button in form, it will close the modal */}
                                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                                <X size={15} className="text-red-700" />
                                                            </button>
                                                        </form>

                                                        <div className="mb-5">
                                                            <div className="text-xs text-red-200 mb-2">{companyidentifier.id}</div>
                                                            <span className="label-text text-base text-black">
                                                                Delete this entry for <span className="text-red-700 font-semibold">
                                                                    {companyidentifier.company}
                                                                </span>
                                                            </span>
                                                            <h1 className="text-base text-black">
                                                                with identifier <span className="text-red-700 font-semibold"> {companyidentifier.identifier}
                                                                </span> ?
                                                            </h1>
                                                        </div>

                                                        <div className="flex justify-between items-center">
                                                            <kbd className="kbd kbd-xs bg-zinc-100 text-black">esc</kbd>
                                                            <DelEntryForm id={companyidentifier.id} />
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
                    <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                        <div className="badge badge-sm bg-army-green/5 text-army-green border-0 flex items-center gap-1.5">
                            <span>Count:</span>
                            <span className="font-bold">{Adverts.length}</span>
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