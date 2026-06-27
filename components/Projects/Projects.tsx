"use client";

import { useEffect, useRef, MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import styles from "./Projects.module.css";

const projects = [
  {
    index: "01",
    title: "Time-Series Forecasting",
    subtitle: "Environmental Data Prediction",
    description:
      "Built statistical (ARIMA) and neural network (LSTM) forecasting models to evaluate short-term trend predictability in environmental time-series data. Improved forecast accuracy by 22% RMSE.",
    tags: ["Python", "ARIMA", "LSTM", "Keras", "Statsmodels", "NumPy"],
    stat: "22% RMSE improvement",
    github: "https://github.com/shayaanzaka",
  },
  {
    index: "02",
    title: "Customer Segmentation",
    subtitle: "Revenue Analytics Engine",
    description:
      "RFM segmentation, K-Means clustering, and logistic regression to identify high-value cohorts responsible for 63% of total revenue, advising personalization and retention strategy.",
    tags: ["Python", "Scikit-learn", "K-Means", "Pandas", "Seaborn"],
    stat: "63% revenue identified",
    github: "https://github.com/shayaanzaka",
  },
  {
    index: "03",
    title: "ELT Data Platform",
    subtitle: "Production Analytics Infrastructure",
    description:
      "Production-grade ELT platform using Airflow, BigQuery, dbt and GCS delivering analytics-ready star schema models. Reduced manual reporting effort by 60% with CI/CD via Terraform.",
    tags: ["dbt", "Airflow", "BigQuery", "GCS", "Terraform", "Cloud Run"],
    stat: "60% reporting reduction",
    github: "https://github.com/shayaanzaka",
  },
];

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(4px)`;
  };

  const handleMouseLeave = () => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0)";
  };

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardTop}>
          <span className={styles.projIndex} aria-hidden="true">{project.index}</span>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
            aria-label="View on GitHub"
          >
            <FontAwesomeIcon icon={faGithub} className={styles.faIcon} />
            <span>GitHub</span>
          </a>
        </div>

        <div className={styles.cardBody}>
          <p className={styles.projSubtitle}>{project.subtitle}</p>
          <h3 className={styles.projTitle}>{project.title}</h3>
          <p className={styles.projDesc}>{project.description}</p>
        </div>

        <div className={styles.cardBottom}>
          <span className={styles.stat}>{project.stat}</span>
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.cardGlow} />
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        const cards = gridRef.current?.children;
        if (!cards) return;

        gsap.fromTo(
          Array.from(cards),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
            },
          }
        );

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
    <section id="projects" ref={sectionRef} className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">Projects</p>
          <h2 className={`section-heading ${styles.heading}`}>
            Selected Work
          </h2>
        </div>

        <div ref={gridRef} className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
