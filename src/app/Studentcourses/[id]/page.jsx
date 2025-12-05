"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CourseLessonsPage({ params }) {
  const { id } = params; 
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    async function loadLessons() {
      try {
        const res = await fetch(`http://localhost:5000/lessons/course/${id}`);
        const data = await res.json();
        setLessons(data);
      } catch (err) {
        console.error("Erro ao carregar lições:", err);
      }
    }
    loadLessons();
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      <Link href="/student/courses">← Voltar</Link>

      <h1>Lições do Curso {id}</h1>

      {lessons.length === 0 ? (
        <p>Carregando lições...</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              style={{
                padding: "15px",
                background: "#f2f2f2",
                borderRadius: "8px",
              }}
            >
              <h3>{lesson.title}</h3>
              <p>{lesson.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
