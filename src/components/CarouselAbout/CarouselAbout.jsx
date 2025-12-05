"use client"
import React from "react";
import styles from "./CarouselAbout.module.css";
import { AimOutlined, EyeOutlined, StarOutlined } from "@ant-design/icons";

export default function CarouselAbout({ cards }) {
    const icons = [
        <AimOutlined key="aim" className={styles.icon} />,
        <EyeOutlined key="eye" className={styles.icon} />,
        <StarOutlined key="star" className={styles.icon} />
    ];

    return (
        <div className={styles.container}>
            <div className={styles.cards}>
                {cards.map((card, index) => (
                    <React.Fragment key={index}>
                        <div className={styles.card}>
                            <div className={styles.cardIcon}>
                                {icons[index]}
                            </div>
                            <span className={styles.tag}>{card.title}</span>
                            <h2 className={styles.cardTitle}>{card.highlight}</h2>
                            <p className={styles.cardDescription}>{card.description}</p>
                        </div>
                        {index < cards.length - 1 && <div className={styles.divider}></div>}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
