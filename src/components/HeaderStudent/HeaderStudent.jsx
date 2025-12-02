import Image from "next/image";
import Link from "next/link";
import styles from './HeaderStudent.module.css';
import { IoMdMenu } from "react-icons/io";

export default function HeaderStudent() {
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
                <Link href="/home" className={styles.navLink}>Início</Link>
                <Link href="/about" className={styles.navLink}>Sobre Nós</Link>
                <Link href="/contato" className={styles.navLink}>Contato</Link>

                <div className={styles.menuIcon}>
                    <div className={styles.icon}>
                        <IoMdMenu size={35} aria-label="Menu" />
                    </div>
                    <div className={styles.dropdownMenu}>
                        <Link href="/configuracoes">Configurações</Link>
                        <Link href="/perfil">Perfil</Link>
                        <Link href="/ajuda">Ajuda</Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}