"use client";
import React, { useState, useEffect } from "react";
import styles from "./matricula.module.css";
import useCourses from "../../lib/useCourses";

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
        
            const selectedIds = formData.cursos || [];
            const selectedTitles = (cursosLista || []).filter(c => selectedIds.includes(c.id)).map(c => c.title);
            const payload = { ...formData, cursos_ids: selectedIds, cursos_titles: selectedTitles };

            const baseRaw = process.env.NEXT_PUBLIC_API_URL || "";
            const base = baseRaw.replace(/\/$/, "");
            const urlsToTry = [];
            if (base) {
                urlsToTry.push(`${base}/matricula`);
                urlsToTry.push(`${base}/api/matricula`);
            }
            urlsToTry.push("/api/matricula");
            urlsToTry.push("/matricula");
            urlsToTry.push("http://localhost:5000/api/matricula");
            urlsToTry.push("http://localhost:5000/matricula");

            let lastError = null;
            for (const url of urlsToTry) {
                try {
                    console.debug("[Matricula] POST ->", url, payload);
                    const resp = await fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                    });

                    const textOrJson = await (async () => {
                        const ct = resp.headers.get("content-type") || "";
                        try {
                            if (ct.includes("application/json")) return await resp.json();
                            return await resp.text();
                        } catch { return await resp.text(); }
                    })();

                    if (!resp.ok) {
                        lastError = new Error(`HTTP ${resp.status} ${resp.statusText} - ${JSON.stringify(textOrJson)}`);
                        console.warn("[Matricula] tentativa falhou:", url, lastError);
                        continue;
                    }

                    console.info("[Matricula] enviado com sucesso para:", url, textOrJson);
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
                    setLoading(false);
                    return;
                } catch (err) {
                    lastError = err;
                    console.error("[Matricula] erro ao postar em", url, err);
                    continue;
                }
            }

            console.error("[Matricula] falha ao enviar matrícula; tentadas:", urlsToTry, lastError);
            alert("Ocorreu um erro ao enviar a matrícula. Verifique o console para mais detalhes.");
        } finally {
            setLoading(false);
        }
    };

    // Use hook-based loader with cache (sessionStorage)
    const { courses: fetchedCourses, loading: cursosLoading, error: cursosError, reload } = useCourses();
    const [cursosLista, setCursosLista] = useState([]);

    // sincroniza fetchedCourses (array de objetos {id,title}) com o estado local
    useEffect(() => {
        if (Array.isArray(fetchedCourses)) {
            setCursosLista(fetchedCourses);
        }
    }, [fetchedCourses]);

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
                                    type="checkbox"
                                    checked={formData.cursos.includes(curso.id)}
                                    onChange={() => handleCourseChange(curso.id)}
                                />
                                {curso.title}
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
