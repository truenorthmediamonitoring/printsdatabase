"use client"

import { Pencil, X } from "lucide-react";
import DelCategoryForm from "./delcategoryform";
import { useState } from "react";
import ToastAlert from "./toast";

export default function CategoriesTable({ Categories }) {
    const [category, setcategory] = useState({
        category: "",
        id: "",
    })

    const sortedCategories = Categories.slice().sort((a, b) =>
        a.category.localeCompare(b.category)
    );

    const [editing, setediting] = useState(false);
    const [categoryedited, setcategoryedited] = useState(false);
    const [internalerror, setinternalerror] = useState(false);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setediting(true);

        const category = event.target.category.value;
        const id = event.target.id.value;

        const data = {
            category,
            id
        }

        // console.log(data);
        // setediting(false);

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

        // API endpoint where we send form data.
        const endpoint = "/api/editcategory";

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
        // console.log(result);

        if (result.okay) {
            setcategoryedited(true);
            setediting(false);
            event.target.reset();
            setTimeout(() => {
                location.reload(true);
            }, 1000);
        } else {
            setinternalerror(true)
            setadding(false);
        }

    }


    return (
        <>
            <div className="overflow-scroll md:overflow-auto max-h-80 max-w-lg shadow-sm shadow-gray-300 rounded-xl flex-grow">
                <table className="table table-xs table-pin-rows bg-zinc-100">
                    <tbody className=" ">
                        <tr className="text-black">
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {sortedCategories.map((item) => (
                            <tr key={item._id} className="text-black text-xs hover:bg-zinc-100">
                                <td className="font-semibold">{item.category}</td>
                                <td>
                                    <div className="flex justify-end items-center gap-1">

                                        {/* Edit Category Modal  */}
                                        <button
                                            onClick={
                                                () => {
                                                    document.getElementById('edit_category_modal').showModal();
                                                    setcategory({
                                                        category: item.category,
                                                        id: item._id,
                                                    });
                                                }}

                                            type="button"
                                            className="btn-xs flex justify-start items-center gap-1.5 bg-zinc-200 hover:bg-zinc-300 transition-all text-zinc-700 rounded-full font-sans font-semibold text-xs py-0 px-2">
                                            <Pencil size={13} />
                                            <span>Edit</span>
                                        </button>

                                        <dialog id="edit_category_modal" className="modal">
                                            <div className="modal-box w-80 bg-zinc-50">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                        <X size={15} className="text-red-700" />
                                                    </button>
                                                </form>
                                                <div className="mb-5">
                                                    <h1 className="text-xl text-black font-notosans font-bold leading-none">Edit Category</h1>
                                                    <span className="label-text text-xs text-zinc-500">{category.id}</span>
                                                </div>
                                                {/* Form  */}

                                                <form onSubmit={handleFormSubmit}>
                                                    <div className="grow mb-4">
                                                        <label className="input input-sm flex w-full md:max-w-2xl items-center gap-2 bg-zinc-100 rounded-md shadow-sm">
                                                            {/* <Factory size={15} className="text-red-700" /> */}
                                                            <input
                                                                name="category"
                                                                type="text"
                                                                className="grow font-semibold text-black"
                                                                onChange={(e) => {
                                                                    setcategory({
                                                                        category: e.target.value,
                                                                        id: category.id,
                                                                    })
                                                                }}
                                                                value={category.category}
                                                                required
                                                            />
                                                        </label>
                                                    </div>

                                                    <div className="flex justify-between items-center gap-3">
                                                        <kbd className="kbd kbd-xs bg-zinc-100 text-black">esc</kbd>
                                                        <div className="flex justify-end items-center gap-3">
                                                            {editing === false && (
                                                                <button
                                                                    name="id"
                                                                    value={category.id}
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
                                                {/* Form  */}

                                                <ToastAlert
                                                    stateVar={categoryedited}
                                                    textColor="text-army-green"
                                                    text="Category edited."
                                                    onClick={() => setcategoryedited(false)}
                                                    iconHint="success"
                                                />

                                                <ToastAlert
                                                    stateVar={internalerror}
                                                    textColor=" text-red-500"
                                                    text="Something went wrong. Try again."
                                                    onClick={() => setinternalerror(false)}
                                                    iconHint="internalerror"
                                                />
                                            </div>
                                        </dialog>
                                        {/* Edit Category Modal  */}

                                        <DelCategoryForm id={item._id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}