"use client";
import styles from './cursos.module.css';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthProvider';
import { useRouter } from 'next/navigation';

export default function CursosPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('matricula');
    const [cursos, setCursos] = useState([]);
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        duracao: '',
        vagas: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user && user.role !== 'professor') {
            router.push('/profileStudent');
        }
    }, [user, router]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/cursos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    professor_id: user?.id,
                }),
            });

            if (response.ok) {
                alert('Curso criado com sucesso!');
                setFormData({ nome: '', descricao: '', duracao: '', vagas: '' });
            } else {
                alert('Erro ao criar curso');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao criar curso');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.courseCard}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Gerenciar Cursos</h1>
                    <button 
                        className={styles.backButton}
                        onClick={() => router.back()}
                    >
                        ← Voltar
                    </button>
                </div>

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'matricula' ? styles.active : ''}`}
                        onClick={() => setActiveTab('matricula')}
                    >
                        📋 Matrícula
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'criar' ? styles.active : ''}`}
                        onClick={() => setActiveTab('criar')}
                    >
                        ➕ Criar Curso
                    </button>
                </div>

                {activeTab === 'matricula' && (
                    <div className={styles.tabContent}>
                        <h2 className={styles.subtitle}>Matrículas de Alunos</h2>
                        <div className={styles.emptyState}>
                            <p>📚 Nenhuma matrícula registrada ainda</p>
                            <small>Os alunos poderão se matricular em seus cursos aqui</small>
                        </div>
                    </div>
                )}

                {activeTab === 'criar' && (
                    <div className={styles.tabContent}>
                        <h2 className={styles.subtitle}>Criar Novo Curso</h2>
                        <form onSubmit={handleCreateCourse} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label htmlFor="nome">Nome do Curso *</label>
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Introdução a JavaScript"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="descricao">Descrição *</label>
                                <textarea
                                    id="descricao"
                                    name="descricao"
                                    value={formData.descricao}
                                    onChange={handleInputChange}
                                    placeholder="Descreva o conteúdo e objetivos do curso"
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="duracao">Duração (horas) *</label>
                                    <input
                                        type="number"
                                        id="duracao"
                                        name="duracao"
                                        value={formData.duracao}
                                        onChange={handleInputChange}
                                        placeholder="40"
                                        min="1"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="vagas">Vagas Disponíveis *</label>
                                    <input
                                        type="number"
                                        id="vagas"
                                        name="vagas"
                                        value={formData.vagas}
                                        onChange={handleInputChange}
                                        placeholder="30"
                                        min="1"
                                        required
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className={styles.submitButton}
                                disabled={loading}
                            >
                                {loading ? 'Criando...' : '✓ Criar Curso'}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
