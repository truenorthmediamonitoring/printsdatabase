"use client"

import { Plus, X, CloudUpload, Text, Pencil } from "lucide-react"
import { countries, pages, themes, tones, prominence, withpictures, focus } from "../lib/data"
import { useState } from "react"
import ToastAlert from "./toast"

export default function HeadlineEditForm({ ID, Companies, Industries, Categories, Publications, OnlinePublications, Headline }) {
    const [editing, setediting] = useState(false)
    const [headlinesaved, setheadlinesaved] = useState(false)
    const [internalerror, setinternalerror] = useState(false);
    const [date, setdate] = useState(new Date(Headline.date).toISOString().split("T")[0])

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setediting(true);

        const company = event.target.company.value;
        const industry = event.target.industry.value;
        const category = event.target.category.value;
        const publications = event.target.publications;
        const onlinepublications = event.target.onlinepublications;
        const pages = event.target.pages;
        const prominence = event.target.prominence.value;
        const withpictures = event.target.withpictures.value;
        const focus = event.target.focus.value;
        const date = event.target.date.value;
        const headline = event.target.headline.value;
        const theme = event.target.theme.value;
        const tone = event.target.tone.value;
        const country = event.target.country.value;

        const multiplepublications = Array.from(publications.selectedOptions).map(option => option.value);
        const multipleonlinepublications = Array.from(onlinepublications.selectedOptions).map(option => option.value);
        const selectedpages = Array.from(pages.selectedOptions).map(option => option.value);

        const data = {
            ID,
            company,
            industry,
            category,
            multiplepublications,
            multipleonlinepublications,
            selectedpages,
            prominence,
            withpictures,
            focus,
            date,
            headline,
            theme,
            tone,
            country,
        }

        // console.log(data);
        // setediting(false);

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

        // API endpoint where we send form data.
        const endpoint = "/api/editheadline";

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
            setheadlinesaved(true)
            setediting(false)
            setTimeout(() => {
                window.location.href = '/headlines';
            }, 1500);
        } else {
            setinternalerror(true)
            setediting(false)
        }

    }

    return (
        <>
            <form onSubmit={handleFormSubmit} className="bg-white p-6 shadow-md rounded-lg">
                <div className="flex flex-wrap justify-start items-center gap-5 mb-4">
                    {/* Company Selection */}
                    <div>
                        <div className="label flex justify-start items-center gap-1">
                            <a href="/companies" className=" inline-block p-0.5 rounded-lg bg-zinc-200 shadow-sm">
                                <Plus size={13} className="text-red-700" />
                            </a>
                            <span className="label-text font-normal text-black">Company</span>
                        </div>
                        <select name="company" className="select select-sm rounded-md bg-zinc-100 text-black font-semibold" required>
                            <option className="text-sm font-semibold" defaultValue={Headline.company} selected>{Headline.company}</option>
                            {Companies.map((item) => (
                                <option key={item._id} className="text-sm" value={item.company}>
                                    {item.company} | {item.country === "Ghana" && "GH" || item.country === "Nigeria" && "NG" || item.country === "Côte d'Ivoire" && "CI"}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Industry Selection */}
                    <div>
                        <div className="label flex justify-start items-center gap-1">
                            <a href="/industries-categories" className=" inline-block p-0.5 rounded-lg bg-zinc-200 shadow-sm">
                                <Plus size={13} className="text-red-700" />
                            </a>
                            <span className="label-text font-normal text-black">Industry</span>
                        </div>
                        <select name="industry" className="select select-sm rounded-md bg-zinc-100 text-black font-semibold" required>
                            <option className="text-sm font-semibold" defaultValue={Headline.industry} selected>{Headline.industry}</option>
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
                        <select name="category" className="select select-sm rounded-md bg-zinc-100 text-black font-semibold" required>
                            <option className="text-sm font-semibold" defaultValue={Headline.category} selected>{Headline.category}</option>
                            {Categories.map((item) => (
                                <option key={item._id} className="text-sm" value={item.category}>{item.category}</option>
                            ))}
                        </select>
                    </div>

                </div>

                <div className="flex flex-wrap justify-start items-center gap-5 mb-4">
                    {/* Online Publication Selection */}
                    <div>
                        <div className="label flex justify-start items-center gap-1">
                            <a href="/publications-sources" className=" inline-block p-0.5 rounded-lg bg-zinc-200 shadow-sm">
                                <Plus size={13} className="text-red-700" />
                            </a>
                            <span className="label-text font-normal text-black">Online Publication</span>
                        </div>
                        <select
                            size={4}
                            multiple
                            name="onlinepublications"
                            className="select select-sm rounded-md shadow-sm bg-zinc-100 font-semibold text-black w-full">
                            {Headline.onlinepublications.map((item) => (
                                <option key={item} className="text-sm font-semibold" defaultValue={item} selected>
                                    {item}
                                </option>
                            ))}
                            {OnlinePublications.map((item) => (
                                <option key={item._id} className="text-sm" value={item.publication}>
                                    {item.publication} | {item.country === "Ghana" && "GH" || item.country === "Nigeria" && "NG" || item.country === "Côte d'Ivoire" && "CI"}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Publication Selection */}
                    <div>
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
                            className="select select-sm rounded-md bg-zinc-100 font-semibold text-black w-full">
                            {Headline.publications.map((item) => (
                                <option key={item} className="text-sm font-semibold" defaultValue={item} selected>
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

                    {/* Pages Selection */}
                    <div>
                        <div className="label flex justify-start items-center gap-1">
                            <span className="label-text font-normal text-black">Page Number(s)</span>
                        </div>
                        <select
                            size={4}
                            multiple
                            name="pages"
                            className="select select-sm rounded-md bg-zinc-100 font-semibold text-black w-full" required>
                            {Headline.pages.map((item) => (
                                <option key={item} className="text-sm font-semibold" defaultValue={item} selected>
                                    {item}
                                </option>
                            ))}
                            {pages.map((item) => (
                                <option key={item.id} className="text-sm" value={item.page}>
                                    {item.page}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Prominence Selection */}
                    <div>
                        <div className="label flex justify-start items-center gap-1">
                            <span className="label-text font-normal text-black">Prominence</span>
                        </div>
                        <select
                            name="prominence"
                            className="select select-sm rounded-md shadow-sm bg-zinc-100 font-semibold text-black w-full" required
                            defaultValue="">
                            <option className="text-sm font-semibold" defaultValue={Headline.prominence} selected>{Headline.prominence}</option>
                            {prominence.map((item) => (
                                <option key={item.id} className="text-sm" value={item.page}>
                                    {item.page}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* With Pictures Selection */}
                    <div>
                        <div className="label flex justify-start items-center gap-1">
                            <span className="label-text font-normal text-black">With Picture(s)</span>
                        </div>
                        <select
                            name="withpictures"
                            className="select select-sm rounded-md shadow-sm bg-zinc-100 font-semibold text-black w-full" required>
                            <option className="text-sm font-semibold" defaultValue={Headline.withpictures} selected>{Headline.withpictures}</option>
                            {withpictures.map((item) => (
                                <option key={item.id} className="text-sm" value={item.option}>
                                    {item.option}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Focus Selection */}
                    <div>
                        <div className="label flex justify-start items-center gap-1">
                            <span className="label-text font-normal text-black">Focus</span>
                        </div>
                        <select
                            name="focus"
                            className="select select-sm rounded-md shadow-sm bg-zinc-100 font-semibold text-black w-full" required
                            defaultValue="">
                            <option className="text-sm font-semibold" defaultValue={Headline.focus} selected>{Headline.focus}</option>
                            {focus.map((item) => (
                                <option key={item.id} className="text-sm" value={item.option}>
                                    {item.option}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

                <div className="flex flex-wrap justify-start items-center gap-4 mb-4">
                    {/* Date */}
                    <div className="w-full md:max-w-56">
                        <div className="label">
                            <span className="label-text font-normal text-black">Date</span>
                        </div>
                        <input
                            name="date"
                            type="date"
                            // min="2018-01-01"
                            onChange={(e) => {
                                setdate(e.target.value)
                            }}
                            value={date}
                            className="py-1 px-2 w-full text-sm font-semibold rounded-md focus:outline-none bg-zinc-700 text-white"
                            required
                        />
                    </div>
                    {/* Headline */}
                    <div className="grow">
                        <div className="label">
                            <span className="label-text font-normal text-black">Headline</span>
                        </div>
                        <label className="input input-sm flex w-full items-center gap-2 bg-zinc-100 rounded-md shadow-sm">
                            <Text size={15} className="text-red-700" />
                            <input
                                name="headline" type="text" className="grow font-semibold text-black"
                                placeholder="Headline"
                                defaultValue={Headline.headline}
                                required />
                        </label>
                    </div>

                    <div className="">
                        <div className="label">
                            <span className="label-text font-normal text-black">
                                Theme(s)
                            </span>
                        </div>
                        <select
                            name="theme" className="select select-sm w-full rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required>
                            {Headline.themes.map((item) => (
                                <option key={item} className="text-sm font-semibold" defaultValue={item} selected>
                                    {item}
                                </option>
                            ))}
                            {themes.map((item) => (
                                <option key={item.id} className="text-sm" value={item.theme}>{item.theme}</option>
                            ))}
                        </select>
                    </div>

                    <div className="">
                        <div className="label">
                            <span className="label-text font-normal text-black">
                                Tone
                            </span>
                        </div>
                        <select name="tone" className="select select-sm w-full rounded-md bg-zinc-100 text-black font-semibold" required>
                            <option className="text-md font-semibold" value={Headline.tone}>{Headline.tone}</option>
                            {tones.map((item) => (
                                <option key={item.id} className="text-sm" value={item.tone}>{item.tone}</option>
                            ))}
                        </select>
                    </div>

                    <div className="">
                        <div className="label">
                            <span className="label-text font-normal text-black">
                                Country
                            </span>
                        </div>
                        <select name="country" className="select select-sm w-full rounded-md bg-zinc-100 text-black font-semibold" required>
                            <option className="text-md font-semibold" defaultValue={Headline.country}>{Headline.country}</option>
                            {countries.slice(1).map((item) => (
                                <option key={item.id} className="text-sm" value={item.country}>{item.country}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Buttons  */}
                <div className="flex justify-end items-center gap-3">
                    <div className="flex justify-end items-center gap-3">
                        {editing === false && (
                            <button
                                type="submit"
                                className="flex justify-start items-center gap-2 btn-sm bg-zinc-700 rounded-full px-3 py-1 text-white font-sans font-bold text-xs">
                                <Pencil size={15} />
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
                stateVar={headlinesaved}
                textColor="text-army-green"
                text="Headline Edited."
                onClick={() => setheadlinesaved(false)}
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