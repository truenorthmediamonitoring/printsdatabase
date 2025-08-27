import { LayoutDashboard, LockKeyhole } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedAccess() {
    return (
        <>
            <div className="flex flex-col md:flex-row gap-2 justify-between items-start">
                <div>
                    <LockKeyhole size={30} className="text-red-700" />
                    <h1 className=" text-3xl text-black font-notosans font-bold ">Unauthorized Access</h1>
                    <span className="label-text text-black">You don't have the clearance to access this page</span>
                </div>
                <Link href="/dashboard">
                    <button
                        className="btn-ghost btn-xs rounded-full flex justify-start items-center gap-1 shadow-sm transition-all bg-zinc-100 text-black mb-5">

                        <LayoutDashboard size={15} />
                        <span className="text-xs">Go to Dashboard</span>
                    </button>
                </Link>
            </div>
        </>
    )
}