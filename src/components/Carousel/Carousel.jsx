"use client"
import React, { useState } from "react";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from "./Carousel.module.css";

export default function Carousel({ cards }) {
    const [currentCard, setCurrentCard] = useState(1);

    const nextCard = () => {
        setCurrentCard((prev) => (prev + 1) % cards.length);
    };

    const prevCard = () => {
        setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
    };

    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <button className={styles.navButton} onClick={prevCard}>
                    <LeftOutlined className={styles.navIcon} />
                </button>
                
                <div className={styles.carousel}>
                    {cards.map((card, index) => {
                        let position = 'back';
                        if (index === currentCard) position = 'center';
                        else if (index === (currentCard - 1 + cards.length) % cards.length) position = 'left';
                        else if (index === (currentCard + 1) % cards.length) position = 'right';
                        
                        return (
                            <div 
                                key={card.id} 
                                className={`${styles.sectionCard} ${styles[position]}`}
                                onClick={() => setCurrentCard(index)}
                            >
                                <div className={styles.cardHeader}>
                                    <h2 className={styles.cardTitle}>{card.title}</h2>
                                </div>
                                <div className={styles.cardContent}>
                                    <p className={styles.cardDescription}>{card.description}</p>
                                </div>
                                <div className={styles[card.gradient]}></div>
                            </div>
                        );
                    })}
                </div>
                
                <button className={styles.navButton} onClick={nextCard}>
                    <RightOutlined className={styles.navIcon} />
                </button>
            </div>
            
            <div className={styles.indicators}>
                {cards.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.indicator} ${index === currentCard ? styles.active : ''}`}
                        onClick={() => setCurrentCard(index)}
                    />
                ))}
            </div>
        </div>
    );
};