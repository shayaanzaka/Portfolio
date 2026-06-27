"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import styles from "./Hero.module.css";

const HERO_NAME = ["Shayaan", "Zaka"];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const [ready, setReady] = useState(false);

  // Immediately show content after mount (no visibility:hidden dependency on GSAP)
  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const initGSAP = async () => {
      try {
        const { gsap } = await import("gsap");

        const heading = headingRef.current;
        if (!heading) return;

        const words = heading.querySelectorAll(`.${styles.wordInner}`);
        if (!words.length) return;

        // Set initial hidden state via GSAP right before animating
        gsap.set(words, { yPercent: 110, opacity: 0 });
        gsap.set(subRef.current, { opacity: 0, y: 20 });
        gsap.set(bioRef.current, { opacity: 0, y: 16 });
        gsap.set(actionsRef.current, { opacity: 0, y: 16 });
        gsap.set(scrollIndicatorRef.current, { opacity: 0 });

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.to(words, {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
        })
          .to(
            subRef.current,
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.5"
          )
          .to(
            bioRef.current,
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.6"
          )
          .to(
            actionsRef.current,
            { opacity: 1, y: 0, duration: 0.7 },
            "-=0.5"
          )
          .to(
            scrollIndicatorRef.current,
            { opacity: 1, duration: 0.5 },
            "-=0.2"
          );

        // Animated number counter
        if (numberRef.current) {
          gsap.to(numberRef.current, {
            innerHTML: "04",
            duration: 2,
            delay: 1.2,
            snap: { innerHTML: 1 },
            ease: "power2.out",
          });
        }
      } catch {
        // GSAP failed — content is already visible via CSS, no action needed
      }
    };

    initGSAP();
  }, [ready]);

  return (
    <section
      className={styles.hero}
      ref={containerRef}
    >
      {/* Decorative elements */}
      <div className={styles.decorCircle} />

      <div className="container">
        <div className={styles.content}>
          <div className={styles.tagline}>
            <span className={styles.taglineDot} />
            <span className={styles.taglineText}>Architecting Data at Scale</span>
          </div>

          <h1 ref={headingRef} className={styles.heading}>
            {HERO_NAME.map((word, i) => (
              <span key={i} className={styles.word}>
                <span className={styles.wordInner}>{word}</span>
              </span>
            ))}
          </h1>

          <p ref={subRef} className={styles.subtitle}>
            Software Engineer{" "}
            <span className={styles.subtitleSep}>·</span>{" "}
            Backend &amp; Data Systems
          </p>

          <p ref={bioRef} className={styles.bio}>
            Software engineer with experience building scalable data platforms
            and backend systems — from production ELT pipelines to ML-driven
            segmentation and customer analytics.
          </p>

          <div ref={actionsRef} className={styles.actions}>
            <a href="#experience" className={styles.btnPrimary}>
              View Work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
            >
              Download Resume
            </a>
            
            <div className={styles.heroSocials}>
              <a href="https://github.com/shayaanzaka" target="_blank" rel="noopener noreferrer" className={styles.heroSocialIcon} aria-label="GitHub">
                <FontAwesomeIcon icon={faGithub} className={styles.faIcon} />
              </a>
              <a href="https://www.linkedin.com/in/shayaanzaka/" target="_blank" rel="noopener noreferrer" className={styles.heroSocialIcon} aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} className={styles.faIcon} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Side info */}
      <div className={styles.sideInfo}>
        <div className={styles.sideItem}>
          <span className={styles.sideLabel}>Location</span>
          <span className={styles.sideValue}>New York, NY</span>
        </div>
        <div className={styles.sideItem}>
          <span className={styles.sideLabel}>Experience</span>
          <span className={styles.sideValue}>
            <span ref={numberRef}>00</span>+ yrs
          </span>
        </div>
        <div className={styles.sideItem}>
          <span className={styles.sideLabel}>Focus</span>
          <span className={styles.sideValue}>Data &amp; Backend</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <span className={styles.scrollText}>scroll</span>
      </div>
    </section>
  );
}
