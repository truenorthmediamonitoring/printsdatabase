import { Save, X } from "lucide-react";
import { useState } from "react";
import ToastAlert from "./toast";

export default function AddCategoryForm() {
    const [adding, setadding] = useState(false)
    const [categoryadded, setcategoryadded] = useState(false)
    const [internalerror, setinternalerror] = useState(false);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setadding(true)

        const category = event.target.category.value;

        const data = {
            category,
        }

        // console.log(data);

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

        // API endpoint where we send form data.
        const endpoint = "/api/savecategory";

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
            setcategoryadded(true);
            setadding(false);
            event.target.reset();
            setTimeout(() => {
                location.reload(true);
            }, 1500);
        } else {
            setinternalerror(true)
            setadding(false);
        }

    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div className="grow mb-4">
                    <div className="label">
                        <span className="label-text font-normal text-black">Category</span>
                    </div>
                    <label className="input input-sm flex w-full md:max-w-2xl items-center gap-2 bg-zinc-100 rounded-md shadow-sm">
                        {/* <Factory size={15} className="text-red-700" /> */}
                        <input name="category" type="text" className="grow font-semibold text-black" placeholder="Category name" required />
                    </label>
                </div>

                <div className="flex justify-between items-center gap-3">
                    <kbd className="kbd kbd-xs bg-zinc-100 text-black">esc</kbd>
                    <div className="flex justify-end items-center gap-3">
                        {adding === false && (
                            <button
                                type="submit"
                                className="flex justify-start items-center gap-2 btn-sm bg-red-700 rounded-full px-3 py-1 text-white font-sans font-bold text-xs">
                                <Save size={15} className="" />
                                <span>Add</span>
                            </button>
                        )}

                        {adding === true && (
                            <button
                                type="button"
                                className="flex justify-start items-center gap-2 btn-sm bg-red-400 rounded-full px-3 py-1 text-white font-sans font-bold text-xs opacity-80 btn-disabled">
                                <span className="loading loading-spinner loading-xs text-red-green"></span>
                                <span>Adding...</span>
                            </button>
                        )}
                    </div>
                </div>
            </form>

            <ToastAlert
                stateVar={categoryadded}
                textColor="text-army-green"
                text="Category added."
                onClick={() => setcategoryadded(false)}
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