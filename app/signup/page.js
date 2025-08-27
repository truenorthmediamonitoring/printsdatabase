import Image from "next/image";
import Link from "next/link";
import SignupForm from "../ui/signupform";

export default function Signup() {
    return (
        <>
            <div className="h-screen flex justify-center items-center bg-[url(/backgroundimages/Abstract-White.png)] bg-cover bg-center bg-no-repeat bg-fixed">
                <div className="py-6 px-6 w-80 shadow-md rounded-md bg-white text-center">
                    <div className="mb-4 text-black font-sans font-bold">
                        <Link href="/">
                            <Image
                                src="/tnmmlogotransparent.PNG"
                                width={40}
                                height={40}
                                alt="True North Logo Transparent"
                                className="m-auto mb-2"
                            />
                        </Link>
                        <div className="my-0">Create an Account!</div>
                        <p className="font-sans font-bold text-xs text-zinc-500 leading-0" >Enter your email address and password to create your credentials.</p>
                    </div>

                    <SignupForm />
                </div>
            </div>
        </>
    )
}