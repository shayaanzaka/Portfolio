"use client";

import { useEffect, useRef } from "react";
import styles from "./Experience.module.css";

const experiences = [
  {
    index: "01",
    role: "Product Analyst Intern",
    company: "Entrepreneurs of Tomorrow",
    period: "Aug 2025 – Present",
    location: "New York, USA",
    highlights: [
      "Owned customer segmentation advising leadership on retention strategy for cohorts responsible for 63% of total revenue.",
      "Applied RFM segmentation, K-Means clustering, and logistic regression to prioritize high-value users.",
    ],
    tags: ["RFM Analysis", "K-Means", "Logistic Regression", "Python"],
  },
  {
    index: "02",
    role: "Analyst",
    company: "Dentsu Global Services",
    period: "Jul 2022 – Feb 2024",
    location: "Bengaluru, India",
    highlights: [
      "Built a production-grade ELT platform using Airflow, BigQuery, dbt, and GCS delivering analytics-ready star schema models.",
      "Reduced manual reporting effort by 60% through embedded testing and certified fact and dimension tables.",
      "Implemented CI/CD and infrastructure-as-code using Cloud Build and Terraform for automated deployments.",
    ],
    tags: ["dbt", "Airflow", "BigQuery", "Terraform", "GCP"],
  },
  {
    index: "03",
    role: "Programmer Analyst Intern",
    company: "Cognizant",
    period: "Dec 2021 – May 2022",
    location: "Bengaluru, India",
    highlights: [
      "Analyzed e-commerce funnels to identify an 85% cart-to-purchase drop-off highlighting critical friction points.",
      "Used SQL (CTEs, window functions) and Python to model stage-wise conversion and quantify leakage.",
    ],
    tags: ["SQL", "Python", "Funnel Analysis", "CTEs"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const dotsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const initGSAP = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        // Animate timeline line filling
        if (lineRef.current) {
          gsap.fromTo(
            lineRef.current,
            { scaleY: 0, transformOrigin: "top center" },
            {
              scaleY: 1,
              duration: 1.5,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                end: "bottom 60%",
                scrub: 0.5,
              },
            }
          );
        }

        // Animate cards
        cardsRef.current.filter(Boolean).forEach((card, i) => {
          const dot = dotsRef.current[i];

          gsap.fromTo(
            card,
            { opacity: 0, x: 40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                toggleActions: "play none none none",
              },
            }
          );

          if (dot) {
            gsap.fromTo(
              dot,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: "back.out(2)",
                scrollTrigger: {
                  trigger: card,
                  start: "top 82%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        });

        // Header
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
        // If GSAP fails, content remains visible via CSS defaults
      }
    };

    initGSAP();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">Experience</p>
          <h2 className={`section-heading ${styles.heading}`}>
            Professional Timeline
          </h2>
        </div>

        <div className={styles.timeline}>
          {/* Vertical line */}
          <div className={styles.lineTrack}>
            <div ref={lineRef} className={styles.lineFill} />
          </div>

          <div className={styles.cards}>
            {experiences.map((exp, i) => (
              <div key={exp.index} className={styles.item}>
                {/* Dot */}
                <div
                  className={styles.dot}
                  ref={(el) => {
                    if (el) dotsRef.current[i] = el;
                  }}
                >
                  <span className={styles.dotInner} aria-hidden="true" />
                </div>

                {/* Card */}
                <div
                  className={styles.card}
                  ref={(el) => {
                    if (el) cardsRef.current[i] = el;
                  }}
                >
                  <div className={styles.cardHeader}>
                    <div>
                      <h3 className={styles.role}>{exp.role}</h3>
                      <p className={styles.company}>{exp.company}</p>
                    </div>
                    <div className={styles.meta}>
                      <span className={styles.period}>{exp.period}</span>
                      <span className={styles.location}>{exp.location}</span>
                    </div>
                  </div>

                  <ul className={styles.highlights}>
                    {exp.highlights.map((h, j) => (
                      <li key={j} className={styles.highlight}>
                        <span className={styles.bullet} />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className={styles.tags}>
                    {exp.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
