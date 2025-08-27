"use client"

import { useState } from "react";
import ToastAlert from "./toast";
import { adsizes, colorformat, countries, pages } from "../lib/data";
import { Plus, Coins, Bookmark, X, Pencil, FileImage } from "lucide-react";
import { uploadFile } from "../lib/awsS3/uploadfile";
import Image from "next/image";

export default function AdvertEditForm({ ID, Advert, Companies, Industries, Categories, Publications }) {
    const [editing, setediting] = useState(false)
    const [advertsaved, setadvertsaved] = useState(false)
    const [internalerror, setinternalerror] = useState(false);

    const [rate, setrate] = useState(Advert.rate)
    const [identifier, setidentifier] = useState(Advert.identifier)
    const [date, setdate] = useState(new Date(Advert.date).toISOString().split("T")[0])


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setediting(true)

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
        const file = event.target.file.files;
        const country = event.target.country.value;

        const multiplepublications = Array.from(publications.selectedOptions).map(option => option.value);
        const selectedpages = Array.from(pages.selectedOptions).map(option => option.value);

        let resourceUrl;

        if (file.length > 0) {
            resourceUrl = await uploadFile(file[0]);

            if (resourceUrl.error) {
                setinternalerror(true)
                setediting(false);
                return;
            }
        }

        const data = {
            ID,
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
            url: !resourceUrl ? "" : resourceUrl,
            country
        }

        // console.log(data);
        // setediting(false)

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

        // API endpoint where we send form data.
        const endpoint = "/api/editadvert";

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
            setadvertsaved(true)
            setediting(false)
            // event.target.reset();
            setTimeout(() => {
                window.location.href = '/adverts';
            }, 1500);
        } else {
            setinternalerror(true)
            setediting(false)
        }

    }

    return (
        <>
            <form onSubmit={handleFormSubmit} className="bg-white p-6 shadow-md rounded-lg">
                <div className="flex flex-wrap justify-start items-center gap-2 mb-4">
                    {/* Company Selection */}
                    <div>
                        <div className="label flex justify-start items-center gap-1">
                            <a href="/companies" className=" inline-block p-0.5 rounded-lg bg-zinc-200 shadow-sm">
                                <Plus size={13} className="text-red-700" />
                            </a>
                            <span className="label-text font-normal text-black">Company</span>
                        </div>
                        <select name="company" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required>
                            <option className="text-sm font-semibold" value={Advert.company}>{Advert.company}</option>
                            {Companies.map((item) => (
                                <option key={item._id} className="text-sm" value={item.company}>
                                    {item.company} | {item.country === "Ghana" && "GH" || item.country === "Nigeria" && "NG" || item.country === "Côte d'Ivoire" && "CI"}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Industry Selection */}
                    <div className="max-w-xs">
                        <div className="label flex justify-start items-center gap-1">
                            <a href="/industries-categories" className=" inline-block p-0.5 rounded-lg bg-zinc-200 shadow-sm">
                                <Plus size={13} className="text-red-700" />
                            </a>
                            <span className="label-text font-normal text-black">Industry</span>
                        </div>
                        <select name="industry" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required>
                            <option className="text-sm font-semibold" value={Advert.industry}>{Advert.industry}</option>
                            {Industries.map((item) => (
                                <option key={item._id} className="text-sm" value={item.industry}>{item.industry}</option>
                            ))}
                        </select>
                    </div>

                    {/* Category Selection */}
                    <div className="max-w-xs">
                        <div className="label">
                            <span className="label-text font-normal text-black">Category</span>
                        </div>
                        <select name="category" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required>
                            <option className="text-sm font-semibold" value={Advert.category}>{Advert.category}</option>
                            {Categories.map((item) => (
                                <option key={item._id} className="text-sm" value={item.category}>{item.category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Publication Selection */}
                    <div className="max-w-xs">
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
                            {Advert.publications.map((item) => (
                                <option key={item} className="text-sm font-semibold" value={item} selected>
                                    {item}
                                </option>
                            ))}
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
                            <option className="text-sm font-semibold" value={Advert.adsize}>{Advert.adsize}</option>
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
                            <input
                                name="rate" type="number" min={0}
                                className="grow font-semibold text-black" placeholder="Rate"
                                required
                                value={rate}
                                onChange={(e) => {
                                    setrate(e.target.value)
                                }}
                            />
                        </label>
                    </div>

                    <div className="grow">
                        <div className="label">
                            <span className="label-text font-normal text-black">Identifier</span>
                        </div>
                        <label className="input input-sm flex w-full items-center gap-2 bg-zinc-100 rounded-md shadow-sm">
                            <Bookmark size={15} className="text-red-700" />
                            <input
                                name="identifier" type="text"
                                className="grow font-semibold text-black" placeholder="Identifier"
                                required
                                value={identifier}
                                onChange={(e) => {
                                    setidentifier(e.target.value);
                                }}
                            />
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
                            value={date}
                            onChange={(e) => {
                                setdate(e.target.value)
                            }}
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
                            {Advert.pages.map((item) => (
                                <option key={item} className="text-sm font-semibold" value={item} selected>
                                    {item}
                                </option>
                            ))}
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
                            <option className="text-sm font-semibold" value={Advert.colorformat}>{Advert.colorformat}</option>
                            {colorformat.map((item) => (
                                <option key={item.id} className="text-sm" value={item.type}>{item.type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-center items-center gap-2 grow">

                        <a href={Advert.imageurl} download target="_blank">
                            {/* <Image
                                className="rotate-3 shadow-sm rounded"
                                src={Advert.imageurl}
                                width={40}
                                height={40}
                                alt="Image File"
                            /> */}
                            <FileImage
                                size={30}
                                className="rotate-3 text-zinc-500 shadow-md rounded-lg bg-white p-1 px-0 hover:bg-red-700 hover:text-white" />
                        </a>

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
                            // required
                            />
                        </label>
                    </div>




                    <div className="">
                        <div className="label">
                            <span className="label-text font-normal text-black">
                                Country
                            </span>
                        </div>
                        <select name="country" className="select select-sm w-full rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required>
                            <option className="text-sm font-semibold" value={Advert.country}>{Advert.country}</option>
                            {countries.slice(1).map((item) => (
                                <option key={item.id} className="text-sm" value={item.country}>{item.country}</option>
                            ))}
                        </select>
                    </div>

                </div>

                <div className="flex justify-end items-center gap-3">
                    <div className="flex justify-end items-center gap-3">
                        {editing === false && (
                            <button
                                type="submit"
                                className="flex justify-start items-center gap-2 btn-sm bg-red-700 rounded-full px-3 py-1 text-white font-sans font-bold text-xs">
                                <Pencil size={15} className="" />
                                <span>Edit</span>
                            </button>
                        )}

                        {editing === true && (
                            <button
                                type="button"
                                className="flex justify-start items-center gap-2 btn-sm bg-red-400 rounded-full px-3 py-1 text-white font-sans font-bold text-xs opacity-80 btn-disabled">
                                <span className="loading loading-spinner loading-xs text-red-green"></span>
                                <span>Editing...</span>
                            </button>
                        )}
                    </div>
                </div>
            </form>

            <ToastAlert
                stateVar={advertsaved}
                textColor="text-army-green"
                text="Advert Edited."
                onClick={() => setadvertsaved(false)}
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