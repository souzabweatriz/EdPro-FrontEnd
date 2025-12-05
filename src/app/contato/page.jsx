import Image from 'next/image';
import Link from 'next/link';
import HeaderStudent from '../../components/HeaderStudent/HeaderStudent';
import FooterStudent from '../../components/FooterStudent/FooterStudent';
import styles from './contato.module.css';

const team = [
    {
        name: 'Isabella',
        role: 'Desenvolvedora',
        image: '/images/isabella.png',
        email: 'isabella.b.rosa6@aluno.senai.br',
        github: 'isab5',
    },
    {
        name: 'Luana',
        role: 'Desenvolvedora',
        image: '/images/luana.png',
        email: 'luana.domeneghetti@aluno.senai.br',
        github: 'domeneghettii',
    },
    {
        name: 'Beatriz Lima',
        role: 'Desenvolvedora',
        image: '/images/beatriz.jpg',
        email: 'beatriz.lima@aluno.senai.br',
        github: 'limabea23',
    },
    {
        name: 'Ana Beatriz de Souza',
        role: 'Product Owner',
        image: '/images/ana.png',
        email: 'ana.b.oliveira56@aluno.senai.br',
        github: 'souzabweatriz',
    },
    {
        name: 'Anna Beatriz Valentim',
        role: 'Desenvolvedora',
        image: '/images/valentim.png',
        email: 'anna.b.valentim@aluno.senai.br',
        github: 'annabeatriz17',
    },
    {
        name: 'Maria Parma',
        role: 'Desenvolvedora',
        image: '/images/maria.png',
        email: 'maria.parma@aluno.senai.br',
        github: 'Mariaparma',
    },
    {
        name: 'Anna Beatriz Leme Alves',
        role: 'Scrum Master',
        image: '/images/leme.jpg',
        email: 'anna.b.alves7@aluno.senai.br',
        github: 'annabialeme',
    },
];

export default function ContatoPage() {
    const sortedTeam = [...team].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className={styles.pageWrap}>
            <HeaderStudent />
            <div className={styles.content}>
                <div className={styles.buttons}>
                <Link href="/login" className={styles.button}>Login</Link>
                <Link href="/cadastro" className={styles.button1}>Cadastre-se</Link>
            </div>
                <div className={styles.sessao2}>
                    <h1 className={styles.title}>Contato</h1>
                    <h2 className={styles.subtitle}>Fale conosco - dúvidas ou sugestões.</h2>
                    <p className={styles.description}>Nossa equipe está pronta para ajudar.</p>
                </div>
            </div>
            <main className={styles.container}>
                <h2 className={styles.teamTitle}>Nossa Equipe</h2>

                <div className={styles.teamGrid}>
                    {sortedTeam.map((m) => (
                        <article key={m.name} className={styles.memberCard}>
                            <div className={styles.avatarWrap}>
                                <Image
                                    src={m.image}
                                    alt={m.name}
                                    width={140}
                                    height={140}
                                    className={styles.avatar}
                                />
                            </div>

                            <div className={styles.memberInfo}>
                                <h3>{m.name}</h3>
                                <p className={styles.role}>{m.role}</p>

                                <div className={styles.memberContacts}>
                                    <a
                                        className={styles.contactLink}
                                        href={`mailto:${m.email}`}
                                        aria-label={`Enviar email para ${m.name}`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            className={styles.contactIcon}
                                        >
                                            <path
                                                d="M3 8.5v7A2.5 2.5 0 0 0 5.5 18h13a2.5 2.5 0 0 0 2.5-2.5v-7"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M21 7l-9 6-9-6"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <span>{m.email}</span>
                                    </a>

                                    <a
                                        className={styles.contactLink}
                                        href={`https://github.com/${m.github}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`GitHub de ${m.name}`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            className={styles.contactIcon}
                                        >
                                            <path
                                                d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.17-3.37-1.17-.45-1.14-1.11-1.44-1.11-1.44-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.54 2.36 1.1 2.94.84.09-.66.35-1.1.64-1.35-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.115 2.51.337 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.21 2.39.11 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .26.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"
                                            />
                                        </svg>
                                        <span>@{m.github}</span>
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </main>

            <FooterStudent />
        </div>
    );
}