"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from './Id.module.css';

export default function CourseLessonsPage() {
  const { id } = useParams(); 
  const [lesson, setLesson] = useState(null);
  const [completed, setCompleted] = useState(false);

 useEffect(() => {
  if (!id) return;

  async function loadEverything() {
    try {
      const res = await fetch(`http://localhost:5000/api/lessons/${id}`);
      const data = await res.json();
      setLesson(data);

      const videoId = data.media.includes("youtu.be")
        ? data.media.split("youtu.be/")[1].split("?")[0]
        : data.media.split("watch?v=")[1].split("&")[0];

      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }

      window.onYouTubeIframeAPIReady = () => {
        new YT.Player("youtube-player", {
          height: "100%",
          width: "100%",
          videoId: videoId,
          events: {
            onStateChange: (event) => {
              if (event.data === 0) {
                setCompleted(true);
              }
            },
          },
        });
      };
    } catch (err) {
      console.error("Erro:", err);
    }
  }

  loadEverything();
}, [id]);

  return (
  <div className={styles.container}>
      <Link href="/Studentcourses" className={styles.back}>
        ← Voltar
      </Link>

      <h1 className={styles.title}>Player do Curso</h1>

      {!lesson ? (
        <p>Carregando...</p>
      ) : (
        <div className={styles.card}>
          <div className={styles.playerSection}>
            <div className={styles.videoBox}>
              <div id="youtube-player"></div>
            </div>

            <h2 className={styles.lessonTitle}>{lesson.title}</h2>
            <p className={styles.subtitle}>{lesson.subtitle}</p>
            <p className={styles.subtitle}>{lesson.content}</p>

            {completed && (
              <div className={styles.activityCard}>
              <strong>Estado:</strong> Concluído ✅
              </div>
            )}
          </div>
        </div>
      )}
    </div>
);
}