import AboutMe from "./components/AboutMe";
import Hero from "./components/Hero";

import PurpleGlowBackground from "./components/PurpleGlowBackground";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <section className="relative bg-black text-white overflow-hidden md:py-32 pb-14 pt-5">
        <PurpleGlowBackground />

        {/* Smooth fade from previous */}
        <div className="md:absolute top-0 hidden md:block left-0 w-full h-40 bg-linear-to-t from-black to-transparent z-10" />

        <div className="relative z-20">
          <AboutMe />
          {/* <Skills /> */}
          {/* <Projects /> */}
          {/* <Experience /> */}
        </div>
      </section>

      {/* <Contact /> */}
    </main>
  );
}
