"use client"
import React from "react";
import styles from "../app/page.module.css";
import Link from "next/link";
import Footer from "../components/FooterStudent/FooterStudent";
import { Button, Carousel } from 'antd';
import Image from "next/image";
import Header from "../components/HeaderStudent/HeaderStudent.jsx";

export default function Home() {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <div className={styles.buttons}>
                <Link href="/login" className={styles.button}>Login</Link>
                <Link href="/cadastro" className={styles.button1}>Cadastre-se</Link>
            </div>
                <div className={styles.sessao2}>
                    <h1 className={styles.title}>Bem-vindo ao EdPro!</h1>
                    <h2 className={styles.subtitle}>Plataforma de Cursos</h2>
                    <p className={styles.description}>Capacite sua equipe com treinamentos personalizados e eficientes.</p>
                </div>
            </div>

            <div className={styles.cards}>
                <div className={styles.card}>
                    <h2 className={styles.cardtitle}>Conheça Nossos Cursos</h2>
                    <Link href="/Studentcourses" className={styles.buttoncard}>Veja Aqui</Link>
                </div>
                <div className={styles.card}>
                    <h2 className={styles.cardtitle}>Conheça Nossa Equipe</h2>
                    <Link href="/about" className={styles.buttoncard}>Saiba Mais</Link>
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.sectioncontainer}>
                    <h1 className={styles.sectiontitle}>Nossa Dor</h1>
                    <div className={styles.sectioncard1}>
                        <p className={styles.sectiondescription}>Treinar colaboradores é essencial, mas para muitas empresas isso se torna caro, trabalhoso e limitado. Plataformas externas cobram alto, não oferecem a flexibilidade que a equipe precisa e dificultam a criação de conteúdos próprios. O resultado é sempre o mesmo: cursos espalhados, pouca personalização, dificuldade em acompanhar o progresso e perda de produtividade. Capacitar a equipe não deveria ser tão complicado - mas é a realidade de muitas empresas hoje.
                        </p>
                    </div>
                </div>

                <div className={styles.sectioncontainer}>
                    <h1 className={styles.sectiontitle}>Nossa Solução</h1>
                    <div className={styles.sectioncard1}>
                        <p className={styles.sectiondescription}>O EdPro nasce para simplificar tudo isso. Com um LMS completo e interno, sua empresa cria seus próprios cursos, organiza trilhas de aprendizado, acompanha o progresso de cada colaborador e gerencia tudo em um só lugar - de forma simples, personalizada e totalmente sua. Sem custos abusivos, sem limitações e com total autonomia para ensinar, treinar e evoluir sua equipe no seu ritmo.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
}