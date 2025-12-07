'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './courses[id].module.css';
import HeaderStudent from '@/components/HeaderStudent/HeaderStudent';
import FooterStudent from '@/components/FooterStudent/FooterStudent';

const CourseDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const courseId = params.id;

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const baseRaw = process.env.NEXT_PUBLIC_API_URL || "";
      const base = baseRaw.replace(/\/$/, "");
      const urlsToTry = [];
      
      if (base) {
        urlsToTry.push(`${base}/courses/${courseId}`);
        urlsToTry.push(`${base}/api/courses/${courseId}`);
      }
      urlsToTry.push(`/api/courses/${courseId}`);
      urlsToTry.push(`http://localhost:5000/api/courses/${courseId}`);

      for (const url of urlsToTry) {
        try {
          console.debug("[CourseDetail] GET ->", url);
          const response = await fetch(url);
          if (!response.ok) {
            console.warn("[CourseDetail] tentativa falhou:", url, response.status);
            continue;
          }
          const data = await response.json();
          setCourse(data);
          setLoading(false);
          return;
        } catch (err) {
          console.warn("[CourseDetail] erro ao buscar em", url, err);
          continue;
        }
      }

      setError('Curso não encontrado');
      setLoading(false);
    };

    const fetchLessons = async () => {
      const baseRaw = process.env.NEXT_PUBLIC_API_URL || "";
      const base = baseRaw.replace(/\/$/, "");
      const urlsToTry = [];
      
      if (base) {
        urlsToTry.push(`${base}/lessons/course/${courseId}`);
        urlsToTry.push(`${base}/api/lessons/course/${courseId}`);
      }
      urlsToTry.push(`/api/lessons/course/${courseId}`);
      urlsToTry.push(`http://localhost:5000/api/lessons/course/${courseId}`);

      for (const url of urlsToTry) {
        try {
          console.debug("[CourseLessons] GET ->", url);
          const response = await fetch(url);
          if (!response.ok) {
            console.warn("[CourseLessons] tentativa falhou:", url, response.status);
            continue;
          }
          const data = await response.json();
          const lessonsList = Array.isArray(data) ? data : (data.lessons || []);
          setLessons(lessonsList);
          return;
        } catch (err) {
          console.warn("[CourseLessons] erro ao buscar em", url, err);
          continue;
        }
      }
    };

    if (courseId) {
      fetchCourseDetails();
      fetchLessons();
    }
  }, [courseId]);

  if (loading) {
    return (
      <>
        <HeaderStudent />
        <div className={styles.pageContainer}>
          <div className={styles.loading}>Carregando curso...</div>
        </div>
        <FooterStudent />
      </>
    );
  }

  if (error || !course) {
    return (
      <>
        <HeaderStudent />
        <div className={styles.pageContainer}>
          <div className={styles.errorContainer}>
            <h2>😕 {error || 'Curso não encontrado'}</h2>
            <Link href="/courses" className={styles.backButton}>
              ← Voltar para Cursos
            </Link>
          </div>
        </div>
        <FooterStudent />
      </>
    );
  }

  return (
    <>
      <HeaderStudent />
      <div className={styles.pageContainer}>
        <div className={styles.header}>
        <Link href="/courses" className={styles.backLink}>
          ← Voltar para Cursos
        </Link>
      </div>

      <div className={styles.courseHeader}>
        <div className={styles.courseImageBox}>
          {course.photo ? (
            <img
              src={course.photo.startsWith('http') ? course.photo : `${backendUrl}/uploads/${course.photo}`}
              alt={course.title}
              className={styles.courseImage}
            />
          ) : (
            <div className={styles.imagePlaceholder}>📚</div>
          )}
        </div>
        
        <div className={styles.courseInfo}>
          <span className={styles.category}>{course.category}</span>
          <h1 className={styles.title}>{course.title}</h1>
          <p className={styles.description}>{course.description}</p>
          
          <div className={styles.courseStats}>
            <div className={styles.stat}>
              <span className={styles.statIcon}>📖</span>
              <span className={styles.statText}>{lessons.length} aulas</span>
            </div>
          </div>

          <button 
            className={styles.enrollButton}
            onClick={() => router.push(`/matricula?curso=${course.id}`)}
          >
            Matricular-se
          </button>
        </div>
      </div>

      <div className={styles.lessonsSection}>
        <h2 className={styles.lessonsTitle}>Conteúdo do Curso</h2>
        
        {lessons.length === 0 ? (
          <div className={styles.noLessons}>
            Nenhuma aula disponível ainda.
          </div>
        ) : (
          <div className={styles.lessonsList}>
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className={styles.lessonItem}>
                <div className={styles.lessonNumber}>{index + 1}</div>
                <div className={styles.lessonContent}>
                  <h3 className={styles.lessonTitle}>{lesson.title}</h3>
                  {lesson.description && (
                    <p className={styles.lessonDescription}>{lesson.description}</p>
                  )}
                </div>
                <div className={styles.lessonDuration}>
                  {lesson.duration || '10 min'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
      <FooterStudent />
    </>
  );
};

export default CourseDetailPage;
