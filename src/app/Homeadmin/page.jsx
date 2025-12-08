"use client";

import Link from "next/link";
import styles from "../page.module.css";
import HeaderAdmin from "@/components/HeaderAdmin/HeaderAdmin";
import FooterAdmin from "@/components/FooterAdmin/FooterAdmin";

export default function HomeAdmin() {
  return (
    <div className={styles.container}>
      <HeaderAdmin />

      <div className={styles.content}>
        <div className={styles.sessao2}>
          <h1 className={styles.title}>Bem-vindo ao EdPro!</h1>
          <h2 className={styles.subtitle}>Plataforma de Cursos</h2>
          <p className={styles.description}>
           Seu painel para organizar, ajustar e evoluir o seu site.
          </p>

            <div className={styles.cards}>
        <div className={styles.card}>
          <h1 className={styles.cardtitle}>Crie aqui um novo curso</h1>
          <Link href="/Studentcourses" className={styles.buttoncard}>Clica Aqui</Link>
        </div>
        <div className={styles.card}>
          <h1 className={styles.cardtitle}>Gerenciar matrículas</h1>
          <Link href="/matricula" className={styles.buttoncard}>Clica Aqui</Link>
        </div>
      </div>

        </div>
      </div>
      <FooterAdmin />
    </div>
  );
}