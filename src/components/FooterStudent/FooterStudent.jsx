"use client";
import styles from "./Footer.module.css";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import {
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { IconContext } from "react-icons";

export default function FooterStudent() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email cadastrado:", email);
    setEmail("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.company}>
          <div className={styles.logoSection}>
            <Image
              src="/images/Logo.png"
              alt="EdPro Logo"
              width={120}
              height={150}
            />
            <div>
              <h1>EdPro</h1>
              <p>Plataforma de Curso</p>
            </div>
          </div>
          <p className={styles.description}>
            A EdPro é a Plataforma LMS moderna para capacitação interna, com
            trilhas de aprendizado personalizadas e acompanhamento em tempo
            real.
          </p>
        </div>
        <div className={styles.section}>
          <h1 className={styles.title}>Links Rápidos</h1>
          <ul className={styles.links}>
            <li className={styles.link}><Link href="/">Início</Link></li>
            <li className={styles.link}><Link href="/about">Sobre Nós</Link></li>
            <li className={styles.link}><Link href="/contato">Contato</Link></li>
          </ul>
        </div>
        <div className={styles.sectionContact}>
          <h1 className={styles.title}>Contato</h1>
          <div className={styles.contactInfo}>
            <p>
              <FaMapMarkerAlt
                style={{ marginRight: "8px", color: "#ffffff" }}
              />
              Rua da EdPro, 123 São Paulo - SP
            </p>
            <p>
              <FaPhone style={{ marginRight: "8px", color: "#ffffff" }} />
              (19) 1234-5678
            </p>
            <p>
              <FaEnvelope style={{ marginRight: "8px", color: "#ffffff" }} />
              plataformaedpro@gmail.com
            </p>
          </div>
        </div>
        <div className={styles.newsletter}>
          <h1 className={styles.title}>Fique por dentro</h1>
          <form onSubmit={handleSubmit} className={styles.emailForm}>
            <input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit"></button>
          </form>

          <div className={styles.social}>
            <h1 className={styles.title1}>Siga-nos</h1>
            <div className={styles.socialIcons}>
              <IconContext.Provider
                value={{ className: "edpro-social__icon" }}
              >
                <div className="icons">
                  <a
                    href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A83329387&keywords=escola%20senai%20valinhos%20%7C%20senai%20s%C3%A3o%20paulo&origin=RICH_QUERY_TYPEAHEAD_HISTORY&position=0&searchId=3f1a2b1c-95a9-4862-abf7-b4263b1989b3&sid=J-X&spellCorrectionEnabled=true"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://www.instagram.com/senaivalinhos/"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://github.com/souzabweatriz/EdPro-FrontEnd"
                    aria-label="GitHub"
                  >
                    <FaGithub />
                  </a>
                </div>
              </IconContext.Provider>
            </div>

          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>&copy; 2025 EdPro. Todos os direitos reservados.</p>
      </div>
    </div>
  );
}