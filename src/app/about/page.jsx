"use client"
import React from "react";
import styles from "../about/about.module.css";
import Footer from "../../app/components/Footer/Footer";
import { FiPlay, FiBookOpen, FiBarChart2 } from "react-icons/fi";

export default function About() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Desenvolva sua equipe</h1>
                <h2 className={styles.description}>dentro da sua própria empresa.</h2>
            </div>
            <div className={styles.section}>
                <h1 className={styles.sectiontitle}>Conheça a EdPro</h1>
                <div className={styles.cards}>
                    <div className={styles.card}>
                        <h1 className={styles.cardtitle}>Quem Somos</h1>
                        <p className={styles.carddescription}>Somos uma plataforma de aprendizagem corporativa criada para tornar o desenvolvimento de colaboradores mais simples, eficiente e acessível.</p>
                    </div>
                    <div className={styles.card}>
                        <h1 className={styles.cardtitle}>Nossa Essência</h1>
                        <p className={styles.carddescription}>Acreditamos que conhecimento transforma empresas. Por isso, unimos tecnologia e educação para entregar uma experiência de aprendizado contínua, organizada e focada em resultados.</p>
                    </div>
                    <div className={styles.card}>
                        <h1 className={styles.cardtitle}>Nosso Propósito</h1>
                        <p className={styles.carddescription}>Existimos para capacitar organizações a evoluírem de dentro para fora, oferecendo autonomia para criar, gerenciar e expandir treinamentos sem depender de soluções externas caras</p>
                    </div>
                </div>
            </div>
            <div className={styles.sessao}>
                <h1 className={styles.sessaotitle}>Por que escolher a EdPro?</h1>
                <div className={styles.card}>
                    <h1 className={styles.description1}>O que nós fazemos, afinal?</h1>
                    <p className={styles.cardtext}>Capacitamos pessoas.</p>
                    <p className={styles.subdescription1}>Na EdPro, acreditamos que o crescimento das empresas começa pelo desenvolvimento das pessoas. Por isso, criamos uma plataforma de aprendizagem corporativa que torna o treinamento contínuo, simples e estratégico. Unimos tecnologia, organização e experiência educacional para que cada colaborador aprenda no seu ritmo e cada empresa alcance resultados reais.</p>
                </div>
            </div>
            <div className={styles.sessao}>
                <h1 className={styles.sessaotitle}>Como Surgimos?</h1>
                <h2 className={styles.description2}>A EdPro nasceu de uma necessidade real dentro das empresas</h2>
            </div>
            <Footer />
        </div >
    );
}