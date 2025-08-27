import Link from "next/link";
import Image from "next/image";
import { LogIn } from "lucide-react";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="h-screen flex justify-around items-center gap-5 px-5 py-20 md:px-20 flex-wrap 
    bg-[url(/backgroundimages/Abstract-White.png)] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="font-notosans text-black max-w-md">
        <h1 className="font-extrabold text-4xl mb-2">Modern Monitoring Solutions to Aid Your Business Growth</h1>
        <p className="font-bold mb-5 text-zinc-500">
          We monitor your TV and Radio and NewsPrint advertisments to ensure you're recieving the maximum benefits</p>

        {!session && (
          <>
            <Link href="/signin">
              <button
                type="submit"
                className="btn-sm md:btn-md bg-red-700 rounded-full px-5 text-white font-sans font-bold text-xs md:text-lg flex items-center gap-2">
                <span>Sign in to get started</span>
                {/* <LogIn size={15} /> */}
              </button>
            </Link>
          </>
        )
        }


      </div>

      <Image src="/hero-img.png"
        width={530}
        height={430}
        alt="Hero Image"
      />
    </div>
  );
}
