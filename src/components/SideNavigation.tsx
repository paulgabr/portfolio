'use client';

interface SideNavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

import styles from './SideNavigation.module.css';

export default function SideNavigation({ activeSection, onNavigate }: SideNavigationProps) {
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'portfolio', label: 'Portfólio' },
    { id: 'contato', label: 'Contato' }
  ];

  return (
    <nav className={styles.sideNav}>
      <div className={styles.navContainer}>
        {sections.map((section, index) => (
          <div key={section.id} className={styles.navItem}>
            <button
              className={`${styles.navDot} ${activeSection === section.id ? styles.active : ''}`}
              onClick={() => onNavigate(section.id)}
              title={section.label}
              aria-label={`Ir para ${section.label}`}
            >
              {activeSection === section.id ? (
                <div className={styles.activeSquare} />
              ) : (
                <div className={styles.inactiveDot} />
              )}
            </button>
            {index < sections.length - 1 && <div className={styles.connector} />}
          </div>
        ))}
      </div>
    </nav>
  );
}
