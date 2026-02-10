import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.scss';
import headerImage from '../../assets/History-image.avif';

function Header() {
  const location = useLocation();
  const [sinceYear, setSinceYear] = useState<string>('1947');
  
  // Nulstil år når du forlader Since siden
  useEffect(() => {
    if (location.pathname !== '/since') {
      setSinceYear('1947');
    }
  }, [location.pathname]);
  
  // Lyt til år ændringer fra Since siden
  useEffect(() => {
    const handleYearChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setSinceYear(customEvent.detail);
    };
    
    window.addEventListener('sinceYearChange', handleYearChange);
    
    return () => {
      window.removeEventListener('sinceYearChange', handleYearChange);
    };
  }, []);
  
  const isTodayPage = location.pathname === '/';
  const isByDatePage = location.pathname === '/by-date';
  const isSincePage = location.pathname === '/since';

  return (
    <header className={styles.header}>
      <div className={styles.imageContainer}>
        <img src={headerImage} alt="Historical documents" className={styles.headerImage} />
        <div className={styles.overlay}>
          <div className={styles.card}>
            <div className={styles.cardCorner}></div>
            <div className={styles.cardCorner}></div>
            <div className={styles.cardCorner}></div>
            <div className={styles.cardCorner}></div>
            
            {isTodayPage && (
              <>
                <h1 className={styles.title}>ON THIS DAY</h1>
                <p className={styles.subtitle}>
                  What happened on this day - historical events,<br />
                  deaths and births throughout time
                </p>
              </>
            )}
            
            {isByDatePage && (
              <>
                <h1 className={styles.title}>BY DATE</h1>
                <p className={styles.subtitle}>
                  What happened on this day - Here you can enter<br />
                  a specific date to get only events for that date
                </p>
              </>
            )}
            
            {isSincePage && (
              <>
                <h1 className={styles.title}>
                  SINCE: <span className={styles.yearUnderline}>{sinceYear}</span>
                </h1>
                <p className={styles.subtitle}>
                  What happened on this day - Here you can enter<br />
                  a specific year to get only events for that year
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className={styles.navContainer}>
        <Link 
          to="/by-date" 
          className={`${styles.navLink} ${isByDatePage ? styles.active : ''}`}
        >
          BY DATE
        </Link>
        <Link 
          to="/" 
          className={`${styles.navLink} ${isTodayPage ? styles.active : ''}`}
        >
          TODAY
        </Link>
        <Link 
          to="/since" 
          className={`${styles.navLink} ${isSincePage ? styles.active : ''}`}
        >
          SINCE
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;