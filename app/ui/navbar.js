"use client"

import { ChevronDown, ExternalLink, IdCard, Layout, LogIn, LogOut, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { usePathname } from "next/navigation"

import { signIn, signOut, useSession } from "next-auth/react"

export default function NavigationBar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    return (
        <>
            {/* <div className={` fixed w-full ${pathname === "/signin" && "hidden" || pathname === "/signup" && "hidden" || pathname === "/dashboard" && "hidden" || pathname === "/advert" && "hidden"} flex justify-between items-center bg-white px-5 py-5 md:px-20 shadow-sm glass`} > */}

            <div className={`fixed w-full flex justify-between items-center bg-white px-5 py-5 md:px-20 shadow-sm glass
                ${pathname !== "/" && "hidden"}
            `}>

                <div className="flex justify-start items-center gap-2">
                    <Image
                        src="/tnmmlogotransparent.PNG"
                        width={40}
                        height={40}
                        alt="True North Logo Transparent"
                    />
                    <span className="font-sans font-bold text-lg md:text-2xl text-black">Prints Database</span>
                </div>

                <div className="flex justify-end items-center gap-5">
                    <div className="flex justify-end items-center gap-5">
                        <>
                            <Link href=""
                                className="hidden md:flex justify-start items-center gap-1 font-sans font-bold text-red-700">
                                <span>Visit our main site</span>
                                <ExternalLink size="10" />
                            </Link>
                            {!session && (
                                <Link href="/signin">
                                    <button
                                        type="button"
                                        className="btn-sm bg-red-700 rounded-full text-white font-sans font-bold text-xs md:text-sm flex items-center gap-2">
                                        Sign in
                                        {/* <LogIn size={15} /> */}
                                    </button>
                                </Link>
                            )}
                        </>


                        {session && (
                            <>
                                <div className="dropdown dropdown-bottom dropdown-end">
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="btn-sm rounded-full flex justify-start items-center gap-2 font-medium text-zinc-900 bg-zinc-50 hover:bg-zinc-100"
                                    >
                                        <div className="flex justify-start items-center gap-2">
                                            <User size={15} className="text-zinc-900" />
                                            <span className="font-bold" >{session.user.name}</span>
                                        </div>
                                        <ChevronDown size={15} className="text-zinc-500" />
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content z-[1] menu shadow-sm bg-zinc-100 rounded-2xl w-52 p-2 mt-3"
                                    >
                                        <li className="font-bold text-base-content">
                                            <Link className=" text-black flex items-center gap-2" href={`/dashboard`} role="button">
                                                <Layout size={15} className="text-red-700" />
                                                Dashboard
                                            </Link>
                                        </li>

                                        <li className="font-bold text-base-content">
                                            <a
                                                className="text-black flex items-center gap-2"
                                                role="button"
                                                onClick={() => signOut()}
                                            >
                                                <LogOut size={15} className="text-red-700" />
                                                <span>Sign Out</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>

                </div>

            </div>
            <Script src="https://kit.fontawesome.com/dcd356c426.js" />
        </>

    )
}