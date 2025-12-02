"use client"
import React from "react";
import styles from "../home/home.module.css";
import Link from "next/link";
import Footer from "../components/Footer/Footer";
import { Carousel } from 'antd';
import Image from "next/image";

const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.sessao}>
                <h1 className={styles.title}>O seu conhecimento começa aqui</h1>
                <div className={styles.descriptions}>
                    <p className={styles.description}>Vamos aprender?</p>
                    <Link href="/login" className={styles.subdescription}>Entre agora!</Link>
                </div>
                <div className={styles.buttons}>
                    <Link href="/login" className={styles.button1}>Login</Link>
                    <Link href="/cadastro" className={styles.button1}>Cadastre-se</Link>
                </div>
            </div>

            <div className={styles.carrouselContainer}>
                <Carousel autoplay autoplaySpeed={5000}>
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
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
                    <div className={styles.sectioncard2}>
                        <p className={styles.sectiondescription}>O EdPro nasce para simplificar tudo isso. Com um LMS completo e interno, sua empresa cria seus próprios cursos, organiza trilhas de aprendizado, acompanha o progresso de cada colaborador e gerencia tudo em um só lugar - de forma simples, personalizada e totalmente sua. Sem custos abusivos, sem limitações e com total autonomia para ensinar, treinar e evoluir sua equipe no seu ritmo.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
}