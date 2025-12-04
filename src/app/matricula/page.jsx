"use client";
import React, { useState, useEffect } from "react";
import styles from "./matricula.module.css";
import apiClient, { getDefaultHeaders } from "../../lib/apiClient";

export default function Matricula() {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        genero: "",
        telefone: "",
        endereco: "",
        estado: "",
        cursos: [],
        comentario: ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

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

        if (formData.cursos.length === 0)
            newErrors.cursos = "Selecione pelo menos 1 curso.";

        return newErrors;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleCourseChange = (course) => {
        const cursos = formData.cursos.includes(course)
            ? formData.cursos.filter(c => c !== course)
            : [...formData.cursos, course];

        setFormData({ ...formData, cursos });
        setErrors({ ...errors, cursos: "" });
    };

    const handleSubmit = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/matricula", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Erro ao enviar");

            alert("Matrícula enviada com sucesso!");

            setFormData({
                nome: "",
                email: "",
                genero: "",
                telefone: "",
                endereco: "",
                estado: "",
                cursos: [],
                comentario: "",
            });

        } catch (err) {
            alert("Ocorreu um erro ao enviar a matrícula.");
        }

        setLoading(false);
    };

    const [cursosLista, setCursosLista] = useState([]);
    const [cursosLoading, setCursosLoading] = useState(false);
    const [cursosError, setCursosError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            setCursosLoading(true);
            setCursosError(null);
            // Tentar chamar o backend configurado em NEXT_PUBLIC_API_URL primeiro,
            // e como fallback chamar a rota interna `/api/course`.
            const base = process.env.NEXT_PUBLIC_API_URL || apiClient.defaults.baseURL || "";
            const urlsToTry = [];
            if (base) urlsToTry.push(`${base.replace(/\/$/, "")}/course`);
            urlsToTry.push("/api/course");
            urlsToTry.push("/course");

            let lastError = null;
            for (const url of urlsToTry) {
                try {
                    const resp = await apiClient.get(url.replace(/^(https?:)?\/\//, url.startsWith("/") ? url : url), {
                        headers: getDefaultHeaders(),
                    });
                    // resposta pode ser array ou { cursos: [...] } ou { data: [...] }
                    const data = resp.data;
                    let list = [];
                    if (Array.isArray(data)) list = data;
                    else if (Array.isArray(data.cursos)) list = data.cursos;
                    else if (Array.isArray(data.data)) list = data.data;
                    else if (data && typeof data === "object") {
                        // talvez um array esteja em data.results etc
                        list = Object.values(data).flat().filter(Boolean);
                    }

                    // Normalizar para strings com título
                    const normalized = list.map((item) => {
                        if (!item) return null;
                        if (typeof item === "string") return item;
                        return item.titulo || item.title || item.name || item.nome || item.nomeCurso || JSON.stringify(item);
                    }).filter(Boolean);

                    setCursosLista(normalized);
                    setCursosLoading(false);
                    return;
                } catch (err) {
                    lastError = err;
                    // tentar próximo
                }
            }

            setCursosError(lastError?.message || "Erro ao carregar cursos");
            setCursosLoading(false);
        };

        fetchCourses();
    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Matrículas</h2>

            <div className={styles.formBox}>
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
                        Por favor, selecione os cursos nos quais deseja se inscrever.
                    </div>

                    <div className={styles.coursesList}>
                        {cursosLista.map((curso) => (
                            <label key={curso} className={styles.courseItem}>
                                <input
                                    type="checkbox"
                                    checked={formData.cursos.includes(curso)}
                                    onChange={() => handleCourseChange(curso)}
                                />
                                {curso}
                            </label>
                        ))}
                    </div>

                    {errors.cursos && (
                        <span className={styles.error}>{errors.cursos}</span>
                    )}
                </div>

                <div className={styles.commentsRow}>
                    <span className={styles.commentsLabel}>Comentários adicionais:</span>

                    <input
                        className={styles.commentsInput}
                        name="comentario"
                        placeholder="Digite seu comentário"
                        value={formData.comentario}
                        onChange={handleChange}
                        disabled={loading}
                    />

                    <button
                        className={styles.commentsButton}
                        type="button"
                        disabled={loading || !formData.comentario.trim()}
                    >
                        Enviar comentário
                    </button>
                </div>

                <button
                    className={styles.submitButton}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    Enviar matrícula
                </button>
            </div>
        </div>
    );
}
