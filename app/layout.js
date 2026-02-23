import {
  Audiowide,
  Borel,
  Bruno_Ace,
  Dongle,
  Poppins,
  Rajdhani,
} from "next/font/google";
import "./globals.css";
import Script from "next/script";
import AnalyticsTracker from "./providers";
import Loader from "./components/Loader";
import { Suspense } from "react";

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
  title: "Mazharul Islam | Front-End Developer",
  description:
    "Portfolio of Mazharul Islam – Crafting modern, responsive, and user-friendly web interfaces using the latest front-end technologies.",
  keywords:
    "Mazharul Islam, Front-End Developer, Web Developer, React.js, JavaScript, Portfolio, UI/UX Design, Responsive Design, Next js",
  author: "Mazharul Islam",
  viewport: "width=device-width, initial-scale=1.0",
  icons: {
    icon: "/favicon.ico",
    apple: "/meetup.png",
    shortcut: "/meetup.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/meetup.png",
      },
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-J1SS1Q5X8T`}
          strategy="afterInteractive"
        />

        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J1SS1Q5X8T');
          `}
        </Script>
      </head>
      <body
        className={`${bruno.variable}
      
        ${rajdhani.variable}
        ${audiowide.variable}
        ${dongle.variable}
        ${borel.variable}
     
        ${poppins.variable}
    
         antialiased`}
      >
        <AnalyticsTracker />
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </body>
    </html>
  );
}
