'use client';

import React, { useState, useEffect } from 'react';
import styles from './courses.module.css';
import Link from 'next/link';
import HeaderStudent from '@/components/HeaderStudent/HeaderStudent';
import FooterStudent from '@/components/FooterStudent/FooterStudent';

const CoursesPage = () => {
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

  // Pegar categorias únicas
  const categories = [...new Set(courses.map(course => course.category).filter(Boolean))];

  return (
    <>
      <HeaderStudent />
      <div className={styles.pageContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Todos os Cursos</h1>
          <p className={styles.subtitle}>Explore nossa biblioteca completa de cursos</p>
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

      <div className={styles.coursesGrid}>
        {loading ? (
          <div className={styles.loading}>Carregando cursos...</div>
        ) : filteredCourses.length === 0 ? (
          <div className={styles.noCourses}>Nenhum curso encontrado.</div>
        ) : (
          filteredCourses.map((course) => (
            <Link
              href={`/courses/${course.id}`}
              key={course.id}
              className={styles.courseCard}
            >
              <div className={styles.cardImageBox}>
                {course.photo ? (
                  <img
                    src={course.photo.startsWith('http') ? course.photo : `${backendUrl}/uploads/${course.photo}`}
                    alt={course.title}
                    className={styles.cardImage}
                  />
                ) : (
                  <div className={styles.cardImagePlaceholder}>📚</div>
                )}
              </div>

              <div className={styles.cardBody}>
                <span className={styles.cardCategory}>{course.category}</span>
                <h3 className={styles.cardTitle}>{course.title}</h3>
                <p className={styles.cardDesc}>
                  {course.description && course.description.length > 100
                    ? course.description.slice(0, 100) + "..."
                    : course.description}
                </p>
                <button className={styles.viewButton}>
                  Ver Curso
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
      </div>
      <FooterStudent />
    </>
  );
};

export default CoursesPage;
