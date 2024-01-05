'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {

    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={styles.container}>
            <Link href="/">
                <img src='Logo Negro.png' alt="logo" className={styles.image} />
            </Link>
            <div className={styles.hamburger} onClick={toggleMenu}>
                ☰
            </div>

            <div className={`${styles.list} ${isMenuOpen ? styles.active : ''}`}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link href="/nuestros-servicios">Nuestros Servicios</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/proyectos">Proyectos</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/sobre-mi">Sobre Mí</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/contacto">Contacto</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
