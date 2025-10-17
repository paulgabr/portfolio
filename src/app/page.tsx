'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import SideNavigation from '@/components/SideNavigation';
import ImageCarousel from '@/components/ImageCarousel';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolling, setIsScrolling] = useState(false);

  // Helper function to get the correct image path
  const getImagePath = (imageName: string) => {
    return `/${imageName}`;
  };

  const carouselItems = [
    {
      image: getImagePath('foto-1.jpg'),
      title: 'Minha Jornada',
      description: [
        'Sou um desenvolvedor apaixonado por criar soluções inovadoras e funcionais. Com experiência em diversas tecnologias, busco sempre aprender e me aprimorar para entregar os melhores resultados.',
        'Minha jornada na programação começou há alguns anos e desde então tenho me dedicado a desenvolver projetos que fazem a diferença na vida das pessoas.'
      ]
    },
    {
      image: getImagePath('foto-2.jpg'),
      title: 'Minhas Habilidades',
      description: [
        'Trabalho com tecnologias modernas como React, Next.js, TypeScript e Node.js. Tenho experiência em desenvolvimento frontend e backend, criando aplicações completas.',
        'Estou sempre em busca de novos desafios e oportunidades para crescer profissionalmente, participando de projetos que me permitem expandir meus conhecimentos.'
      ]
    },
    {
      image: getImagePath('foto-3.jpg'),
      title: 'Meus Objetivos',
      description: [
        'Meu objetivo é contribuir para projetos impactantes, trabalhando em equipe e ajudando a criar soluções que realmente importam para as pessoas.',
        'Busco constantemente me atualizar com as melhores práticas do mercado, sempre focado em entregar código limpo, eficiente e bem documentado.'
      ]
    }
  ];

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      if (isScrolling) return;
      
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        const sections = ['home', 'sobre', 'portfolio', 'contato'];
        const scrollY = window.scrollY;
        
        let closestSection = 'home';
        let minDistance = Infinity;
        
        sections.forEach((sectionId) => {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = scrollY + rect.top;
            const distance = Math.abs(scrollY - elementTop);
            
            if (distance < minDistance) {
              minDistance = distance;
              closestSection = sectionId;
            }
          }
        });
        
        const targetElement = document.getElementById(closestSection);
        if (targetElement) {
          const targetTop = targetElement.offsetTop;
          const tolerance = 50;
          
          if (Math.abs(scrollY - targetTop) > tolerance) {
            setIsScrolling(true);
            window.scrollTo({
              top: targetTop,
              behavior: 'smooth'
            });
            
            setTimeout(() => {
              setIsScrolling(false);
            }, 600);
          }
        }
        
        setActiveSection(closestSection);
      }, 50);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      const sections = ['home', 'sobre', 'portfolio', 'contato'];
      const currentIndex = sections.indexOf(activeSection);
      let targetIndex = currentIndex;

      if (e.deltaY > 0 && currentIndex < sections.length - 1) {
        targetIndex = currentIndex + 1;
      } else if (e.deltaY < 0 && currentIndex > 0) {
        targetIndex = currentIndex - 1;
      }

      if (targetIndex !== currentIndex) {
        e.preventDefault();
        
        setActiveSection(sections[targetIndex]);
        
        setIsScrolling(true);
        
        const targetElement = document.getElementById(sections[targetIndex]);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
          
          setTimeout(() => {
            setIsScrolling(false);
          }, 600);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, [activeSection, isScrolling]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    
    setIsScrolling(true);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        setIsScrolling(false);
      }, 600);
    }
  };

  return (
    <>
      <Header activeSection={activeSection} onNavigate={scrollToSection} />
      <SideNavigation activeSection={activeSection} onNavigate={scrollToSection} />
      
      <section id="home" className={`${styles.section} ${styles.homeSection}`}>
        <div className={`${styles.container} ${styles.homeLayout}`}>
          <div className={styles.textContent}>
            <p className={styles.greeting}>Fala galera,</p>
            <h1 className={styles.title}>
              SOU <br />
              PROGRAMADOR
            </h1>
            <p className={styles.subtitle}>
              Seja bem-vindo ao meu portfólio website
            </p>
            
            <button 
              className={styles.button}
              onClick={() => scrollToSection('sobre')}
            >
              Saiba mais
            </button>
            
            <div className={styles.socialLinks}>
              <a 
                href="https://github.com/paulgabr" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                title="GitHub"
              >
                <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              
              <a 
                href="https://linkedin.com/in/paulgab" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                title="LinkedIn"
              >
                <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              <a 
                href="https://instagram.com/paulgaab" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                title="Instagram"
              >
                <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className={styles.imageContainer}>
            <div className={styles.decorativeBackground}>
              <div className={styles.dotsGreen}>
                {Array.from({ length: 96 }, (_, i) => (
                  <div key={`green-${i}`} className={styles.dotGreen}></div>
                ))}
              </div>
              
              <div className={styles.dotsBlue}>
                {Array.from({ length: 96 }, (_, i) => (
                  <div key={`blue-${i}`} className={styles.dotBlue}></div>
                ))}
              </div>
              
              <svg className={styles.zigzagGreen} viewBox="0 0 100 60">
                <path 
                  d="M10 50 L30 30 L50 50 L70 30 L90 50" 
                  stroke="#ccf381" 
                  strokeWidth="2" 
                  fill="none"
                />
                <path 
                  d="M10 40 L30 20 L50 40 L70 20 L90 40" 
                  stroke="#ccf381" 
                  strokeWidth="2" 
                  fill="none"
                />
              </svg>
              
              <svg className={styles.zigzagBlue} viewBox="0 0 100 60">
                <path 
                  d="M10 10 L30 30 L50 10 L70 30 L90 10" 
                  stroke="#2c3e50" 
                  strokeWidth="2" 
                  fill="none"
                />
                <path 
                  d="M10 20 L30 40 L50 20 L70 40 L90 20" 
                  stroke="#2c3e50" 
                  strokeWidth="2" 
                  fill="none"
                />
              </svg>
            </div>
            
            <Image
              src={getImagePath('profile-gabriel.jpg')}
              alt="Gabriel - Desenvolvedor"
              width={400}
              height={400}
              className={styles.profileImage}
              priority
            />
          </div>
        </div>
      </section>

      <section id="sobre" className={`${styles.section} ${styles.sobreSection}`}>
        <div className={styles.container}>
          <div className={styles.sobreDecorative}>
            <div className={styles.floatingCircles}>
              <div className={styles.circleBlue}></div>
              <div className={styles.circleGreen}></div>
              <div className={styles.circlePurple}></div>
            </div>
            
            <div className={styles.triangleShape1}></div>
            <div className={styles.triangleCenter}></div>
          </div>
          
          <ImageCarousel items={carouselItems} />
        </div>
      </section>

      <section id="portfolio" className={`${styles.section} ${styles.portfolioSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Portfólio</h2>
            <p className={styles.sectionText}>
              Aqui você pode conferir alguns dos meus projetos mais recentes. 
              Cada projeto representa um desafio superado e um aprendizado conquistado.
            </p>
            <div className={styles.projectsGrid}>
              <div className={styles.projectCard}>
                <div className={styles.projectImage}>
                  <Image
                    src={getImagePath('julyboo.png')}
                    alt="JulyBoo - Site de Doces Artesanais"
                    width={300}
                    height={200}
                    className={styles.projectImg}
                  />
                </div>
                <div className={styles.projectContent}>
                  <h3>JulyBoo</h3>
                  <p>Site institucional para loja de doces artesanais. Desenvolvido com HTML, CSS e JavaScript, apresenta produtos, sobre a empreendedora e canal de contato via WhatsApp.</p>
                  <div className={styles.projectLinks}>
                    <a 
                      href="https://paulgabr.github.io/julyboo" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      Ver Projeto
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.projectCard}>
                <div className={styles.projectImage}>
                  <Image
                    src={getImagePath('calculadora.png')}
                    alt="Calculadora - Projeto Vue.js"
                    width={300}
                    height={200}
                    className={styles.projectImg}
                  />
                </div>
                <div className={styles.projectContent}>
                  <h3>Calculadora</h3>
                  <p>Calculadora funcional desenvolvida com Vue.js e CSS. Interface moderna e responsiva com operações matemáticas básicas, design intuitivo e experiência de usuário otimizada.</p>
                  <div className={styles.projectLinks}>
                    <a 
                      href="https://paulgabr.github.io/calculator" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      Ver Projeto
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className={`${styles.section} ${styles.contatoSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Contato</h2>
            <p className={styles.sectionText}>
              Vamos conversar? Entre em contato comigo através dos canais abaixo 
              ou envie uma mensagem diretamente.
            </p>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <strong>Email:</strong> <Link href="mailto:rebelo.alves@hotmail.com">rebelo.alves@hotmail.com</Link>
              </div>
              <div className={styles.contactItem}>
                <strong>Telefone:</strong> <Link href="tel:+5592992233300">(92) 99223-3300</Link>
              </div>
              <div className={styles.contactItem}>
                <strong>LinkedIn:</strong> <Link href="https://linkedin.com/in/paulgab" target="_blank" rel="noopener noreferrer">/in/paulgab</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
