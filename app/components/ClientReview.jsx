"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ShinyTitle from "./ShinyTitle";
import { cn } from "../lib/utils";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ClientReview() {
  return (
    <div className="max-w-7xl mx-auto md:pt-12 pb-14 md:pb-8 text-slate-100 md:px-8 px-4">
      <div className="text-center md:mb-16 mb-10 mt-10 md:mt-5">
        <h2
          className={cn(
            "font-black hero-font uppercase tracking-tight text-center  whitespace-nowrap z-10 md: text-4xl lg:text-4xl xl:text-5xl",
          )}
          style={{
            top: "4rem",
            color: "white",
          }}
        >
          <ShinyTitle
            text="Client Feedback"
            disabled={false}
            speed={3}
            className="custom-class"
          />
        </h2>
      </div>

      <div className="grid grid-cols-1 mt-10 md:grid-cols-4 md:grid-rows-2 gap-6 max-w-7xl mx-auto">
        {/* Large Card 1 */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gray-800/15 border border-gray-800 rounded-2xl p-6 shadow-lg md:row-span-2 flex flex-col justify-between z-1000"
        >
          <Image
            width={200}
            height={200}
            src="/bodda-logo.jpg"
            alt="Company Logo"
            className="h-12 w-12 mb-4 object-contain rounded-full"
          />
          <p className="mb-6 text-slate-300">
            “Our new corporate website gives a strong impression to clients. It
            feels modern, professional, and perfectly represents our brand.”
          </p>
          <div className="flex items-center gap-3">
            <Image
              src="/bodda-c.jpg"
              width={32}
              height={32}
              className="rounded-full"
              alt="Atsushi Shimoikura"
            />
            <div>
              <p className="font-semibold text-sm">Farabi</p>
              <p className="text-xs text-slate-400">Owner of Gadget Bodda</p>
            </div>
          </div>
        </motion.div>

        {/* Small Cards */}
        {[
          {
            text: "Mazharul delivered an outstanding gadget e-commerce website for Maxcart, the UI/UX feels modern, smooth, and highly professional.",
            name: "HR Sumon",
            role: "Owner, Maxcart",
            img: "/sumon.jpg",
          },
          {
            text: "He built a clean and stylish fashion e-commerce site for Morshed Mart that’s easy to manage and looks premium without needing technical skills.",
            name: "Fahim Morshed",
            role: "Founder, Morshed Mart",
            img: "/mm-c.jpg",
          },
          {
            text: "Our MKS Outfit store has been completely transformed thanks to his outstanding UI/UX design expertise. From layout structure to visual hierarchy, every detail has been thoughtfully crafted to create a clean, modern, and highly intuitive shopping experience. The design is not only visually beautiful but also strategically optimized for usability and customer engagement.",
            name: "Motiur Rahman",
            role: "Owner, MKS Outfit",
            img: "/mks-c.jpg",
          },
          {
            text: "He successfully completed GadCheap with a stunning and powerful UI/UX — it looks like a large-scale professional e-commerce platform.",
            name: "Rifat Ahmad",
            role: "Owner, GadCheap",
            img: "/rifatbhai.jpg",
          },
          {
            text: "He created a modern, clean, and highly professional portfolio for me that perfectly represents my personal brand.",
            name: "SAMI",
            role: "Portfolio Owner",
            img: "/user.jpg",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`bg-gray-700/15 border border-gray-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between ${
              i === 2 ? "md:row-span-2" : ""
            }`}
          >
            <p className="mb-6 text-slate-300">{item.text}</p>
            <div className="flex items-center gap-3">
              <Image
                src={item.img}
                width={32}
                height={32}
                className="rounded-full"
                alt={item.name}
              />
              <div>
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="text-xs text-slate-400">{item.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
