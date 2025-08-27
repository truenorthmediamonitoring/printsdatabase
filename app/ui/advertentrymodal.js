"use client"

import { Plus, X } from "lucide-react";
import AdvertEntryForm from "./advertentryform";

export default function AdvertEntryModal({ Companies, Industries, Categories, Publications }) {
    return (
        <>
            <button
                onClick={() => document.getElementById('entry_modal').showModal()}
                type="button"
                className="btn-xs flex justify-start items-center gap-1 bg-black text-white rounded-full font-sans font-semibold text-xs py-0.5 px-2">
                <Plus size={13} className="" />
                <span>Add Entry</span>
            </button>

            <dialog id="entry_modal" className="modal">
                <div className="modal-box max-w-7xl bg-zinc-50">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            <X size={15} className="text-red-700" />
                        </button>
                    </form>
                    <div className="mb-5">
                        <h1 className="text-xl text-black font-notosans font-bold leading-none">Add New Entry</h1>
                        <span className="label-text text-xs text-zinc-800">Fill out the form and Save Entry.</span>
                    </div>

                    <AdvertEntryForm
                        Companies={Companies}
                        Industries={Industries}
                        Categories={Categories}
                        Publications={Publications}
                    />
                    {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
                </div>
            </dialog>
        </>
    )
}