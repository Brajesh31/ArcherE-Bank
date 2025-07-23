'use client';
import Image from "next/image";
import styles from '../css/visa.module.css'
import { useEffect, useState, useRef } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Visa() {
  const images = [
    "/visa_card/archer.png",
    "/visa_card/archer x.png",
    "/visa_card/eagle.png",
    "/visa_card/eagle x.png",
    "/visa_card/eagle vip.png"
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleClick = (section: number) => {
    setCurrentIndex(section);
  };

  return (
    <section className={styles.visa_sec} id="visa" ref={sectionRef}>
      <div className={styles.visa_sec_text}>
        <h2 className={inView ? styles.typing : ''}>Archer Bank Visa</h2>
        <p className={inView ? styles.letterFadeIn : ''}>{'Experience the convenience and security of Archer Bank Visa. Enjoy seamless transactions, exclusive offers, and 24/7 customer support.'.split('').map((char, i) => <span key={i}>{char}</span>)}</p>
      </div>

      <div className={styles.visa_card}>
        <div className={styles.visa_card_img}>
            <button onClick={handlePrev} aria-label="Previous">
              <i className="fas fa-chevron-left"></i>
            </button>
          <Image className={styles.img} src={images[currentIndex]} alt="archer" width={300} height={200} />
            <button onClick={handleNext} aria-label="Next">
            <i className="fas fa-chevron-right"></i>
            </button>
        </div>

        <div className={styles.foundation}>
          {images.map((_, idx) => (
            <div
              key={idx}
              onClick={() => handleClick(idx)}
              className={`${styles.foundation_item} ${currentIndex === idx ? styles.active : ''}`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Visa;
