"use client";
import React, { useState } from "react";
import styles from "./matricula.module.css";

export default function Matricula() {
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSendComment = () => {
        if (!comment.trim()) return;
        setLoading(true);
        setSuccess(false);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setComment("");
            setTimeout(() => setSuccess(false), 2000);
        }, 1200);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Matrículas</h2>
            <div className={styles.formBox}>
                <div className={styles.fieldsGrid}>
                    <div className={styles.fieldCol}>
                        <label className={styles.label}>Nome completo:</label>
                        <input className={styles.input} placeholder="" />
                    </div>
                    <div className={styles.fieldCol}>
                        <label className={styles.label}>E-mail do aluno:</label>
                        <input className={styles.input} type="email" placeholder="" />
                    </div>
                    <div className={styles.fieldCol}>
                        <label className={styles.label}>Gênero:</label>
                        <select className={styles.select} defaultValue="">
                            <option value="" disabled>Selecione</option>
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                            <option value="outro">Outro</option>
                            <option value="nao-informar">Prefiro não informar</option>
                        </select>
                    </div>
                    <div className={styles.fieldCol}>
                        <label className={styles.label}>Número de telefone:</label>
                        <input className={styles.input} type="tel" placeholder="(00) 00000-0000" />
                    </div>
                    <div className={styles.fieldCol}>
                        <label className={styles.label}>Endereço:</label>
                        <input className={styles.input} placeholder="" />
                    </div>
                    <div className={styles.fieldCol}>
                        <label className={styles.label}>Estado/Província</label>
                        <select className={styles.select} defaultValue="">
                            <option value="" disabled>Selecione</option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                            <option value="outro">Outro</option>
                        </select>
                    </div>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.coursesBox}>
                    <div className={styles.coursesLabel}>
                        Por favor, selecione os cursos nos quais deseja se inscrever.
                    </div>
                    <div className={styles.coursesList}>
                        <label className={styles.courseItem}><input type="checkbox" /> Conecta y Crea: Spanish with Purpose</label>
                        <label className={styles.courseItem}><input type="checkbox" /> Humanized Leadership: Inspire, Motivate, and Transform</label>
                        <label className={styles.courseItem}><input type="checkbox" /> From Dream to Action: The Entrepreneurs Path</label>
                        <label className={styles.courseItem}><input type="checkbox" /> Balance and Flow: Stress Management</label>
                        <label className={styles.courseItem}><input type="checkbox" /> You 2.0: Personal Branding and Self-Confidence</label>
                        <label className={styles.courseItem}><input type="checkbox" /> English Flow: Professional Communication</label>
                        <label className={styles.courseItem}><input type="checkbox" /> Emotion & Clarity: Emotional Intelligence in Practice</label>
                        <label className={styles.courseItem}><input type="checkbox" /> Creative Mindset: Unlock Your Innovative Potential</label>
                        <label className={styles.courseItem}><input type="checkbox" /> Leadership Path: Inspiring Teams with Purpose</label>
                        <label className={styles.courseItem}><input type="checkbox" /> Digital Skills Accelerator: Mastering Modern Tools</label>
                        <label className={styles.courseItem}><input type="checkbox" /> Leadership Essentials: Foundations of Modern Leadership</label>
                        <label className={styles.courseItem}><input type="checkbox" /> Creative Productivity: Mastering Focus & Innovation</label>
                        <label className={styles.courseItem}><input type="checkbox" /> Smart Communication: Clear & Confident Expression</label>
                        <label className={styles.courseItem}><input type="checkbox" /> Personal Finance Basics: Building a Healthy Money Mindset</label>
                    </div>
                </div>
                <div className={styles.commentsRow}>
                    <span className={styles.commentsLabel}>Comentários adicionais:</span>
                    <input
                        className={styles.commentsInput}
                        placeholder="Digite seu comentário"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        disabled={loading}
                    />
                    <button
                        className={styles.commentsButton}
                        type="button"
                        onClick={handleSendComment}
                        disabled={loading || !comment.trim()}
                    >
                        {loading ? (
                            <span>
                                <span className={styles.spinner}></span>
                                Enviando...
                            </span>
                        ) : "Enviar comentário"}
                    </button>
                    {success && (
                        <span className={styles.successMsg}>Comentário enviado com sucesso!</span>
                    )}
                </div>
            </div>
        </div>
    );
}
