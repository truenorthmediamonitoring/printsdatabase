import "./globals.css";
import { noto_sans, noto_serif } from "@/app/ui/fonts"
import NavigationBar from "./ui/navbar";
import Footer from "./ui/footer";

import { getServerSession } from "next-auth";
import SessionProvider from "@/app/ui/SessionProvider"

export const metadata = {
  title: "TNMM LTD Print Database",
  description: "True North Media Monitoring Ltd print database ",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession()
  // console.log(session);
  
  return (
    <html lang="en" className=" bg-zinc-100">
      <body className={`${noto_sans.variable} ${noto_serif.variable}`}>
        <SessionProvider session={session}>
          <NavigationBar />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
