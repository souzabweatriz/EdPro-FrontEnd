
import Image from 'next/image';
import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <Image
            src="/images/error.gif"
            alt="Erro 404"
            width={400}
            height={300}
            className={styles.errorGif}
            priority
          />
        </div>
        
        <div className={styles.textContent}>
          <h1 className={styles.title}>404</h1>
          <h2 className={styles.subtitle}>Página não encontrada</h2>
          <p className={styles.description}>
            Ops! A página que você está procurando não existe ou foi movida.
          </p>
          
          <Link href="/" className={styles.backButton}>
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

