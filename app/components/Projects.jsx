"use client";
import TeamCarousel from "./team-carusol";

const teamMembers = [
  {
    id: "1",
    name: "Gadget Bodda",
    role: "Founder",
    image: "/gadgetboadda-p.webp",
    bio: "Visionary leader with 10+ years of experience.",
    liveUrl: "https://www.gadgetboddaa.com",
  },
  {
    id: "2",
    name: "MKS Outfit",
    role: "Founder",
    image: "/mks.webp",
    bio: "Visionary leader with 10+ years of experience.",
    liveUrl: "https://mksoutfit.vercel.app",
  },
  {
    id: "3",
    name: "GadgetCheap",
    role: "Founder",
    image: "/gadcheap-p.webp",
    bio: "Visionary leader with 10+ years of experience.",
    liveUrl: "https://gad-style-website-five.vercel.app",
  },
  {
    id: "4",
    name: "Taiba Mart",
    role: "Founder",
    image: "/taiba-p.webp",
    bio: "Visionary leader with 10+ years of experience.",
    liveUrl: "https://www.taibamart.com",
  },
  {
    id: "5",
    name: "Portfolio",
    role: "Founder",
    image: "/zunayeksaki-p.webp",
    bio: "Visionary leader with 10+ years of experience.",
    liveUrl: "https://zunayedsaki.vercel.app",
  },
  {
    id: "6",
    name: "Voter Kotha",
    role: "Founder",
    image: "/voter-kotha-p.webp",
    bio: "Visionary leader with 10+ years of experience.",
    liveUrl: "https://voterkotha.online",
  },
  {
    id: "7",
    name: "MaxCart",
    role: "Founder",
    image: "/maxcart-p.webp",
    bio: "Visionary leader with 10+ years of experience.",
    liveUrl: "https://maxcart.com.bd",
  },
  {
    id: "8",
    name: "Commeriva",
    role: "Founder",
    image: "/commeriva-p.webp",
    bio: "Visionary leader with 10+ years of experience.",
    liveUrl: "https://commeriva.vercel.app",
  },
];

const Project = () => {
  return (
    <section
      id="projects"
      className="bg-transparent text-white md:pt-10 md:pb-5"
    >
      {/* <h1 className="text-white text-4xl">My Showcase</h1> */}

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-50 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transform translate-x-1/2 z-0 -translate-y-1/2" />
        <div className="absolute top-50 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transform translate-x-1/2 z-0 -translate-y-1/2" />
        <div className="absolute bottom-48 left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-10 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>
      <TeamCarousel
        members={teamMembers}
        title="Project Showcase"
        background="transparent"
        autoPlay={10000}
        onMemberChange={(member, index) => {
          console.log("Active member:", member.name);
        }}
      />
    </section>
  );
};

export default Project;
