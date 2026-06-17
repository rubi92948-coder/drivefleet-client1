'use client'; // This component requires client-side features

import Image from "next/image";
import { useRouter } from "next/navigation";

const Banner = () => {
  const router = useRouter(); // Initialize router for navigation

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 min-h-[90vh] flex flex-col-reverse md:flex-row items-center justify-between gap-12 pt-24 pb-16 md:py-0 relative">
      
      {/* Background decoration: creates a subtle grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Hero text content section */}
      <div className="flex-1 text-center md:text-left z-10">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full text-orange-400 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-sm mx-auto md:mx-0">
          ✨ Premium Car Rental Experience
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black italic leading-[1.1] tracking-tight text-white">
          Drive Your <br />
          <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-white text-transparent bg-clip-text">
            Dream Car
          </span>
        </h1>
        <p className="text-gray-400 text-base sm:text-lg md:text-xl mt-6 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed font-medium">
          Rent premium luxury cars at affordable prices with <span className="text-orange-500 font-semibold">DriveFleet</span>. 
        </p>
        
        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-12">
          <button 
            onClick={() => router.push("/explore-cars")} 
            className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl text-md font-bold transition duration-300 shadow-lg shadow-orange-500/20 text-white cursor-pointer"
          >
            Explore Cars
          </button>
          <button 
            onClick={() => router.push("/explore-cars")} 
            className="border border-neutral-800 hover:border-orange-500/50 hover:bg-white/5 px-8 py-4 rounded-xl text-md font-semibold transition duration-300 backdrop-blur-sm text-gray-300 hover:text-white cursor-pointer"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Hero image section with hover animation */}
      <div className="flex-1 flex justify-center items-center relative z-10 w-full">
        <div className="absolute w-[450px] h-[450px] bg-gradient-to-tr from-orange-600/20 to-amber-500/5 blur-[90px] rounded-full pointer-events-none" />
        <Image 
          src="/assets/car0.png" // Image path relative to the public folder
          alt="Luxury Car" 
          width={800} 
          height={500} 
          priority // Ensures faster loading for the hero image
          // Added hover effect: scale-105 enlarges the image by 5% on hover
          className="relative w-full max-w-3xl object-contain drop-shadow-[0_30px_60px_rgba(249,115,22,0.15)] transition-transform duration-500 ease-in-out hover:scale-105 cursor-pointer" 
        />
      </div>
    </section>
  );
};

export default Banner;