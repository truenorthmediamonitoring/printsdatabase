import { getCompanies } from "../lib/getCompanies"
import DelCompanyForm from "./delcompanyform";
import Image from "next/image";

export default async function CompaniesTable() {
    const data = await getCompanies();
    // console.log(data);

    // Convert data to a plain object
    const Companies = JSON.parse(JSON.stringify(data));
    return (
        <>
            <div className="overflow-scroll w-full md:overflow-auto max-h-80 shadow-sm shadow-gray-300 rounded-xl md:flex-grow">
                <table className="table table-xs table-pin-rows bg-zinc-100">
                    <tbody>
                        <tr className="text-black">
                            <th>Company</th>
                            <th>Country</th>
                            <th>Actions</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {Companies && Companies.reverse().map((item) => (
                            <tr key={item._id} className="text-black text-xs hover:bg-zinc-100">
                                <td className="font-bold">{item.company}</td>
                                <td>
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
                                <td className="flex justify-start items-center">
                                    <DelCompanyForm id={item._id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}