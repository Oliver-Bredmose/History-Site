import { Link } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.scss';
import headerImage from '../../assets/History-image.avif';

function Header() {
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
            <h1 className={styles.title}>ON THIS DAY</h1>
            <p className={styles.subtitle}>
              What happened on this day - historical events,<br />
              deaths and births throughout time
            </p>
          </div>
        </div>
      </div>
      
      <div className={styles.navContainer}>
        <Link to="/by-date" className={styles.navLink}>BY DATE</Link>
        <Link to="/" className={styles.navLink}>TODAY</Link>
        <Link to="/since" className={styles.navLink}>SINCE</Link>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;