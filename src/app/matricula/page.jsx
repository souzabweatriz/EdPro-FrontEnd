"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./matricula.module.css";
import useCourses from "../../lib/useCourses";
import axios from "axios";
import HeaderAdmin from "@/components/HeaderAdmin/HeaderAdmin"; 
import FooterAdmin from "@/components/FooterAdmin/FooterAdmin";

export default function Matricula() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const cursoFromUrl = searchParams.get('curso');
    
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        genero: "",
        telefone: "",
        endereco: "",
        estado: "",
        curso: "",
        comentario: ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const { courses: fetchedCourses, loading: cursosLoading, error: cursosError, reload } = useCourses();
    const [cursosLista, setCursosLista] = useState([]);

    useEffect(() => {
        if (Array.isArray(fetchedCourses)) {
            setCursosLista(fetchedCourses);
            // Se há um cu
            if (cursoFromUrl) {
                const cursoId = String(cursoFromUrl);
                const cursoExists = fetchedCourses.some(c => String(c.id) === cursoId);
                if (cursoExists) {
                    setFormData(prev => ({ ...prev, curso: cursoId }));
                }
            }
        }
    }, [fetchedCourses, cursoFromUrl]);

    const validate = () => {
        let newErrors = {};

        if (!formData.nome.trim()) newErrors.nome = "Digite o nome completo.";

        if (!formData.email.trim()) {
            newErrors.email = "Digite o e-mail.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "E-mail inválido.";
        }

        if (!formData.genero) newErrors.genero = "Selecione o gênero.";

        if (!formData.telefone.trim()) {
            newErrors.telefone = "Digite um telefone.";
        } else if (formData.telefone.replace(/\D/g, "").length < 10) {
            newErrors.telefone = "Telefone inválido (mínimo 10 dígitos).";
        }

        if (!formData.endereco.trim()) newErrors.endereco = "Digite o endereço.";

        if (!formData.estado) newErrors.estado = "Selecione o estado.";

        if (!formData.curso)
            newErrors.curso = "Selecione um curso.";

        return newErrors;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleCourseChange = (courseId) => {
        setFormData({ ...formData, curso: String(courseId) });
        setErrors({ ...errors, curso: "" });
    };

    const handleSubmit = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        try {
            const selectedCourse = (cursosLista || []).find(c => c.id === formData.curso);
            const payload = { 
                ...formData, 
                curso_id: formData.curso, 
                curso_title: selectedCourse?.title || "" 
            };

            // URL única para envio do formulário
            const url = "/api/matricula";

            const resp = await axios.post(url, payload, {
                headers: { "Content-Type": "application/json" }
            });

            // Salvar dados do aluno no localStorage
            const studentData = {
                name: formData.nome,
                email: formData.email,
                course: selectedCourse?.title || "",
                courseId: formData.curso,
                avatar: null,
                completedTasks: 0,
                pendingTasks: 100
            };
            localStorage.setItem('studentInfo', JSON.stringify(studentData));

            alert("Matrícula enviada com sucesso!");
            setFormData({
                nome: "",
                email: "",
                genero: "",
                telefone: "",
                endereco: "",
                estado: "",
                curso: "",
                comentario: "",
            });
            setLoading(false);

            // Redirecionar para página de cursos do aluno
            router.push('/Studentcourses');
        } catch (err) {
            console.error("[Matricula] erro ao postar (axios)", err);
            alert("Ocorreu um erro ao enviar a matrícula. Verifique o console para mais detalhes.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <HeaderAdmin />
            <div className={styles.formBox}>
            <h2 className={styles.title}>Matrículas</h2>
                <div className={styles.fieldsGrid}>

                    <div className={styles.fieldCol}>
                        <label className={styles.label}>Nome completo:</label>
                        <input
                            className={styles.input}
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                        />
                        {errors.nome && <span className={styles.error}>{errors.nome}</span>}
                    </div>

                    <div className={styles.fieldCol}>
                        <label className={styles.label}>E-mail do aluno:</label>
                        <input
                            className={styles.input}
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className={styles.error}>{errors.email}</span>}
                    </div>

                    <div className={styles.fieldCol}>
                        <label className={styles.label}>Gênero:</label>
                        <select
                            className={styles.select}
                            name="genero"
                            value={formData.genero}
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                            <option value="outro">Outro</option>
                            <option value="nao-informar">Prefiro não informar</option>
                        </select>
                        {errors.genero && <span className={styles.error}>{errors.genero}</span>}
                    </div>

                    <div className={styles.fieldCol}>
                        <label className={styles.label}>Número de telefone:</label>
                        <input
                            className={styles.input}
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                        />
                        {errors.telefone && <span className={styles.error}>{errors.telefone}</span>}
                    </div>

                    <div className={styles.fieldCol}>
                        <label className={styles.label}>Endereço:</label>
                        <input
                            className={styles.input}
                            name="endereco"
                            value={formData.endereco}
                            onChange={handleChange}
                        />
                        {errors.endereco && <span className={styles.error}>{errors.endereco}</span>}
                    </div>
                
                    <div className={styles.fieldCol}>
                        <label className={styles.label}>Estado/Província:</label>
                        <select
                            className={styles.select}
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
                            <option value="SP">São Paulo</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PR">Paraná</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="BA">Bahia</option>
                            <option value="outro">Outro</option>
                        </select>
                        {errors.estado && <span className={styles.error}>{errors.estado}</span>}
                    </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.coursesBox}>
                    <div className={styles.coursesLabel}>
                        Por favor, selecione o curso no qual deseja se inscrever.
                    </div>

                    <div className={styles.coursesList}>
                        {cursosLoading && <div>Carregando cursos...</div>}
                        {cursosError && (
                            <div className={styles.error}>
                                Erro ao carregar cursos: {String(cursosError)}
                                <button type="button" onClick={reload} style={{ marginLeft: 8 }}>Tentar novamente</button>
                            </div>
                        )}
                        {!cursosLoading && !cursosError && cursosLista.length === 0 && (
                            <div>Nenhum curso disponível no momento.</div>
                        )}
                        {!cursosLoading && !cursosError && cursosLista.map((curso) => (
                            <label key={curso.id} className={styles.courseItem}>
                                <input
                                    type="radio"
                                    name="curso"
                                    value={String(curso.id)}
                                    checked={formData.curso === String(curso.id)}
                                    onChange={() => handleCourseChange(curso.id)}
                                />
                                {curso.title}
                            </label>
                        ))}
                    </div>

                    {errors.curso && (
                        <span className={styles.error}>{errors.curso}</span>
                    )}
                </div>

                <button
                    className={styles.submitButton}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    Enviar matrícula
                </button>
            </div>
            <FooterAdmin />
        </div>
    );
}