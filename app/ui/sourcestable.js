import Image from "next/image"
import { getSources } from "../lib/getSources"
import DelSourceForm from "./delsourceform";

export default async function SourcesTable() {

    const data = await getSources();
    // console.log(data);

    // Convert data to a plain object
    const Sources = JSON.parse(JSON.stringify(data));

    return (
        <>
            <div className="overflow-scroll md:overflow-auto max-h-80 shadow-sm shadow-gray-300 rounded-xl flex-grow">
                <table className="table table-xs table-pin-rows bg-zinc-100">
                    <tbody className=" ">
                        <tr className="text-black font-normal">
                            <th>Source</th>
                            <th>Country</th>
                            <th className="flex justify-end items-center">Actions</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {Sources && Sources.reverse().map((item) => (
                            <tr key={item._id} className="text-black text-xs hover:bg-zinc-100">
                                <td className="font-bold">{item.source}</td>
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
                                    <DelSourceForm id={item._id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}