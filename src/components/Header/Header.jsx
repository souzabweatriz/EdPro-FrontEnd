import Image from "next/image";
import Link from "next/link";
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <Image
                    src="/images/Logo.png"
                    alt="EdPro Logo"
                    width={40}        
                    height={40}       
                    className={styles.logo}
                />
                <span className={styles.logoText}>EdPro</span>
            </div>
            
            <nav className={styles.nav}>
                <Link href="/" className={styles.navLink}>Início</Link>
                <Link href="/cursos" className={styles.navLink}>Cursos</Link>
                <Link href="/quem-somos" className={styles.navLink}>Quem Somos</Link>
                <Link href="/player" className={styles.navLink}>Player do Curso</Link>
            </nav>

            <div className={styles.actions}>
                <Link href="/login" className={styles.actionButton}>Login</Link>
                <Link href="/register" className={styles.actionButton}>Cadastre-se</Link>
            </div>

            <div className={styles.menuIcon}>
                <span className={styles.menuLine}></span>
                <span className={styles.menuLine}></span>
                <span className={styles.menuLine}></span>
                <div className={styles.dropdownMenu}>
                    <Link href="/configuracoes">Configurações</Link>
                    <Link href="/perfil">Perfil</Link>
                    <Link href="/ajuda">Ajuda</Link>
                </div>
            </div>
        </header>
    );
}