"use client";

import { useEffect, useRef } from "react";
import styles from "./Education.module.css";

const schools = [
  {
    degree: "Master of Science",
    field: "Management of Technology",
    school: "New York University",
    short: "NYU",
    period: "Sep 2024 – May 2026",
    location: "New York, USA",
    index: "01",
  },
  {
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    school: "Birla Institute of Technology",
    short: "BIT",
    period: "Jul 2018 – May 2022",
    location: "Ranchi, India",
    index: "02",
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const initGSAP = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        const items = itemsRef.current.filter(Boolean);
        items.forEach((item, i) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              delay: i * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        const headerEl = sectionRef.current?.querySelector(`.${styles.header}`);
        if (headerEl) {
          gsap.fromTo(
            headerEl,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
              },
            }
          );
        }
      } catch {
        // If GSAP fails, ensure content is visible
      }
    };

    initGSAP();
  }, []);

  return (
    <section id="education" ref={sectionRef} className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">Education</p>
          <h2 className={`section-heading ${styles.heading}`}>Academic Foundation</h2>
        </div>

        <div className={styles.grid}>
          {schools.map((school, i) => (
            <div
              key={school.short}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className={styles.card}
            >
              <div className={styles.cardTop}>
                <span className={styles.index} aria-hidden="true">{school.index}</span>
                <span className={styles.shortName}>{school.short}</span>
              </div>

              <div className={styles.cardBody}>
                <p className={styles.degree}>{school.degree}</p>
                <h3 className={styles.field}>{school.field}</h3>
                <p className={styles.school}>{school.school}</p>
              </div>

              <div className={styles.cardMeta}>
                <span className={styles.period}>{school.period}</span>
                <span className={styles.location}>{school.location}</span>
              </div>

              <div className={styles.cardAccent} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
