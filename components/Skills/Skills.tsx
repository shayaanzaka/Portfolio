"use client";

import { useEffect, useRef } from "react";
import styles from "./Skills.module.css";

const skillCategories = [
  {
    title: "Languages",
    main: ["Python", "SQL"],
    other: [],
  },
  {
    title: "Data Eng & Backend",
    main: ["Apache Airflow", "dbt"],
    other: ["ELT Pipelines", "Data Modeling", "Star Schema"],
  },
  {
    title: "Cloud & Infra",
    main: ["Google Cloud", "Terraform"],
    other: ["AWS", "CI/CD", "BigQuery", "Cloud Run"],
  },
  {
    title: "Data & ML",
    main: ["Scikit-learn", "Keras"],
    other: ["Pandas", "NumPy", "Statsmodels"],
  },
  {
    title: "Data Warehousing",
    main: ["BigQuery", "Snowflake"],
    other: ["Redshift", "Spark SQL", "Hive", "Presto", "Trino"],
  },
  {
    title: "Visualization",
    main: ["Tableau", "Looker"],
    other: ["Power BI", "Excel"],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        // Header fade
        const headerEl = sectionRef.current?.querySelector(`.${styles.header}`);
        if (headerEl) {
          gsap.fromTo(
            headerEl,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
              },
            }
          );
        }

        // Cards staggered fade
        const cards = gridRef.current?.children;
        if (!cards) return;

        gsap.fromTo(
          Array.from(cards),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
            },
          }
        );
      } catch {
        // Graceful fallback
      }
    };

    initGSAP();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">Tech Stack</p>
          <h2 className={`section-heading ${styles.heading}`}>
            Systems &amp; Expertise
          </h2>
        </div>

        <div ref={gridRef} className={styles.grid}>
          {skillCategories.map((category) => (
            <div key={category.title} className={styles.card}>
              <h3 className={styles.category}>{category.title}</h3>
              
              <div className={styles.skillsGroup}>
                {category.main.map((skill) => (
                  <span key={skill} className={styles.tagMain}>
                    {skill}
                  </span>
                ))}
              </div>

              {category.other.length > 0 && (
                <div className={`${styles.skillsGroup} ${styles.other}`}>
                  {category.other.map((skill) => (
                    <span key={skill} className={styles.tagOther}>
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
