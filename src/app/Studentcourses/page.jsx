'use client';

import React, { useState, useEffect } from 'react';
import styles from './Studentcourses.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import FooterStudent from '@/components/FooterStudent/FooterStudent';
import HeaderStudent from '../../components/HeaderStudent/HeaderStudent'

const StudentCoursesPage = () => {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortedCourses, setSortedCourses] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);

  useEffect(() => {
    const updateStudentInfo = () => {
      try {
        const raw = localStorage.getItem('studentInfo');
        if (raw) {
          setStudentInfo(JSON.parse(raw));
        } else {
          setStudentInfo(null);
        }
      } catch {
        setStudentInfo(null);
      }
    };
    if (typeof window !== 'undefined') {
      updateStudentInfo();
      window.addEventListener('storage', updateStudentInfo);
      return () => window.removeEventListener('storage', updateStudentInfo);
    }
  }, []);
  const [fixedCompletedCourses, setFixedCompletedCourses] = useState([]);
  useEffect(() => {
    if (typeof window !== 'undefined' && studentInfo?.email) {
      try {
        const raw = localStorage.getItem(`fixedCompletedCourses_${studentInfo.email}`);
        if (raw) {
          setFixedCompletedCourses(JSON.parse(raw));
        } else {
          setFixedCompletedCourses([]);
        }
      } catch {
        setFixedCompletedCourses([]);
      }
    }
  }, [studentInfo?.email]);
  const [activeTab, setActiveTab] = useState('inProgress');
  const router = useRouter();

  useEffect(() => {
    if (activeTab === 'completed') {
      setSortedCourses(fixedCompletedCourses);
    } else {
      setSortedCourses(courses.filter(c => !c.completed));
    }
  }, [courses, activeTab, fixedCompletedCourses]);

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const enrolledCourseId = studentInfo?.courseId || null;

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
          const response = await fetch(url);
          if (!response.ok) {
            continue;
          }
          const data = await response.json();
          const coursesList = Array.isArray(data) ? data : (data.courses || []);

          if (enrolledCourseId) {
            const enrolledCourse = coursesList
              .filter(c => Number(c.id) === Number(enrolledCourseId))
              .map(c => ({ ...c, completed: c.completed || false }));
            setCourses(enrolledCourse);
            // Atualiza o nome do curso em studentInfo se não estiver
            if (enrolledCourse.length > 0 && (!studentInfo.course || studentInfo.course !== enrolledCourse[0].title)) {
              const updatedStudentInfo = { ...studentInfo, course: enrolledCourse[0].title };
              setStudentInfo(updatedStudentInfo);
              localStorage.setItem('studentInfo', JSON.stringify(updatedStudentInfo));
            }
          } else {
            setCourses([]);
          }
          setLoading(false);
          return;
        } catch (error) {
        }
      }
      setLoading(false);
    };

    fetchCourses();
  }, [studentInfo?.courseId]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    let baseFiltered = [];
    if (activeTab === 'completed') {
      baseFiltered = fixedCompletedCourses;
    } else {
      baseFiltered = courses.filter(c => !c.completed);
    }
    const filteredCourses = baseFiltered.filter((course) =>
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

    const completedCourse = updatedCourses.find(c => c.id === courseId && c.completed);
    const email = studentInfo?.email;
    if (completedCourse && email) {
      setFixedCompletedCourses(prev => {
        const alreadyIn = prev.some(c => Number(c.id) === Number(courseId));
        if (!alreadyIn) {
          const newArr = [...prev, completedCourse];
          localStorage.setItem(`fixedCompletedCourses_${email}`, JSON.stringify(newArr));
          return newArr;
        }
        return prev;
      });
    }

    const totalCourses = updatedCourses.length;
    const completedCourses = updatedCourses.filter((course) => course.completed).length;
    const pendingPercentage = 100 - Math.round((completedCourses / totalCourses) * 100);
    const completedPercentage = 100 - pendingPercentage;

    let newStudentInfo = {
      ...studentInfo,
      completedTasks: completedPercentage,
      pendingTasks: pendingPercentage,
    };
    if (completedCourse && studentInfo?.courseId && Number(studentInfo.courseId) === Number(courseId)) {
      newStudentInfo = {
        ...newStudentInfo,
        course: '',
        courseId: '',
      };
    }
    setStudentInfo(newStudentInfo);
    localStorage.setItem('studentInfo', JSON.stringify(newStudentInfo));
    setTimeout(() => {
      const raw = localStorage.getItem('studentInfo');
      if (raw) setStudentInfo(JSON.parse(raw));
    }, 0);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <HeaderStudent />
      <div className={styles.headerSpacer}></div>
      <div className={styles.pageContainer}>
        {studentInfo && (
          <div className={styles.topPanel}>
            <div className={styles.userInfoBox}>
              <div className={styles.userInfoAvatar}>
                <Image
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
                  {studentInfo && studentInfo.course && String(studentInfo.course).trim() ? (
                    <span className={styles.courseLink}>{studentInfo.course}</span>
                  ) : (
                    <span className={styles.courseLink} style={{ color: '#aaa' }}>Nenhum curso ativo</span>
                  )}
                </div>
                <div className={styles.buttonRow}>
                  <Link href="/courses" className={styles.topButton}>
                    Confira seus cursos
                  </Link>
                  <Link href="/matricula" className={styles.topButton}>
                    Matricule-se
                  </Link>
                  <button
                    className={styles.topButton}
                    style={{ background: '#e74c3c', color: '#fff', marginLeft: 8 }}
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        localStorage.removeItem('studentInfo');
                        setStudentInfo(null);
                        setCourses([]);
                        setSortedCourses([]);
                        router.push('/login');
                      }
                    }}
                  >
                    Sair
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={styles.tabsContainer}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'inProgress' ? styles.tabActive : ''}`}
            onClick={() => handleTabChange('inProgress')}
          >
            Meus Cursos
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'completed' ? styles.tabActive : ''}`}
            onClick={() => handleTabChange('completed')}
          >
            Cursos Concluídos
          </button>
        </div>

        <h2 className={styles.title}>
          {activeTab === 'inProgress' ? 'Meus Cursos' : 'Cursos Concluídos'}
        </h2>
        <div className={styles.filtersContainer}>
          <input
            className={styles.searchInput}
            placeholder="Buscar curso"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className={styles.coursesGrid}>
          {loading ? (
            <div className={styles.loading}>Carregando cursos...</div>
          ) : sortedCourses.length === 0 ? (
            <div className={styles.noCourses}>
              <p>{activeTab === 'inProgress' 
                ? 'Você não tem cursos em andamento.' 
                : 'Você ainda não concluiu nenhum curso.'}
              </p>
              {activeTab === 'inProgress' && (
                <Link href="/courses" className={styles.enrollLink}>
                  Ver cursos disponíveis
                </Link>
              )}
            </div>
          ) : (
            sortedCourses.map((course) => (
              <Link
                href={`/Studentcourses/${course.id}`}
                key={course.id}
                className={styles.courseCard}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className={styles.cardImageBox}>
                  {course.photo ? (
                    <Image
                      src={course.photo.startsWith('http') ? course.photo : `${backendUrl}/uploads/${course.photo}`}
                      alt={course.title}
                      width={300}
                      height={180}
                      className={styles.cardImage}
                    />
                  ) : (
                    <div className={styles.cardImagePlaceholder}>📚</div>
                  )}
                  {course.completed && (
                    <span className={styles.completedBadgeTop}>
                      &#10003; Concluído
                    </span>
                  )}
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{course.title}</h3>
                  <p className={styles.cardDesc}>
                    {course.description && course.description.length > 100
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
      <FooterStudent />
    </>
  );
};

export default StudentCoursesPage;