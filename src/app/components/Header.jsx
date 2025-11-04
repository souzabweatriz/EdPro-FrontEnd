"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import styles from "../styles/Header.module.css"

export default function Header() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutside)
    return () => document.removeEventListener("mousedown", handleOutside)
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Image src="/images/image.png" alt="EdPro logo" width={64} height={64} className={styles.logo} />
          <div className={styles.brand}>
            <span className={styles.title}>EdPro</span>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Main navigation">
          <a href="#" className={styles.link}>Início</a>
          <a href="#" className={styles.link}>Cursos</a>
          <a href="#" className={styles.link}>Quem somos?</a>
          <a href="#" className={styles.link}>Player do Curso</a>
        </nav>

        <div ref={menuRef} style={{ position: "relative" }}>
          <button
            className={styles.menu}
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={styles.bars} />
          </button>

          {open && (
            <div className={styles.mobileMenu} role="menu">
              <a className={styles.mobileLink} href="/contato" role="menuitem">
                Contato
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
