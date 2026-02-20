import AboutMe from "./components/AboutMe";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Project from "./components/Projects";

import PurpleGlowBackground from "./components/PurpleGlowBackground";
import Skills from "./components/Skills";
import Experience from "./components/WorkExperience";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <section className="relative bg-black text-white overflow-hidden md:py-32  pt-5">
        <PurpleGlowBackground />

        {/* Smooth fade from previous */}
        <div className="md:absolute top-0 hidden md:block left-0 w-full h-40 bg-linear-to-t from-black to-transparent z-10" />

        <div className="relative z-20">
          <AboutMe />
          <Skills />
          <Experience />
          <Project />
        </div>
      </section>

      <Contact />
    </main>
  );
}
