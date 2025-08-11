'use client';

import { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [activeSection, setActiveSection] = useState('/');

  const menuItems = [
    { name: 'home', path: '/' },
    { name: 'sobre', path: '/' },
    { name: 'portfólio', path: '/' },
    { name: 'contato', path: '/' }
  ];

  const handleMenuClick = (path: string, name: string) => {
    setActiveSection(path);
    console.log(`Navegando para: ${name} - ${path}`);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h2>gabriel alves</h2>
        </div>
        
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {menuItems.map((item) => (
              <li key={item.name} className={styles.navItem}>
                <button
                  className={`${styles.navLink} ${activeSection === item.path ? styles.active : ''}`}
                  onClick={() => handleMenuClick(item.path, item.name)}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
