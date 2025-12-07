"use client"
import React from "react";
import styles from "../about/about.module.css";
import FooterStudent from "../../components/FooterStudent/FooterStudent";
import { FiPlay, FiBookOpen, FiBarChart2 } from "react-icons/fi";
import Image from "next/image";
import HeaderStudent from "../../components/HeaderStudent/HeaderStudent";
import Link from "next/link";
import StatisticsSection from "../../components/StatisticsSection/StatisticsSection.jsx";
import CarouselAbout from "../../components/CarouselAbout/CarouselAbout";

const whyEdproCards = [
    {
        title: "Missão",
        highlight: "Capacitar pessoas.",
        description: "Acreditamos que o crescimento das empresas começa pelo desenvolvimento das pessoas. Nossa missão é democratizar o acesso ao conhecimento corporativo, tornando o aprendizado acessível, engajante e transformador para todos os colaboradores."
    },
    {
        title: "Visão",
        highlight: "Liderar o mercado.",
        description: "Queremos ser a plataforma referência em treinamento corporativo no Brasil. Buscamos transformar a forma como as empresas desenvolvem seus talentos, criando uma cultura de aprendizado contínuo que impulsiona resultados."
    },
    {
        title: "Valores",
        highlight: "Inovação com propósito.",
        description: "Valorizamos a simplicidade, a autonomia e a excelência. Cada funcionalidade é pensada para facilitar a vida de quem ensina e de quem aprende, sempre com foco em resultados mensuráveis e impacto real nas organizações."
    }
];

export default function About() {
    return (
        <div className={styles.container}>
            <HeaderStudent />
            <div className={styles.content}>
                <div className={styles.buttons}>
                <Link href="/login" className={styles.button}>Login</Link>
                <Link href="/cadastro" className={styles.button1}>Cadastre-se</Link>
            </div>
                <div className={styles.sessao2}>
                    <h1 className={styles.title}>Desenvolva sua equipe</h1>
                    <h2 className={styles.subtitle}>dentro da sua própria empresa.</h2>
                    <p className={styles.description}>Plataforma de treinamento corporativo para desenvolver competências e aumentar a produtividade.</p>
                </div>
            </div>
            <div className={styles.section}>
                <h1 className={styles.sectiontitle}>Conheça a EdPro</h1>
            </div>
            <div className={styles.sessao}>
                <CarouselAbout cards={whyEdproCards} />
            </div>
            <div className={styles.sessao}>
                <h1 className={styles.sessaotitle}>Como Surgimos?</h1>
                <h2 className={styles.description2}>A EdPro nasceu de uma necessidade real dentro das empresas</h2>
            </div>
            <div className={styles.icons}>
                <div className={styles.icon}>
                    <FiPlay size={44} color="#3B82F6" aria-hidden="true" />
                    <h3 className={styles.iconTitle}>Comece já</h3>
                    <p className={styles.iconText}>Conteúdo prático para iniciar treinamentos rapidamente.</p>
                </div>
                <div className={styles.icon}>
                    <FiBookOpen size={44} color="#10B981" aria-hidden="true" />
                    <h3 className={styles.iconTitle}>Capacitação</h3>
                    <p className={styles.iconText}>Trilhas pensadas para o desenvolvimento de competências reais.</p>
                </div>
                <div className={styles.icon}>
                    <FiBarChart2 size={44} color="#F59E0B" aria-hidden="true" />
                    <h3 className={styles.iconTitle}>Resultados</h3>
                    <p className={styles.iconText}>Medição e evolução do desempenho com dados acionáveis.</p>
                </div>
            </div>
            <StatisticsSection />
            <FooterStudent />
        </div >
    );
}