"use client";
import styles from "./FooterAdmin.module.css";
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

export default function FooterAdmin() {
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
            <li className={styles.link}><Link href="/Homeadmin">Início</Link></li>
            <li className={styles.link}><Link href="/createCourses">Criar Cursos</Link></li>
            <li className={styles.link}><Link href="/matricula">Criar Matrículas</Link></li>
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
      </div>
      <div className={styles.copyright}>
        <p>&copy; 2025 EdPro. Todos os direitos reservados.</p>
      </div>
    </div>
  );
}