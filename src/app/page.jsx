"use client"
import React from "react";
import styles from "../app/page.module.css";
import Link from "next/link";
import Footer from "../components/FooterStudent/FooterStudent";
import Header from "../components/HeaderStudent/HeaderStudent.jsx";
import Carousel from "../components/Carousel/Carousel.jsx";

export default function Home() {
    const cardsData = [
        {
            id: 0,
            title: "Nossa Dor",
            description: "Treinar colaboradores é essencial, mas para muitas empresas isso se torna caro, trabalhoso e limitado. Plataformas externas cobram alto, não oferecem a flexibilidade que a equipe precisa e dificultam a criação de conteúdos próprios.",
            gradient: "cardGradient1"
        },
        {
            id: 1,
            title: "Nossa Solução", 
            description: "O EdPro nasce para simplificar tudo isso. Com um LMS completo e interno, sua empresa cria seus próprios cursos, organiza trilhas de aprendizado e acompanha o progresso de cada colaborador em um só lugar.",
            gradient: "cardGradient2"
        },
        {
            id: 2,
            title: "Nosso Diferencial",
            description: "O EdPro não é apenas mais um LMS - é a solução feita sob medida para empresas que querem mais controle, flexibilidade e eficiência no treinamento de suas equipes.",
            gradient: "cardGradient3"
        }
    ];
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <div className={styles.buttons}>
                <Link href="/login" className={styles.button}>Login</Link>
                <Link href="/signup" className={styles.button1}>Cadastre-se</Link>
            </div>
                <div className={styles.sessao2}>
                    <h1 className={styles.title}>Bem-vindo ao EdPro!</h1>
                    <h2 className={styles.subtitle}>Plataforma de Cursos</h2>
                    <p className={styles.description}>Capacite sua equipe com treinamentos personalizados e eficientes.</p>
                </div>
            </div>

            <div className={styles.cards}>
                <div className={styles.card}>
                    <h1 className={styles.cardtitle}>Conheça Nossos Cursos</h1>
                    <Link href="/Studentcourses" className={styles.buttoncard}>Veja Aqui</Link>
                </div>
                <div className={styles.card}>
                    <h1 className={styles.cardtitle}>Conheça Nossa Equipe</h1>
                    <Link href="/contato" className={styles.buttoncard}>Saiba Mais</Link>
                </div>
            </div>
            <Carousel cards={cardsData} />
            <Footer />
        </div >
    );
}