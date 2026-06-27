"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Intersection Observer for highlighting
    const sections = navLinks.map(link => document.querySelector(link.href));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id) {
          const id = entry.target.id;
          const links = document.querySelectorAll(`.${styles.link}`);
          links.forEach(l => l.classList.remove(styles.active));
          const index = navLinks.findIndex(l => l.href === `#${id}`);
          if (links[index]) links[index].classList.add(styles.active);
        }
      });
    }, { rootMargin: "-40% 0px -40% 0px" });

    sections.forEach(s => { if (s) observer.observe(s); });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
    >
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logo} aria-label="Home">
          <span className={styles.logoFirst}>S</span>
          <span className={styles.logoDot}>·</span>
          <span className={styles.logoLast}>Z</span>
        </a>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={styles.link}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.resumeBtn}
            >
              Resume
            </a>
          </li>
        </ul>

        <button
          type="button"
          className={`${styles.menuBtn} ${menuOpen ? styles.menuOpen : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen ? "true" : "false"}
        >
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
