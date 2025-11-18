"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import styles from "./Studentcourses.module.css";

const courses = Array(6).fill({});

export default function StudentCourses() {
    const [media, setMedia] = useState(Array(6).fill(null));
    const fileInputRefs = useRef(Array(6).fill(null));

    const handleImageClick = idx => {
        if (fileInputRefs.current[idx]) {
            fileInputRefs.current[idx].click();
        }
    };

    const handleImageChange = (e, idx) => {
        const file = e.target.files[0];
        if (file) {
            const newMedia = [...media];
            newMedia[idx] = URL.createObjectURL(file);
            setMedia(newMedia);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.topPanel}>
                <div className={styles.userInfo}>
                    <div className={styles.avatar}></div>
                    <div>
                        <div className={styles.userName}>Olá, Aluno Fulano de Tal</div>
                        <div className={styles.userCourse}>Matriculado no curso de: <span className={styles.courseLink}>Custura</span></div>
                        <div className={styles.buttonRow}>
                            <button className={styles.topButton}>Confira seus cursos</button>
                            <button className={styles.topButton}>Matricule-se</button>
                        </div>
                    </div>
                </div>
                <div className={styles.taskSummary}>
                    <div className={styles.taskTitle}>Resumo de Tarefas</div>
                    <div className={styles.taskRow}><span>Concluídas:</span> <span className={styles.taskBar}><span className={styles.taskBarGreen}></span></span> <span className={styles.taskPercent}>97%</span></div>
                    <div className={styles.taskRow}><span>Pendentes:</span> <span className={styles.taskBar}><span className={styles.taskBarRed}></span></span> <span className={styles.taskPercent}>3%</span></div>
                </div>
            </div>
            <h2 className={styles.title}>Meus Cursos</h2>
            <div className={styles.filtersRow}>
                <button className={styles.filterButton}>Todas</button>
                <div className={styles.searchBox}><span className={styles.searchIcon}>🔍</span><input className={styles.searchInput} placeholder="Buscar" /></div>
                <button className={styles.filterButton}>Ordenar por último acesso ▾</button>
            </div>
            <div className={styles.coursesGrid}>
                {courses.map((_, idx) => (
                    <div className={styles.courseCard} key={idx}>
                        <div className={styles.cardImageBox} onClick={() => handleImageClick(idx)}>
                            {media[idx] ? (
                                <Image src={media[idx]} alt="Mídia" className={styles.cardImage} width={320} height={110} style={{ objectFit: "cover" }} />
                            ) : (
                                <span className={styles.cardImagePlaceholder}>FOTO AQUI</span>
                            )}
                            <input
                                type="file"
                                accept="image/*,video/*"
                                ref={el => (fileInputRefs.current[idx] = el)}
                                style={{ display: "none" }}
                                onChange={e => handleImageChange(e, idx)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
