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

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mazharul Islam",
  description: "Front-End Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${bruno.variable}
      
        ${rajdhani.variable}
        ${audiowide.variable}
        ${dongle.variable}
        ${borel.variable}
     
        ${poppins.variable}
    
         antialiased`}
      >
        {children}
        {/* <Suspense fallback={<Loader />}></Suspense> */}
      </body>
    </html>
  );
}
