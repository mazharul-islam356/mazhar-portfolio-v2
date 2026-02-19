"use client";
import Image from "next/image";
import ParticleCard, { MagicBento } from "./MagicBento";
import { BrainCircuit, Code, Info } from "lucide-react";

export default function AboutMe() {
  return (
    <div className="min-h-[80vh] bg-black text-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Animated background orbs */}
        <div className="absolute top-0 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-20 w-96 h-96 bg-purple-500/15 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
        {/* Glowing Cards Grid */}
        <MagicBento
          enableSpotlight={true}
          enableBorderGlow={true}
          particleCount={12}
          glowColor="132, 0, 255"
          enableTilt={false}
          clickEffect={true}
          enableMagnetism={false}
        >
          {/* Profile Card - Large */}
          <ParticleCard
            className="card col-span-2 md:col-span-1 row-span-2"
            glowColor="132, 0, 255"
          >
            <div className="card-content flex flex-col items-center justify-center h-full z-1000">
              <div className="w-48 h-48 rounded-lg overflow-hidden mb-6 border-2 border-purple-500/50">
                <Image
                  priority
                  width={192}
                  height={192}
                  src="/myImage3.jpg"
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
              <h2 className="text-2xl font-semibold md:text-3xl mb-1 font-poppins">
                Mazharul Islam
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                mazharulislam3569@gmail.com
              </p>
              <button className="px-10 py-2 bg-purple-700 hover:bg-purple-800 text-sm rounded-full transition">
                Download CV
              </button>
            </div>
          </ParticleCard>

          {/* About Me Card */}
          <ParticleCard
            className="card col-span-2 md:col-span-1"
            glowColor="132, 0, 255 font-poppins"
          >
            <div className="card-content">
              <h3 className="text-xl font-semibold mb-2 font-poppins flex items-center gap-1 md:gap-2">
                <Info size={20} />
                About Me
              </h3>
              <p className="text-purple-400 font-medium mb-3 text-sm animate-pulse font-poppins">
                ● Open to work
              </p>
              <p className="text-gray-300 leading-relaxed text-sm font-poppins">
                Visual Designer with 7+ years of experience. I&apos;m all about
                crafting user-friendly interfaces that are functional and
                visually compelling.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm mt-3 font-poppins">
                Born and raised in the beautiful Costa Rica. When I&apos;m not
                busy designing, you&apos;ll likely find me playing board games,
                exploring Animal Crossing, or cooking mouthwatering Arepas.
              </p>
            </div>
          </ParticleCard>

          {/* Latest Roles Card */}
          <ParticleCard
            className="card col-span-2 md:col-span-1"
            glowColor="132, 0, 255"
          >
            <div className="card-content font-poppins">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-1.5">
                <BrainCircuit />
                Recently Learned
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-white rounded-md shrink-0">
                    <Image
                      src="https://www.outletexpense.xyz/uploads/3-Emdad/1771531231_69976bdf9ac6c.png"
                      width={500}
                      height={500}
                      priority
                      alt="recent_learning"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-base">Prisma</p>
                    <p className="text-gray-400 text-sm">
                      ORM for Node.js / Type-safe DB Access
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-white rounded-md shrink-0">
                    <Image
                      src="https://www.outletexpense.xyz/uploads/3-Emdad/1771540056_69978e5829ec5.png"
                      width={500}
                      height={500}
                      priority
                      alt="recent_learning"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-base">PostgreSQL</p>
                    <p className="text-gray-400 text-sm">
                      Relational Database / Indexing / Query Optimization
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ParticleCard>
        </MagicBento>
      </div>
    </div>
  );
}
