import Image from "next/image";
import Link from "next/link";
import styles from './not-found.module.css';

export default function NotFound() {
    return (
        <div className={styles.container}>
            <h2 className={styles.subtitle}>Página não encontrada</h2>
            <p className={styles.description}>
                O conteúdo que você procura não está disponível ou foi movido.<br />
                Volte para a página inicial ou tente novamente.
            </p>

            <Image
                src="/images/gif.gif"
                alt="Página não encontrada"
                width={400}   
                height={300}   
                className={styles.image}
            />

            <Link href="/" className={styles.button}>
                Voltar ao início
            </Link>
        </div>
    );
}
