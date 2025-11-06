'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../../components/Courses/Courses.module.css';

export default function Cursos() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div className={styles.cursosContainer}>
      <h1 className={styles.cursosTitle}>Criar Cursos</h1>
      <div className={styles.cursosCard}>
        <div
          className={styles.cursosImageContainer}
          onClick={() => document.getElementById('imageInput').click()}
        >
          {selectedImage ? (
  <Image
    src={selectedImage}
    alt="Curso"
    className={styles.cursosImage}
    width={150}
    height={150}
    onError={() => setSelectedImage(null)} // Fallback para erros de carregamento
  />
) : (
  <span className={styles.cursosImagePlaceholder}>FOTO AQUI</span>
)}
        </div>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          className={styles.cursosHiddenInput}
          onChange={handleImageUpload}
        />
        <div className={styles.cursosForm}>
          <div className={styles.cursosInputGroup}>
            <label className={styles.cursosLabel}>Categoria:</label>
            <input type="text" placeholder="Digite sua categoria" className={styles.cursosInput} />
          </div>
          <div className={styles.cursosInputGroup}>
            <label className={styles.cursosLabel}>Foto:</label>
            <input type="text" placeholder="Insira sua imagem" className={styles.cursosInput} disabled />
          </div>
          <div className={styles.cursosInputGroup}>
            <label className={styles.cursosLabel}>Título:</label>
            <input type="text" placeholder="Digite o título" className={styles.cursosInput} />
          </div>
          <div className={styles.cursosInputGroup}>
            <label className={styles.cursosLabel}>Descrição:</label>
            <input type="text" placeholder="Digite sua descrição" className={styles.cursosInput} />
          </div>
        </div>
      </div>
      <button className={styles.cursosButton}>Criar curso -&gt;</button>
    </div>
  );
}