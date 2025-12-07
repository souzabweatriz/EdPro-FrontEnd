'use client';

import React, { useState, useEffect } from 'react';
import styles from './courses.module.css';
import Link from 'next/link';
import HeaderStudent from '@/components/HeaderStudent/HeaderStudent';
import FooterStudent from '@/components/FooterStudent/FooterStudent';
import Image from 'next/image';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchCourses = async () => {
      const baseRaw = process.env.NEXT_PUBLIC_API_URL || "";
      const base = baseRaw.replace(/\/$/, "");
      const urlsToTry = [];

      if (base) {
        urlsToTry.push(`${base}/courses`);
        urlsToTry.push(`${base}/api/courses`);
      }
      urlsToTry.push("/api/courses");
      urlsToTry.push("/courses");
      urlsToTry.push("http://localhost:5000/api/courses");
      urlsToTry.push("http://localhost:5000/courses");

      for (const url of urlsToTry) {
        try {
          console.debug("[Courses] GET ->", url);
          const response = await fetch(url);
          if (!response.ok) {
            console.warn("[Courses] tentativa falhou:", url, response.status);
            continue;
          }
          const data = await response.json();
          const coursesList = Array.isArray(data) ? data : (data.courses || []);
          setCourses(coursesList);
          setFilteredCourses(coursesList);
          setLoading(false);
          return;
        } catch (error) {
          console.warn("[Courses] erro ao buscar em", url, error);
          continue;
        }
      }

      console.error('[Courses] Falha ao buscar cursos de todas as URLs');
      setLoading(false);
    };

    fetchCourses();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase()) ||
      course.category?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const handleFilterByCategory = (category) => {
    if (!category) {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter((course) =>
        course.category?.toLowerCase() === category.toLowerCase()
      );
      setFilteredCourses(filtered);
    }
  };

  const categories = [...new Set(courses.map(course => course.category).filter(Boolean))];

  return (
    <div className={styles.container}>
      <HeaderStudent />
      <div className={styles.content}>
        <div className={styles.buttons}>
          <Link href="/login" className={styles.button}>Login</Link>
          <Link href="/cadastro" className={styles.button1}>Cadastre-se</Link>
        </div>
        <div className={styles.sessao2}>
          <h1 className={styles.title}>Capacite-se com a EdPro</h1>
          <h2 className={styles.subtitle}>Cursos para seu desenvolvimento</h2>
          <p className={styles.description}>Acesse nossos cursos exclusivos.</p>
        </div>
      </div>

      <div className={styles.filtersContainer}>
        <button
          className={styles.filterBtn}
          onClick={() => setFilteredCourses(courses)}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={styles.filterBtn}
            onClick={() => handleFilterByCategory(category)}
          >
            {category}
          </button>
        ))}
        <input
          className={styles.searchInput}
          placeholder="Buscar cursos..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className={styles.courses}>
        {loading ? (
          <div className={styles.loading}>Carregando cursos...</div>
        ) : filteredCourses.length === 0 ? (
          <div className={styles.noCourses}>Nenhum curso encontrado.</div>
        ) : (
          filteredCourses.map((course) => (
            <Link
              href={`/courses/${course.id}`}
              key={course.id}
              className={styles.card}
            >
              <div className={styles.cadImage}>
                {course.photo ? (
                  <Image
                    src={course.photo.startsWith('http') ? course.photo : `${backendUrl}/uploads/${course.photo}`}
                    alt={course.title}
                    className={styles.cardImage}
                    width={300}
                    height={180}
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className={styles.cardImagePlaceholder}>📚</div>
                )}
              </div>

              <div className={styles.cards}>
                <span className={styles.cardCategory}>{course.category}</span>
                <h3 className={styles.cardtitle}>{course.title}</h3>
                <button className={styles.cardButton}>
                  Ver Curso
                </button>
              </div>
            </Link>
          ))
        )}
      </div>

      <FooterStudent />
    </div>
  );
}
