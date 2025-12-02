"use client"
import { useState, useEffect } from 'react';
import styles from '../BackTop/BackTop.module.css';

const BackTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            className={`${styles.backTop} ${isVisible ? styles.visible : ''}`}
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
        >
            ↑
        </button>
    );
};

export default BackTop;