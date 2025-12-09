"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthProvider';
import styles from './professor.module.css';

export default function ProfessorPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [selectedPage, setSelectedPage] = useState(null);

    useEffect(() => {
        if (user && user.role !== 'professor') {
            router.push('/profileStudent');
        }
    }, [user, router]);

    const handleNavigation = (page) => {
        setSelectedPage(page);
        router.push(page);
    };

    return (
        <div className={styles.container}>
            <div className={styles.menuCard}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Painel do Professor</h1>
                    <button 
                        className={styles.homeButton}
                        onClick={() => router.push('/Homeadmin')}
                        title="Ir para home"
                    >
                        🏠
                    </button>
                </div>
                <p className={styles.subtitle}>Bem-vindo(a), {user?.name || 'Professor'}!</p>
                
                <div className={styles.menuOptions}>
                    <button 
                        className={styles.menuButton}
                        onClick={() => handleNavigation('/matricula')}
                    >
                        <span className={styles.icon}>📋</span>
                        <span className={styles.buttonText}>Gerenciar Matrículas</span>
                        <span className={styles.arrow}>→</span>
                    </button>

                    <button 
                        className={styles.menuButton}
                        onClick={() => handleNavigation('/createCourses')}
                    >
                        <span className={styles.icon}>📚</span>
                        <span className={styles.buttonText}>Gerenciar Cursos</span>
                        <span className={styles.arrow}>→</span>
                    </button>
                </div>

                <button 
                    className={styles.logoutButton}
                    onClick={() => router.push('/login')}
                >
                    Sair
                </button>
            </div>
        </div>
    );
}
