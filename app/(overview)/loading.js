import Image from "next/image";

export default function Loading() {
    return (
        <>
            <div className="py-6 md:pt-24 px-4 h-screen md:px-10 rounded-lg bg-white shadow-sm overflow-scroll flex flex-col justify-center items-center gap-1">
                <span className="loading loading-dots loading-lg text-red-200"></span>
            </div>
        </>
    );
}