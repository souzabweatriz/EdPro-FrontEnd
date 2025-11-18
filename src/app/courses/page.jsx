"use client";
import React, { useRef, useState } from "react";
import styles from "./Courses.module.css";

export default function CreateCourse() {
	const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const fileInputRef = useRef(null);

	const handleImageClick = () => {
		fileInputRef.current.click();
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(file);
			setImagePreview(URL.createObjectURL(file));
		}
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Criar Cursos</h2>
			<div className={styles.formBox}>
				<div className={styles.imageBox} onClick={handleImageClick}>
					{imagePreview ? (
						<img src={imagePreview} alt="Preview" className={styles.previewImg} />
					) : (
						<span className={styles.imagePlaceholder}>FOTO AQUI</span>
					)}
					<input
						type="file"
						accept="image/*"
						ref={fileInputRef}
						style={{ display: "none" }}
						onChange={handleImageChange}
					/>
				</div>
				<div className={styles.fieldsRow}>
					<div className={styles.fieldCol}>
						<label className={styles.label}>Categoria:</label>
						<input className={styles.input} placeholder="Digite sua categoria" />
					</div>
								<div className={styles.fieldCol}>
									<label className={styles.label}>Número:</label>
									<input className={styles.input} type="number" placeholder="Digite o número do curso" />
					</div>
				</div>
				<div className={styles.fieldsRow}>
					<div className={styles.fieldCol}>
						<label className={styles.label}>Título:</label>
						<input className={styles.input} placeholder="Digite o título" />
					</div>
					<div className={styles.fieldCol}>
						<label className={styles.label}>Descrição:</label>
						<input className={styles.input} placeholder="Digite sua descrição" />
					</div>
				</div>
				<div className={styles.buttonRow}>
					<button className={styles.createButton}>Criar Cursos</button>
				</div>
			</div>
		</div>
	);
}
