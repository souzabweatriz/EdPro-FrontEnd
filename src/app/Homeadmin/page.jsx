'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import HeaderAdmin from '@/components/HeaderAdmin/HeaderAdmin';
import FooterAdmin from '@/components/FooterAdmin/FooterAdmin';
import styles from './Homeadmin.module.css';

export default function HomeAdmin() {
  const router = useRouter();

  const handleNavigateCourses = () => {
    router.push('/admin/courses');
  };

  const handleNavigateMatriculas = () => {
    router.push('/matricula');
  };

  return (
    <div className={styles.container}>
      <HeaderAdmin />

      <main className={styles.mainContent}>
        <section className={styles.welcome}>
          <h1 className={styles.welcomeTitle}>
            Seja Bem Vindo! <span className={styles.highlight}>Administrador Fulaninho</span>
          </h1>
        </section>

        <section className={styles.bannerSection}>
          <div className={styles.bannerIcon}>
            <Image
              src="/images/Logo.png"
              alt="EdPro Logo"
              width={70}
              height={90}
              priority
            />
          </div>
          <div className={styles.divider}></div>
          <div className={styles.bannerContent}>
            <h2>EdPro</h2>
            <p>Seu painel para organizar, ajustar e evoluir o site.</p>
          </div>
        </section>

        <section className={styles.cardsGrid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Crie aqui um novo curso</h3>
            <button className={styles.cardButton} onClick={handleNavigateCourses}>
              Clique Aqui
            </button>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Gerencie sua matricula</h3>
            <button className={styles.cardButton} onClick={handleNavigateMatriculas}>
              Clique Aqui
            </button>
          </div>
        </section>
      </main>

      <FooterAdmin />
    </div>
  );
}