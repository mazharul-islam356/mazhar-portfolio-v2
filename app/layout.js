import {
  Audiowide,
  Borel,
  Bruno_Ace,
  Cinzel,
  Dongle,
  Montserrat,
  Montserrat_Alternates,
  Poppins,
  Rajdhani,
  Science_Gothic,
} from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loader from "./components/Loader";
const montserrat_Alternates = Montserrat_Alternates({
  weight: ["400", "600", "700"],
  variable: "--font-montserrat_Alternates",
  subsets: ["latin"],
});

const borel = Borel({
  weight: "400",
  variable: "--font-borel",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const bruno = Bruno_Ace({
  weight: "400",
  variable: "--font-bruno",
  subsets: ["latin"],
});

const dongle = Dongle({
  weight: ["300", "400", "700"],
  variable: "--font-dongle",
  subsets: ["latin"],
});

const audiowide = Audiowide({
  weight: "400",
  variable: "--font-audiowide",
  subsets: ["latin"],
});

const science = Science_Gothic({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-science",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mazharul Islam | Portfolio",
  description: "Front-End Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${bruno.variable}
        ${rajdhani.variable}
        ${montserrat_Alternates.variable}
        ${montserrat.variable}
        ${audiowide.variable}
        ${dongle.variable}
        ${borel.variable}
        ${cinzel.variable}
        ${poppins.variable}
        ${science.variable}
         antialiased`}
      >
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </body>
    </html>
  );
}
