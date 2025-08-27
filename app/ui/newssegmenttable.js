import { getNewsSegment } from "../lib/getNewsSegment";
import DelNewsSegmentForm from "./delnewssegmentform";

export default async function NewsSegmentTable() {
    const data = await getNewsSegment();
    // console.log(data);

    // Convert data to a plain object
    const NewsSegments = JSON.parse(JSON.stringify(data));

    return (
        <>
            <div className="overflow-scroll md:overflow-auto md:max-w-md max-h-80 shadow-sm shadow-gray-300 rounded-xl flex-grow">
                <table className="table table-xs table-pin-rows bg-zinc-100">
                    <tbody className="text-black">
                        <tr>
                            <th>News Segment</th>
                            <th className="flex justify-end items-center">Actions</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {NewsSegments && NewsSegments.reverse().map((item) => (
                            <tr key={item._id} className="text-black text-xs hover:bg-zinc-100">
                                <td className="font-bold">{item.newssegment}</td>
                                <td className="flex justify-end items-center">
                                    <DelNewsSegmentForm id={item._id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
