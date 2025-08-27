import DelPublicationForm from "./delpublicationform";
import { getPublications } from "../lib/getPublications";
import Image from "next/image";

export default async function PublicationsTable() {
    const data = await getPublications();
    // console.log(data);

    // Convert data to a plain object
    const Publications = JSON.parse(JSON.stringify(data));
    return (
        <>
            <div className="overflow-scroll md:overflow-auto max-h-80 shadow-sm shadow-gray-300 rounded-xl flex-grow">
                <table className="table table-xs table-pin-rows bg-zinc-100">
                    <thead className=" ">
                        <tr className="text-white">
                            <th>Print Publications</th>
                            <th>Country</th>
                            <th className="flex justify-end items-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Publications && Publications.reverse().map((item) => (
                            <tr key={item._id} className="text-black text-xs hover:bg-zinc-100">
                                <td className="font-bold">{item.publication}</td>
                                <td className="font-bold">
                                    <div className="flex justify-start items-center gap-2">
                                        <Image
                                            className={`${item.country !== "Ghana" && "hidden"} rounded-sm`}
                                            src="https://flagcdn.com/w40/gh.png"
                                            width={20}
                                            height={20}
                                            alt="Ghana"
                                        />
                                        <Image
                                            className={`${item.country !== "Nigeria" && "hidden"} rounded-sm`}
                                            src="https://flagcdn.com/w40/ng.png"
                                            width={20}
                                            height={20}
                                            alt="Nigeria"
                                        />
                                        <Image
                                            className={`${item.country !== "Côte d'Ivoire" && "hidden"} rounded-sm`}
                                            src="https://flagcdn.com/w40/ci.png"
                                            width={20}
                                            height={20}
                                            alt="Côte d'Ivoire"
                                        />
                                        <div>{item.country}</div>
                                    </div>
                                </td>
                                <td className="flex justify-end items-center">
                                    <DelPublicationForm id={item._id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}