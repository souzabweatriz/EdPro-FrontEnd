"use client"
import React from "react";
import styles from "../about/about.module.css";
import Footer from "../../components/Footer/Footer";
import { FiPlay, FiBookOpen, FiBarChart2 } from "react-icons/fi";
import Image from "next/image";

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
            <div className={styles.sectionEquipe}>
                <h1 className={styles.sectionTitle}>Nossa Equipe</h1>
                <div className={styles.sessaoequipe}>
                    <div className={styles.equipe}>
                        <div className={styles.member}>
                            <Image src="/images/team1.jpg" alt="P.O." width={86} height={86} className={styles.avatar} />
                            <h4 className={styles.role}>Product Owner</h4>
                            <p className={styles.name}>Ana Beatriz de Souza Oliveira</p>
                        </div>
                        <div className={styles.member}>
                            <Image src="/images/team2.jpg" alt="S.M" width={86} height={86} className={styles.avatar} />
                            <h4 className={styles.role}>Scrum Master</h4>
                            <p className={styles.name}>Anna Beatriz Leme Alves</p>
                        </div>
                        <div className={styles.member}>
                            <Image src="/images/valentim.png" alt="Desenvolvedora" width={86} height={86} className={styles.avatar} />
                            <h4 className={styles.role}>Desenvolvedora</h4>
                            <p className={styles.name}>Anna Beatriz Ribeiro Valentim</p>
                        </div>
                    </div>
                    <div className={styles.equipe}>
                        <div className={styles.member}>
                            <Image src="/images/team4.jpg" alt="Desenvolvedora" width={86} height={86} className={styles.avatar} />
                            <h4 className={styles.role}>Desenvolvedora</h4>
                            <p className={styles.name}>Beatriz Lima</p>
                        </div>
                        <div className={styles.member}>
                            <Image src="/images/isabella.png" alt="Desenvolvedora" width={86} height={86} className={styles.avatar} />
                            <h4 className={styles.role}>Desenvolvedora</h4>
                            <p className={styles.name}>Isabella Borin de Moraes Rosa</p>
                        </div>
                        <div className={styles.member}>
                            <Image src="/images/luana.png" alt="Desenvolvedora" width={86} height={86} className={styles.avatar} />
                            <h4 className={styles.role}>Desenvolvedora</h4>
                            <p className={styles.name}>Luana Domeneghetti</p>
                        </div>
                        <div className={styles.member}>
                            <Image src="/images/team7.jpg" alt="Desenvolvedora" width={86} height={86} className={styles.avatar} />
                            <h4 className={styles.role}>Desenvolvedora</h4>
                            <p className={styles.name}>Maria Eduarda da Silva Parma</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
}