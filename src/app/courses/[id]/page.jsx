'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './courses[id].module.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import HeaderStudent from '@/components/HeaderStudent/HeaderStudent';
import FooterStudent from '@/components/FooterStudent/FooterStudent';
import Image from 'next/image';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
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

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  return (
    <div className={styles.container}>
      <HeaderStudent />
      <div className={styles.content}>
        <div className={styles.buttons}>
          <Link href="/login" className={styles.button}>Login</Link>
          <Link href="/cadastro" className={styles.button1}>Cadastre-se</Link>
        </div>
        <div className={styles.backButtonTop}>
          <button
            className={styles.button2}
            onClick={() => router.push('/courses')}
          >
            <ArrowLeftOutlined style={{ fontSize: 18, marginRight: 8 }} /> Voltar para os Cursos
          </button>
        </div>
        {loading ? (
          <div className={styles.loading}>Carregando curso...</div>
        ) : error || !course ? (
          <div className={styles.error}>
            <h2>😕 {error || 'Curso não encontrado'}</h2>
          </div>
        ) : (
          <div className={styles.session}>
            <div className={styles.sessionImage}>
              <Image
                src={course.photo ? (course.photo.startsWith('http') ? course.photo : `${backendUrl}/uploads/${course.photo}`) : 'https://via.placeholder.com/300x180?text=Sem+Imagem'}
                alt={course.title || 'Imagem não encontrada'}
                className={styles.Image}
                width={300}
                height={180}
              />
            </div>
            <div className={styles.section}>
              <span className={styles.category}>{course.category}</span>
              <h1 className={styles.title}>{course.title}</h1>
              <p className={styles.description}>{course.description}</p>
              <button 
                className={styles.enrollButton}
                onClick={() => {
                  localStorage.setItem('matriculaCursoId', course.id);
                  router.push('/login');
                }}
              >
                Matricular-se
              </button>
            </div>
          </div>
        )}
      </div>
      <FooterStudent />
    </div>
  );
};
