import { Noto_Serif, Noto_Sans } from "next/font/google";

export const noto_serif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
});

export const noto_sans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});
