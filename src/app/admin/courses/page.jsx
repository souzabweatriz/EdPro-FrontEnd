"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Courses.module.css";

export default function CreateCourse() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    categoria: "",
    numero: "",
    titulo: "",
    descricao: "",
  });
  const fileInputRef = useRef(null);
  const router = useRouter();

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("categoria", formData.categoria);
      formDataToSend.append("numero", formData.numero);
      formDataToSend.append("titulo", formData.titulo);
      formDataToSend.append("descricao", formData.descricao);
      if (image) {
        formDataToSend.append("imagem", image);
      }

      sessionStorage.setItem("cursoData", JSON.stringify(formData));

      const response = await fetch("http://localhost:5000/api/course", {
        method: "POST",
        body: formDataToSend,
      });
      if (response.ok) {
        alert("Curso criado com sucesso!");
        router.push("/matricula");
      } else {
        alert("Erro ao criar curso. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao criar curso:", error);
      alert("Erro ao criar curso. Verifique o console para mais detalhes.");
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
            <input
              className={styles.input}
              name="categoria"
              placeholder="Digite sua categoria"
              value={formData.categoria}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.fieldCol}>
            <label className={styles.label}>Número:</label>
            <input
              className={styles.input}
              name="numero"
              type="number"
              placeholder="Digite o número do curso"
              value={formData.numero}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.fieldsRow}>
          <div className={styles.fieldCol}>
            <label className={styles.label}>Título:</label>
            <input
              className={styles.input}
              name="titulo"
              placeholder="Digite o título"
              value={formData.titulo}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.fieldCol}>
            <label className={styles.label}>Descrição:</label>
            <input
              className={styles.input}
              name="descricao"
              placeholder="Digite sua descrição"
              value={formData.descricao}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.buttonRow}>
          <button
            className={styles.createButton}
            type="button"
            onClick={handleSubmit}
          >
            Criar Cursos
          </button>
        </div>
      </div>
    </div>
  );
}