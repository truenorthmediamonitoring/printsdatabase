import { BadgeCheck, ShieldCheck, Unlock, User } from "lucide-react";

export default function AuthorizedUser() {
    return (
        <>
            <div className="tooltip tooltip-right" data-tip="Administrative access.">
                <span className="badge badge-sm bg-zinc-200 text-green-800 border-green-50 text-xs flex items-center gap-1">
                    <ShieldCheck size={15} />
                    <span className="text-xs">Administrator</span>
                    <User size={10} />
                </span>
            </div>
        </>
    )
}