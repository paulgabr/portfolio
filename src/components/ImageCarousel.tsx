'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ImageCarousel.module.css';

interface CarouselItem {
  image: string;
  title: string;
  description: string[];
}

interface ImageCarouselProps {
  items: CarouselItem[];
}

export default function ImageCarousel({ items }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTextTransitioning, setIsTextTransitioning] = useState(false);

  const changeSlide = (newIndex: number) => {
    if (newIndex === currentIndex || isTextTransitioning) return;
    
    setIsTextTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTimeout(() => {
        setIsTextTransitioning(false);
      }, 50);
    }, 250);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    changeSlide(newIndex);
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    changeSlide(newIndex);
  };

  const goToSlide = (index: number) => {
    changeSlide(index);
  };

  const currentItem = items[currentIndex];

  return (
    <div className={styles.carouselContainer}>
      {/* Text Content - Left Side */}
      <div className={styles.textContent}>
        <div className={`${styles.textAnimation} ${isTextTransitioning ? styles.textFadeOut : styles.textFadeIn}`}>
          <h2 className={styles.title}>{currentItem.title}</h2>
          {currentItem.description.map((paragraph, index) => (
            <p 
              key={index} 
              className={styles.description}
              style={{ 
                transitionDelay: isTextTransitioning ? '0ms' : `${index * 100}ms`
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
        
        {/* Carousel Controls - Below Text */}
        <div className={styles.controls}>
          <button 
            className={styles.controlBtn}
            onClick={prevSlide}
            aria-label="Imagem anterior"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
            </svg>
          </button>
          
          <div className={styles.indicators}>
            {items.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            className={styles.controlBtn}
            onClick={nextSlide}
            aria-label="Próxima imagem"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Image Content - Right Side */}
      <div className={styles.imageContent}>
        <div className={styles.imageWrapper}>
          <Image
            src={currentItem.image}
            alt={currentItem.title}
            width={450}
            height={400}
            className={styles.carouselImage}
            priority={currentIndex === 0}
          />
        </div>
      </div>
    </div>
  );
}
