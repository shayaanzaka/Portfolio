"use client";

import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Education from "@/components/Education/Education";
import Experience from "@/components/Experience/Experience";
import Projects from "@/components/Projects/Projects";
import Footer from "@/components/Footer/Footer";
import Skills from "@/components/Skills/Skills";
import { useCustomCursor } from "@/hooks/useCustomCursor";

export default function Home() {
  const { cursorRef, ringRef } = useCustomCursor();

  return (
    <>
      <div className="grid-overlay" />
      <div className="noise-overlay" />
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />
      <Navbar />
      <main>
        <Hero />
        <Education />
        <Experience />
        <Skills />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
