"use client";
import styles from './profileStudent.module.css';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthProvider';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ProfileStudentPage() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [studentInfo, setStudentInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profilePhoto, setProfilePhoto] = useState(() => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('profilePhoto');
    });

    useEffect(() => {
        if (user && user.role === 'professor') {
            router.push('/professor');
        }
    }, [user, router]);

    const handlePhotoChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            if (typeof result === 'string') {
                setProfilePhoto(result);
                localStorage.setItem('profilePhoto', result);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className={styles.container}>
            <div className={styles.profileCard}>
                <div className={styles.profileHeader}>
                    <label className={styles.avatarWrapper}>
                        <Image
                            src={profilePhoto || '/student-avatar.png'}
                            alt="Avatar do Estudante"
                            width={100}
                            height={100}
                            className={styles.avatar}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            className={styles.fileInput}
                            onChange={handlePhotoChange}
                        />
                        <span className={styles.changePhoto}>Escolher foto</span>
                    </label>
                    <div className={styles.profileInfo}>
                        <h2 className={styles.studentName}>{user?.name || 'Estudante'}</h2>
                        <p className={styles.profileRole}>Aluno(a)</p>
                    </div>
                </div>
                <div className={styles.profileDetails}>
                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Email:</span>
                        <span className={styles.detailValue}>{user?.email || 'N/A'}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Cursos:</span>
                        <span className={styles.detailValue}>{studentInfo?.completedCourses || 0}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Progresso:</span>
                        <span className={styles.detailValue}>{studentInfo?.overallProgress || '0%'}</span>
                    </div>
                </div>
                <div className={styles.actions}>
                    <button
                        className={styles.coursesButton}
                        onClick={() => router.push('/Studentcourses')}
                    >
                        📚 Meus Cursos
                    </button>
                    <button
                        className={styles.logoutButton}
                        onClick={async () => {
                            await logout();
                            router.push('/login');
                        }}
                    >
                        Sair
                    </button>
                </div>
            </div>
        </div>
    )
}