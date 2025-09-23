'use client';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

import styles from './Header.module.css';

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const menuItems = [
    { name: 'home', id: 'home' },
    { name: 'sobre', id: 'sobre' },
    { name: 'portfólio', id: 'portfolio' },
    { name: 'contato', id: 'contato' }
  ];

  const handleMenuClick = (sectionId: string) => {
    onNavigate(sectionId);
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
              <li key={item.id} className={styles.navItem}>
                <button
                  className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
                  onClick={() => handleMenuClick(item.id)}
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
