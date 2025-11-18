"use client"
import React from "react";
import styles from "../home/home.module.css";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../app/components/Footer/Footer";
import { Carousel } from 'antd';

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
            <h1 className={styles.title}>O seu conhecimento começa aqui</h1>
            <p className={styles.description}>Vamos aprender? Entre agora</p>

            <div className={styles.carrouselContainer}>
                <Carousel arrows infinite={false}>
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
                    <h2 className={styles.cardTitle}>Para Estudantes</h2>
                    <p>Conteúdo pensado para quem começa agora.</p>
                </div>
            </div>

            <Footer />
        </div>
    );
}