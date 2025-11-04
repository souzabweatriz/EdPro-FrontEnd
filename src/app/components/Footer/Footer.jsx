"use client";
import React from "react";
import { useState } from "react";
import styles from "./Footer.module.css";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { IconContext } from "react-icons";
import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }
    alert(`Obrigado! O e-mail ${email} foi inscrito.`);
    setEmail("");
  };

  return (
    <main className={styles.container}>
      <div className={styles.conteudo}>
        <div className={styles.secao}>
          <div className={styles.logo}>
            <Image
              src="/images/Logo.png"
              alt="EdPro Logo"
              width={150}
              height={230}
            />
          </div>
          <h1>EdPro</h1>
          <h3>Plataforma de Curso</h3>
        </div>

        <p className={styles.descricao}>
          A EdPro é a Plataforma LMS moderna para capacitação interna, com
          trilhas de aprendizado personalizadas e acompanhamento em tempo real.
        </p>

        <div className={styles.contato}>
          <h1>Contato</h1>
          <ul>
            <li>
              <FiMapPin className="ic" />{" "}
              <span>Rua da EdPro, 123 São Paulo - SP</span>
            </li>
            <li>
              <FiPhone className="ic" />{" "}
              <a href="tel:+551912345678">(19) 1234-5678</a>
            </li>
            <li>
              <FiMail className="ic" />{" "}
              <a href="mailto:plataformaedpro@gmail.com">
                plataformaedpro@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.nav}>
        <div className={styles.link}>
          <h1>Links Rápidos</h1>
          <ul>
            <li>
              <a href="/Home">Início</a>
            </li>
            <li>
              <a href="/Cursos">Cursos</a>
            </li>
            <li>
              <a href="/SobreNos">Sobre Nós</a>
            </li>
            <li>
              <a href="/Contato">Contato</a>
            </li>
          </ul>
        </div>

        <div className={styles.inscricao}>
          <h1>Fique por dentro</h1>
          <form onSubmit={handleSubscribe} className={styles.form}>
            <input
              id="footer-email"
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button}>
              Inscrever-se
            </button>
          </form>

          <div className={styles.redessociais}>
            <h1>Siga-nos</h1>
            <IconContext.Provider value={{ className: "edpro-social__icon" }}>
              <div className="icons">
                <a href="#" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
                <a href="#" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" aria-label="GitHub">
                  <FaGithub />
                </a>
              </div>
            </IconContext.Provider>
          </div>
        </div>
      </div>
      <div className={styles.copy}>
        <p>@2025 - EdPro. Todos os direitos reservados.</p>
      </div>
    </main>
  );
}
