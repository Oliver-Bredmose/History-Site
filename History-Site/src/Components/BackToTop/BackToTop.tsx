import { useEffect, useState } from 'react';
import styles from './BackToTop.module.scss';
import backToTopIcon from '../../assets/back-to-top.png';

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Vis knappen når brugeren har scrollet 300px ned
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`${styles.backToTop} ${isVisible ? styles.visible : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <img src={backToTopIcon} alt="Back to top" className={styles.icon} />
    </button>
  );
}

export default BackToTop;