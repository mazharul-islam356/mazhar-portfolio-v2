import AboutMe from "./components/AboutMe";
import ClientReview from "./components/ClientReview";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Hero2 from "./components/HeroV2";
import HeroV2 from "./components/HeroV2";
import Project from "./components/Projects";

import PurpleGlowBackground from "./components/PurpleGlowBackground";
import Skills from "./components/Skills";
import Experience from "./components/WorkExperience";

export default function HomePage() {
  return (
    <main>
      <Hero />
      {/* <Hero2 /> */}
      <section className="relative bg-black text-white overflow-hidden md:pb-32 md:pt-10  pt-5">
        <PurpleGlowBackground />

        <div className="relative z-20">
          <AboutMe />
          <Skills />
          <Experience />
          <Project />
          <ClientReview />
        </div>
      </section>

      <Contact />
    </main>
  );
}
