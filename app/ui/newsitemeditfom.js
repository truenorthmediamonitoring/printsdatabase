"use client"

import { Banknote, X, CloudUpload, Plus, Text, Play, Pencil } from "lucide-react";
import { countries, tones } from "../lib/data";
import { useState } from "react";
import ToastAlert from "./toast";
import { v1 } from "uuid";
import { uploadFile } from "../lib/awsS3/uploadfile";


export default function NewsItemEditForm({ ID, Companies, Industries, Categories, Sources, NewsSegment, NewsItem }) {
    const [editing, setediting] = useState(false)
    const [newsitemupdated, setnewsitemupdated] = useState(false)
    const [internalerror, setinternalerror] = useState(false);
    const [uploaderror, setuploaderror] = useState(false);
    const [date, setdate] = useState(new Date(NewsItem.date).toISOString().split("T")[0])



    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setediting(true)

        const company = event.target.company.value;
        const industry = event.target.industry.value;
        const category = event.target.category.value;
        const sources = event.target.sources;
        const headline = event.target.headline.value;
        const newssegment = event.target.newssegment.value;
        const date = event.target.date.value;
        const file = event.target.file.files;
        const tone = event.target.tone.value;
        const ave = event.target.ave.value;
        const country = event.target.country.value;
        const summary = event.target.summary.value;

        const multiplesources = Array.from(sources.selectedOptions).map(option => option.value);

        let resourceUrl;

        if (file.length > 0) {
            // console.log(file[0]);

            resourceUrl = await uploadFile(file[0]);

            if (resourceUrl.error) {
                setinternalerror(true)
                setsaving(false);
                return;
            }
        }

        const data = {
            ID,
            company,
            industry,
            category,
            multiplesources,
            headline,
            newssegment,
            date,
            url: !resourceUrl ? "" : resourceUrl,
            tone,
            ave,
            country,
            summary,
        }

        console.log(data);
        

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

        // API endpoint where we send form data.
        const endpoint = "/api/editnewsitem";

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
            setnewsitemupdated(true)
            setediting(false)
            // event.target.reset();
            setTimeout(() => { 
                window.location.href = '/news-items'; 
            }, 1500);
        } else {
            setinternalerror(true)
            setediting(false)
        }

    }

    return (
        <>
            <form onSubmit={handleFormSubmit} className="bg-white p-6 shadow-md rounded-lg">
                <div className="flex flex-wrap justify-start items-center gap-4 mb-4">
                    {/* Company Selection */}
                    <div className="">
                        <div className="label flex justify-start items-center gap-2">
                            <a href="/companies" className=" inline-block p-0.5 rounded-lg bg-zinc-200 shadow-sm">
                                <Plus size={13} className="text-red-700" />
                            </a>
                            <span className="label-text font-normal text-black">Company</span>
                        </div>
                        <select name="company" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold grow" required>
                            <option className="text-sm font-semibold" defaultValue={NewsItem.company} selected>{NewsItem.company}</option>
                            {Companies.reverse().map((item) => (
                                <option key={item._id} className="text-sm" value={item.company}>
                                    {item.company} | {item.country === "Ghana" && "GH" || item.country === "Nigeria" && "NG" || item.country === "Côte d'Ivoire" && "CI"}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Industry Selection */}
                    <div className="">
                        <div className="label flex justify-start items-center gap-2">
                            <a href="/industries-categories" className=" inline-block p-0.5 rounded-lg bg-zinc-200 shadow-sm">
                                <Plus size={13} className="text-red-700" />
                            </a>
                            <span className="label-text font-normal text-black">Industry</span>
                        </div>
                        <select name="industry" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required>
                            <option className="text-sm font-semibold" defaultValue={NewsItem.industry} selected>{NewsItem.industry}</option>
                            {Industries.reverse().map((item) => (
                                <option key={item._id} className="text-sm" value={item.industry}>{item.industry}</option>
                            ))}
                        </select>
                    </div>

                    {/* Category Selection */}
                    <div className="">
                        <div className="label">
                            <span className="label-text font-normal text-black">Category</span>
                        </div>
                        <select name="category" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required>
                            <option className="text-sm font-semibold" defaultValue={NewsItem.category} selected>{NewsItem.category}</option>
                            {Categories.reverse().map((item) => (
                                <option key={item._id} className="text-sm" value={item.category}>{item.category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Source Selection */}
                    <div className="">
                        <div className="label flex justify-start items-center gap-1">
                            <a href="/publications-sources" className=" inline-block p-0.5 rounded-lg bg-zinc-200 shadow-sm">
                                <Plus size={13} className="text-red-700" />
                            </a>
                            <span className="label-text font-normal text-black">Source</span>
                        </div>
                        <select
                            size={4}
                            multiple
                            name="sources"
                            className="select select-sm rounded-md shadow-sm bg-zinc-100 font-semibold text-black" required>
                            {NewsItem.sources.map((item) => (
                                <option key={item} className="text-sm font-semibold" defaultValue={item} selected>
                                    {item}
                                </option>
                            ))}
                            {Sources.reverse().map((item) => (
                                <option key={item._id} className="text-sm" value={item.source}>
                                    {item.source} | {item.country === "Ghana" && "GH" || item.country === "Nigeria" && "NG" || item.country === "Côte d'Ivoire" && "CI"}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

                <div className="flex flex-wrap justify-start items-center gap-4 mb-4">
                    {/* Headline */}
                    <div className="grow">
                        <div className="label">
                            <span className="label-text font-normal text-black">Headline</span>
                        </div>
                        <label className="input input-sm flex items-center gap-2 bg-zinc-100 rounded-md shadow-sm">
                            <Text size={15} className="text-red-700" />
                            <input name="headline" type="text" className="grow font-semibold text-black" placeholder="Headline"
                                defaultValue={NewsItem.headline}
                                required />
                        </label>
                    </div>

                    {/* News Segement */}
                    <div className="">
                        <div className="label flex justify-start items-center gap-2">
                            <a href="/publications-sources" className=" inline-block p-0.5 rounded-lg bg-zinc-200 shadow-sm">
                                <Plus size={13} className="text-red-700" />
                            </a>
                            <span className="label-text font-normal text-black">News Segement</span>
                        </div>
                        <select name="newssegment" className="select select-sm md:max-w-xs rounded-md shadow-sm bg-zinc-100 font-semibold text-black" required>
                            <option className="text-sm font-semibold" defaultValue={NewsItem.newssegment} selected>{NewsItem.newssegment}</option>
                            {NewsSegment.map((item) => (
                                <option key={item._id} className="text-sm" value={item.newssegment}>{item.newssegment}</option>
                            ))}
                        </select>
                    </div>

                    {/* Date */}
                    <div className="w-full md:max-w-56">
                        <div className="label">
                            <span className="label-text font-normal text-black">Date</span>
                        </div>
                        <input
                            name="date"
                            type="date"
                            min="2018-01-01"
                            className="py-1 px-2 w-full text-sm font-semibold rounded-md focus:outline-none shadow-sm bg-zinc-700 text-white"
                            required
                            onChange={(e) => {
                                setdate(e.target.value)
                            }}
                            value={date}
                        />
                    </div>

                </div>

                <div className="flex flex-wrap justify-between items-center gap-4 mb-5">

                    <div className="flex justify-start items-center gap-2">

                        <a href={NewsItem.url} download target="_blank">
                            <button
                                type="button"
                                className="btn-xs flex justify-start items-center gap-1 bg-red-700 text-zinc-200 rounded-full font-sans font-semibold shadow text-xs px-2">
                                <Play size={13} />
                                <span>Play</span>
                            </button>
                        </a>

                        <label className="form-control rounded-md">
                            <div className="label">
                                <span className="label-text font-normal text-black">
                                    Resource
                                </span>
                                <span className="label-text-alt text-xs text-zinc-500 font-normal">(.mp3, .wav, .ogg, .aac, .mp4, .webm)</span>
                            </div>
                            <input
                                type="file"
                                name="file"
                                accept=".mp3,.wav,.ogg,.aac,.mp4,.webm"
                                className="file-input file-input-ghost file-input-sm rounded-md focus:outline-none bg-zinc-700 text-white font-medium"
                            />
                        </label>
                    </div>



                    <div className="">
                        <div className="label">
                            <span className="label-text font-normal text-black">
                                Tone
                            </span>
                        </div>
                        <select name="tone" className="select select-sm w-full rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required>
                            <option className="text-sm font-semibold" defaultValue={NewsItem.tone} selected>{NewsItem.tone}</option>
                            {tones.map((item) => (
                                <option key={item.id} className="text-sm" value={item.tone}>{item.tone}</option>
                            ))}
                        </select>
                    </div>

                    <div className="">
                        <div className="label">
                            <span className="label-text font-normal text-black">AVE</span>
                        </div>
                        <label className="input input-sm flex w-full items-center gap-2 bg-zinc-100 rounded-md shadow-sm">
                            <Banknote size={15} className="text-red-700" />
                            <input
                                name="ave"
                                type="number"
                                defaultValue={NewsItem.ave}
                                min={0}
                                className="grow font-semibold text-black" placeholder="AVE"
                                required />
                        </label>
                    </div>

                    <div className="">
                        <div className="label">
                            <span className="label-text font-normal text-black">
                                Country
                            </span>
                        </div>
                        <select name="country" className="select select-sm w-full rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required>
                            <option className="text-sm font-semibold" defaultValue={NewsItem.country} selected>{NewsItem.country}</option>
                            {countries.slice(1).map((item) => (
                                <option key={item.id} className="text-sm" value={item.country}>{item.country}</option>
                            ))}
                        </select>
                    </div>

                </div>

                <div className="grow mb-4">
                    <textarea
                        name="summary"
                        placeholder="Summary"
                        defaultValue={NewsItem.summary}
                        className="textarea textarea-sm w-full bg-zinc-100 font-semibold text-black shadow-sm"></textarea>
                </div>

                {/* Buttons  */}
                <div className="flex justify-end items-center gap-3">
                    <div className="flex justify-end items-center gap-3">
                        {editing === false && (
                            <button
                                type="submit"
                                className="flex justify-start items-center gap-2 btn-sm bg-zinc-700 rounded-full px-3 py-1 text-white font-sans font-bold text-xs">
                                <Pencil size={15} className="" />
                                <span>Edit</span>
                            </button>
                        )}

                        {editing === true && (
                            <button
                                type="button"
                                className="flex justify-start items-center gap-2 btn-sm bg-zinc-400 rounded-full px-3 py-1 text-white font-sans font-bold text-xs opacity-80 btn-disabled">
                                <span className="loading loading-spinner loading-xs text-red-green"></span>
                                <span>Editing...</span>
                            </button>
                        )}
                    </div>
                </div>
            </form>

            <ToastAlert
                stateVar={newsitemupdated}
                textColor="text-army-green"
                text="News item Upated."
                onClick={() => setnewsitemupdated(false)}
                iconHint="success"
            />

            <ToastAlert
                stateVar={uploaderror}
                textColor=" text-red-500"
                text="File Upload failed. Please try again."
                onClick={() => setuploaderror(false)}
                iconHint="internalerror"
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