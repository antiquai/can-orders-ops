import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="p-0 m-0 relative h-screen w-full flex items-center justify-center overflow-hidden">
            <Image
            src="/back.jpg" 
            alt="Hero Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center" 
            />
        
        <div className="absolute inset-0 bg-black/60" /> 

        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen w-full">
    
    
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[10px] shadow-2xl min-h-[30vh] w-full max-w-[30vw] flex flex-col text-center items-center justify-center">
                
                <h1 className="text-md md:text-7xl font-black text-white tracking-tighter leading-none uppercase ">
                    ORDER "CAN" OPS
                </h1>
                
                <p className="text-lg md:text-xl mt-6 text-white/70 font-light tracking-wide">
                    Fast and furious service for order processing
                </p>
                
            </div>
            <Link href="#catalogue-section"  className="hover:text-white text-white/60 transition-all text-[20px] font-black uppercase tracking-[0.25em]">
                Go on for Example 
            </Link>

        {/* Copyright */}
            <div className="absolute bottom-10 w-full text-center">
                <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-medium">
                    ganzhubaz_production™
                </p>
                <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-medium">
                    All artwork tooked from Pinterest
                </p>
            </div>
        </div>
    </section>
  );
}