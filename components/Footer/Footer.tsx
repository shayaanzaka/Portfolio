"use client";

import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shayaanzaka/",
    icon: <FontAwesomeIcon icon={faLinkedin} className={styles.faIcon} />,
  },
  {
    label: "GitHub",
    href: "https://github.com/shayaanzaka",
    icon: <FontAwesomeIcon icon={faGithub} className={styles.faIcon} />,
  },
  {
    label: "Email",
    href: "mailto:shayaanzaka.work@gmail.com",
    icon: <FontAwesomeIcon icon={faEnvelope} className={styles.faIcon} />,
  },
  {
    label: "Phone",
    href: "tel:+16462211199",
    icon: <FontAwesomeIcon icon={faPhone} className={styles.faIcon} />,
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.cta}>
            <p className="section-label">Get in Touch</p>
            <h2 className={styles.ctaHeading}>
              Let&apos;s build something{" "}
              <em className={styles.ctaEm}>remarkable.</em>
            </h2>
            <a
              href="mailto:shayaanzaka.work@gmail.com"
              className={styles.ctaBtn}
            >
              shayaanzaka.work@gmail.com
              <span className={styles.ctaBtnArrow}>→</span>
            </a>
          </div>

          <div className={styles.socials}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={s.label}
              >
                {s.icon}
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.name}>Shayaan Zaka</span>
          <span className={styles.copy}>
            © {new Date().getFullYear()} — New York
          </span>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resumeLink}
          >
            Resume ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
