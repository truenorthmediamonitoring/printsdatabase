"use client"

import { Bookmark, Coins, FileDigit, Save, X, Plus } from "lucide-react"
import { adsizes, colorformat, countries, pages } from "@/app/lib/data"
import { useState } from "react"
import ToastAlert from "@/app/ui/toast"
import { uploadFile } from "../lib/awsS3/uploadfile"

export default function AdvertEntryForm({ Companies, Industries, Categories, Publications }) {
    const [saving, setsaving] = useState(false)
    const [entrysaved, setentrysaved] = useState(false)
    const [internalerror, setinternalerror] = useState(false);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setsaving(true)

        const company = event.target.company.value;
        const industry = event.target.industry.value;
        const category = event.target.category.value;
        const publications = event.target.publications;
        const adsize = event.target.adsize.value;
        const rate = event.target.rate.value;
        const identifier = event.target.identifier.value;
        const date = event.target.date.value;
        const pages = event.target.pages;
        const colorformat = event.target.colorformat.value;
        const file = event.target.file.files[0];
        const country = event.target.country.value;

        const multiplepublications = Array.from(publications.selectedOptions).map(option => option.value);
        const selectedpages = Array.from(pages.selectedOptions).map(option => option.value);


        const resourceUrl = await uploadFile(file);

        if (resourceUrl.error) {
            setinternalerror(true)
            setsaving(false);
            return;
        }

        const data = {
            company,
            industry,
            category,
            multiplepublications,
            adsize,
            rate,
            identifier,
            date,
            selectedpages,
            colorformat,
            url: resourceUrl,
            country
        }

        // console.log(data);

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

        // API endpoint where we send form data.
        const endpoint = "/api/saveadvert";

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: "POST",
            // Tell the server we're sending JSON.
            headers: {
                "Content-Type": "application/json",
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        };

        // Send the form data to our forms API and get a response.
        const response = await fetch(endpoint, options);

        // Get the response data from server as JSON.
        const result = await response.json();
        console.log(result);

        if (result.okay) {
            setentrysaved(true)
            setsaving(false)
            event.target.reset();
            // setTimeout(() => {
            //     location.reload(true);
            // }, 1500);
        } else {
            setinternalerror(true)
            setsaving(false)
        }
    }
    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div className="flex flex-wrap justify-start items-center gap-2 mb-4">
                    {/* Company Selection */}
                    <div className="">
                        <div className="label flex justify-start items-center gap-1">
                            <a href="/companies" className=" inline-block p-0.5 rounded-lg bg-zinc-200 shadow-sm">
                                <Plus size={13} className="text-red-700" />
                            </a>
                            <span className="label-text font-normal text-black">Company</span>
                        </div>
                        <select name="company" 
                        className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold grow" required>
                            {/* <option className="text-xs" defaultValue="Select a station" selected disabled>Company</option> */}
                            {Companies.map((item) => (
                                <option key={item._id} className="text-sm" value={item.company}>
                                    {item.company} | {item.country === "Ghana" && "GH" || item.country === "Nigeria" && "NG" || item.country === "Côte d'Ivoire" && "CI"}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Industry Selection */}
                    <div className="">
                        <div className="label flex justify-start items-center gap-1">
                            <a href="/industries-categories" className=" inline-block p-0.5 rounded-lg bg-zinc-200 shadow-sm">
                                <Plus size={13} className="text-red-700" />
                            </a>
                            <span className="label-text font-normal text-black">Industry</span>
                        </div>
                        <select name="industry" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required defaultValue="">
                        <option className="text-xs" value="" disabled>Select Industry</option>
                            {Industries.map((item) => (
                                <option key={item._id} className="text-sm" value={item.industry}>{item.industry}</option>
                            ))}
                        </select>
                    </div>

                    {/* Category Selection */}
                    <div className="">
                        <div className="label">
                            <span className="label-text font-normal text-black">Category</span>
                        </div>
                        <select name="category" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required defaultValue="">
                        <option className="text-xs" value="" disabled>Select Category</option>
                            {Categories.map((item) => (
                                <option key={item._id} className="text-sm" value={item.category}>{item.category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Publication Selection */}
                    <div className="">
                        <div className="label flex justify-start items-center gap-1">
                            <a href="/publications-sources" className=" inline-block p-0.5 rounded-lg bg-zinc-200 shadow-sm">
                                <Plus size={13} className="text-red-700" />
                            </a>
                            <span className="label-text font-normal text-black">Publication</span>
                        </div>
                        <select
                            size={4}
                            multiple
                            name="publications"
                            className="select select-sm rounded-md shadow-sm bg-zinc-100 font-semibold text-black" required>
                            {Publications.map((item) => (
                                <option key={item._id} className="text-sm" value={item.publication}>
                                    {item.publication} | {item.country === "Ghana" && "GH" || item.country === "Nigeria" && "NG" || item.country === "Côte d'Ivoire" && "CI"}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>



                <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                    <div className="max-w-xs">
                        <div className="label">
                            <span className="label-text font-normal text-black">Ad Size</span>
                        </div>
                        <select name="adsize" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required defaultValue="">
                            <option className="text-xs" value="" disabled>Ad Size</option>
                            {adsizes.map((item) => (
                                <option key={item.id} className="text-sm" value={item.size}>{item.size}</option>
                            ))}
                        </select>
                    </div>

                    <div className="max-w-xs">
                        <div className="label">
                            <span className="label-text font-normal text-black">Rate</span>
                        </div>
                        <label className="input input-sm flex items-center gap-2 bg-zinc-100 rounded-md shadow-sm">
                            <Coins size={15} className="text-red-700" />
                            <input name="rate" type="number" min={0} className="grow font-semibold text-black" placeholder="Rate" required />
                        </label>
                    </div>

                    <div className="grow">
                        <div className="label">
                            <span className="label-text font-normal text-black">Identifier</span>
                        </div>
                        <label className="input input-sm flex w-full items-center gap-2 bg-zinc-100 rounded-md shadow-sm">
                            <Bookmark size={15} className="text-red-700" />
                            <input name="identifier" type="text" className="grow font-semibold text-black" placeholder="Identifier" required />
                        </label>
                    </div>
                </div>



                <div className="flex flex-wrap justify-start items-center gap-4 mb-8">
                    <div className="max-w-sm">
                        <div className="label">
                            <span className="label-text font-normal text-black">Date</span>
                        </div>
                        <input
                            name="date"
                            type="date"
                            min="2018-01-01"
                            className="py-1 px-2 w-full text-sm font-semibold rounded-md focus:outline-none shadow-sm bg-black/80 text-white"
                            required
                        />
                    </div>

                    <div>
                        <div className="label flex justify-start items-center gap-1">
                            <span className="label-text font-normal text-black">Page Number(s)</span>
                        </div>
                        <select
                            size={4}
                            multiple
                            name="pages"
                            className="select select-sm rounded-md shadow-sm bg-zinc-100 font-semibold text-black w-full" required>
                            {pages.slice(1).map((item) => (
                                <option key={item.id} className="text-sm" value={item.page}>
                                    {item.page}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* <div className="w-40">
                        <div className="label">
                            <span className="label-text font-normal text-black">Page</span>
                        </div>
                        <label className="input input-sm flex items-center gap-2 bg-zinc-100 rounded-md shadow-sm">
                            <FileDigit size={15} className="text-red-700" />
                            <input name="page" type="number" min={0} className="grow font-semibold text-black" placeholder="Page" required />
                        </label>
                    </div> */}

                    <div className="">
                        <div className="label">
                            <span className="label-text font-normal text-black">Color Format</span>
                        </div>
                        <select name="colorformat" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required>
                            {colorformat.map((item) => (
                                <option key={item.id} className="text-sm" value={item.type}>{item.type}</option>
                            ))}
                        </select>
                    </div>

                    <label className="form-control rounded-md grow">
                        <div className="label">
                            <span className="label-text font-normal text-black">
                                Image upload
                            </span>
                            <span className="label-text-alt text-xs text-zinc-500 font-normal">(.jpg, .jpeg, .png)</span>
                        </div>
                        <input
                            // multiple
                            type="file"
                            name="file"
                            accept=".jpg, .jpeg, .png"
                            className="file-input file-input-ghost file-input-sm rounded-md focus:outline-none bg-zinc-700 text-white font-medium"
                            required
                        />
                    </label>

                    <div className="">
                        <div className="label">
                            <span className="label-text font-normal text-black">
                                Country
                            </span>
                        </div>
                        <select name="country" className="select select-sm w-full rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required>
                            {countries.slice(1).map((item) => (
                                <option key={item.id} className="text-sm" value={item.country}>{item.country}</option>
                            ))}
                        </select>
                    </div>

                </div>

                <div className="flex justify-between items-center gap-3">
                    <kbd className="kbd kbd-xs bg-zinc-100 text-black">esc</kbd>
                    <div className="flex justify-end items-center gap-3">
                        <button
                            type="reset"
                            className="btn-ghost flex justify-start items-center gap-2 bg-zinc-100 text-black rounded-full font-sans font-semibold text-xs p-1">
                            <X size={15} className="" />
                            <span>Clear</span>
                        </button>

                        {saving === false && (
                            <button
                                type="submit"
                                className="flex justify-start items-center gap-2 btn-sm bg-red-700 rounded-full px-3 py-1 text-white font-sans font-bold text-xs">
                                <Save size={15} className="" />
                                <span>Save Entry</span>
                            </button>
                        )}

                        {saving === true && (
                            <button
                                type="button"
                                className="flex justify-start items-center gap-2 btn-sm bg-red-400 rounded-full px-3 py-1 text-white font-sans font-bold text-xs opacity-80 btn-disabled">
                                <span className="loading loading-spinner loading-xs text-red-green"></span>
                                <span>Saving...</span>
                            </button>
                        )}
                    </div>
                </div>
            </form>


            <ToastAlert
                stateVar={entrysaved}
                textColor="text-army-green"
                text="Entry saved."
                onClick={() => setentrysaved(false)}
                iconHint="success"
            />

            <ToastAlert
                stateVar={internalerror}
                textColor=" text-red-500"
                text="Something went wrong. Try again."
                onClick={() => setinternalerror(false)}
                iconHint="internalerror"
            />
        </>
    )
}