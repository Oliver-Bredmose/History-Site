import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.scss';
import headerImage from '../../assets/History-image.avif';

interface HeaderProps {
  onByDateChange?: (date: string) => void;
}

function Header({ onByDateChange }: HeaderProps) {
  const location = useLocation();
  const [byDate, setByDate] = useState<string>('12/02');
  const [isEditingDate, setIsEditingDate] = useState(false);
  
  // Nulstil når du forlader siderne
  useEffect(() => {
    if (location.pathname !== '/by-date') {
      setByDate('12/02');
      setIsEditingDate(false);
    }
  }, [location.pathname]);
  
  const isTodayPage = location.pathname === '/';
  const isByDatePage = location.pathname === '/by-date';
  const isSincePage = location.pathname === '/since';

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setByDate(newDate);
    if (onByDateChange) {
      onByDateChange(newDate);
    }
    
    // Dispatch event så ByDate kan lytte
    window.dispatchEvent(new CustomEvent('headerDateChange', { detail: newDate }));
  };

  const handleDateClick = () => {
    if (isByDatePage) {
      setIsEditingDate(true);
    }
  };

  const handleDateBlur = () => {
    setIsEditingDate(false);
    if (!byDate) {
      setByDate('12/02');
    }
  };

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
                <h1 className={styles.title}>
                  BY DATE:{' '}
                  {isEditingDate ? (
                    <input
                      type="text"
                      value={byDate}
                      onChange={handleDateChange}
                      onBlur={handleDateBlur}
                      autoFocus
                      placeholder="DD/MM"
                      maxLength={5}
                      className={styles.dateInput}
                    />
                  ) : (
                    <span 
                      className={styles.yearUnderline}
                      onClick={handleDateClick}
                    >
                      {byDate}
                    </span>
                  )}
                </h1>
                <p className={styles.subtitle}>
                  What happened on this day - Here you can enter<br />
                  a specific date to get only events for that date
                </p>
              </>
            )}
            
            {isSincePage && (
              <>
                <h1 className={styles.title}>
                  SINCE:{' '}
                  {isEditingYear ? (
                    <input
                      type="number"
                      value={sinceYear}
                      onChange={handleYearChange}
                      onBlur={handleYearBlur}
                      autoFocus
                      min="1"
                      max={new Date().getFullYear()}
                      className={styles.yearInput}
                    />
                  ) : (
                    <span 
                      className={styles.yearUnderline}
                      onClick={handleYearClick}
                    >
                      {sinceYear}
                    </span>
                  )}
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