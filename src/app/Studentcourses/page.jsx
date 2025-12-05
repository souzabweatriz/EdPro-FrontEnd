'use client';

import React, { useState, useEffect } from 'react';
import styles from './Studentcourses.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const StudentCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortedCourses, setSortedCourses] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);
  const router = useRouter();

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // ...existing code...
  useEffect(() => {
    // leitura segura do localStorage (apenas no cliente) — NÃO redireciona
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('studentInfo');
        if (raw) {
          setStudentInfo(JSON.parse(raw));
        }
      } catch (err) {
        console.error('Erro ao ler studentInfo do localStorage:', err);
      }
    }

    const fetchCourses = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/courses`);
        if (!response.ok) {
          throw new Error('Erro ao buscar cursos');
        }
        const data = await response.json();
        setCourses(data);
        setSortedCourses(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, [backendUrl, router]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );
    setSortedCourses(filteredCourses);
  };

  const handleSortByLastAccess = () => {
    const sorted = [...sortedCourses].sort(
      (a, b) => new Date(b.lastAccess) - new Date(a.lastAccess)
    );
    setSortedCourses(sorted);
  };

  const handleCompleteCourse = (courseId) => {
    const updatedCourses = courses.map((course) =>
      course.id === courseId
        ? { ...course, completed: true, lastAccess: new Date().toISOString() }
        : course
    );

    setCourses(updatedCourses);
    setSortedCourses(updatedCourses);

    const totalCourses = updatedCourses.length;
    const completedCourses = updatedCourses.filter((course) => course.completed).length;
    const completedPercentage = Math.round((completedCourses / totalCourses) * 100);
    const pendingPercentage = 100 - completedPercentage;

    setStudentInfo((prevInfo) => ({
      ...prevInfo,
      completedTasks: completedPercentage,
      pendingTasks: pendingPercentage,
    }));
  };

  return (
    <div className={styles.pageContainer}>
      {studentInfo && (
        <div className={styles.topPanel}>
          <div className={styles.userInfoBox}>
            <div className={styles.userInfoAvatar}>
              <img
                src={studentInfo.avatar || '/images/user.jpg'}
                alt={studentInfo.name}
                width={56}
                height={56}
                className={styles.avatarImg}
              />
            </div>
            <div className={styles.userInfoDetails}>
              <div className={styles.userName}>Olá, {studentInfo.name}</div>
              <div className={styles.userCourse}>
                Matriculado no curso de:{' '}
                <span className={styles.courseLink}>{studentInfo.course}</span>
              </div>
              <div className={styles.buttonRow}>
                <Link href="/courses" className={styles.topButton}>
                  Confira seus cursos
                </Link>
                <Link href="/matricula" className={styles.topButton}>
                  Matricule-se
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.taskSummary}>
            <div className={styles.taskTitle}>Resumo de Tarefas</div>
            <div className={styles.taskRow}>
              <span>Concluídas:</span>
              <span className={styles.taskBar}>
                <span
                  className={styles.taskBarGreen}
                  style={{ width: `${studentInfo.completedTasks}%` }}
                ></span>
              </span>
              <span className={styles.taskPercent}>{studentInfo.completedTasks}%</span>
            </div>
            <div className={styles.taskRow}>
              <span>Pendentes:</span>
              <span className={styles.taskBar}>
                <span
                  className={styles.taskBarRed}
                  style={{ width: `${studentInfo.pendingTasks}%` }}
                ></span>
              </span>
              <span className={styles.taskPercent}>{studentInfo.pendingTasks}%</span>
            </div>
          </div>
        </div>
      )}

      <h2 className={styles.title}>Meus Cursos</h2>
      <div className={styles.filtersContainer}>
        <button className={styles.filterBtn} onClick={() => setSortedCourses(courses)}>
          Todos
        </button>
        <input
          className={styles.searchInput}
          placeholder="Buscar"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button className={styles.orderBtn} onClick={handleSortByLastAccess}>
          Ordenar por último acesso
        </button>
      </div>
      <div className={styles.coursesGrid}>
        {loading ? (
          <div className={styles.loading}>Carregando cursos...</div>
        ) : (
          sortedCourses.map((course) => (
            <Link
              href={`/student/courses/${course.id}`}
              key={course.id}
              className={styles.courseCard}
              style={{ textDecoration: "none", color: "inherit" }}
            >
            <div className={styles.cardImageBox}>
              {course.image ? (
                <img
                src={`${backendUrl}/uploads/${course.image}`}
                alt={course.title}
                className={styles.cardImage}
                />
            ) : (
        <div className={styles.cardImagePlaceholder}>FOTO AQUI</div>
        )}
    </div>

    <div className={styles.cardBody}>
      <h3 className={styles.cardTitle}>{course.title}</h3>
      <p className={styles.cardDesc}>
        {course.description.length > 100
          ? course.description.slice(0, 100) + "..."
          : course.description}
      </p>

      {!course.completed && (
        <button
          className={styles.completeButton}
          onClick={(e) => {
            e.preventDefault(); 
            handleCompleteCourse(course.id);
          }}
        >
          Marcar como concluído
        </button>
      )}
    </div>
        </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentCoursesPage;