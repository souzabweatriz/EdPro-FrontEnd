import Image from "next/image";
import Link from "next/link";
import styles from './HeaderAdmin.module.css';
import { IoMdMenu } from "react-icons/io";

export default function HeaderAdmin() {
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <Image
                    src="/images/Logo.png"
                    alt="EdPro Logo"
                    width={70}
                    height={110}
                    className={styles.logo}
                />
                <span className={styles.logoText}>EdPro</span>
            </div>

            <nav className={styles.nav}>
                <Link href="/Homeadmin" className={styles.navLink}>Início</Link>
                <Link href="/createCourses" className={styles.navLink}>Criar Cursos</Link>
                <Link href="/matricula" className={styles.navLink}>Criar Matrículas</Link>

                <div className={styles.menuIcon}>
                    <div className={styles.icon}>
                        <IoMdMenu size={35} aria-label="Menu" />
                    </div>
                    <div className={styles.dropdownMenu}>
                        <Link href="/perfil">Perfil</Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}