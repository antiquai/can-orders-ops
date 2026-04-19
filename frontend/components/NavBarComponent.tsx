"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NavBarComponent() {

const [isDark, setIsDark] = useState(false);

// Color change logic
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsDark(!entry.isIntersecting);
    },
    { 
      threshold: 0,
      rootMargin: "-80px 0px 0px 0px" 
    }
  );

  // Target Hero Section
  const heroSection = document.getElementById("hero-section"); 
  if (heroSection) observer.observe(heroSection);

  return () => observer.disconnect();
}, []);

  return (
    <nav className="fixed top-0 z-50 w-full bg-transparent backdrop-blur-md flex justify-center">
      <div className="max-w-5xl w-full mx-auto px-10 h-20 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <div className={`w-12 h-12 flex items-center justify-center transition-all duration-500 ${isDark ? "invert" : "invert-0"}`}>
              <Image src="/can.png" alt="logo" width={48} height={48} />
            </div>
            <span className={`font-black text-md tracking-tighter uppercase transition-colors duration-500 ${
              isDark ? "text-black" : "text-white"
            }`}>
              CAN OPS
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-md font-black uppercase tracking-widest text-zinc-400">
          <Link href="#catalogue-section" className="hover:text-white transition-colors">
            Catalogue
          </Link>
          <a href="#" className="hover:text-white transition-colors">
            Info
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Scoials
          </a>
        </div>

      </div>
    </nav>
  );
}

