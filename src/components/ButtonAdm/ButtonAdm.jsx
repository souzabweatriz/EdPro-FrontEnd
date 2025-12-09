"use client";
import styles from "./ButtonAdm.module.css";
import { useRouter, usePathname } from 'next/navigation';

export default function ButtonAdm() {
    const router = useRouter();
    const pathname = usePathname();

    const handleAdminClick = () => {
        router.push("/Homeadmin");
    };

    const handleAlunoClick = () => {
        router.push("");
    };

    const isAdminActive = pathname === "/Homeadmin";
    const isAlunoActive = pathname === "/";

    return (
        <div className={styles.buttonContainer}>
            <button
                className={`${styles.button1} ${isAlunoActive ? styles.active : ""}`}
                onClick={handleAlunoClick}
            >
                Aluno
            </button>
            <button
                className={`${styles.button2} ${isAdminActive ? styles.active : ""}`}
                onClick={handleAdminClick}
            >
                Administrador
            </button>
        </div>
    );
}