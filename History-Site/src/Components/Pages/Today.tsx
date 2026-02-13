import { useEffect, useState } from 'react';
import type { HistoryData, } from '../../Components/Types/History';
import EventCard from '../EventCard/EventCard';
import styles from './Today.module.scss';

function Today() {
  const [data, setData] = useState<HistoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State til lazy loading
  const [visibleEventsCount, setVisibleEventsCount] = useState(10);
  const [visibleBirthsCount, setVisibleBirthsCount] = useState(10);
  const [visibleDeathsCount, setVisibleDeathsCount] = useState(10);

  useEffect(() => {
    fetch('https://history.muffinlabs.com/date')
      .then(response => response.json())
      .then((data: HistoryData) => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Lyt til scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Tjek om brugeren er nået til bunden
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollTop + windowHeight >= documentHeight - 100) {
        // Loader 10 af hver kategori
        setVisibleEventsCount(prev => prev + 5);
        setVisibleBirthsCount(prev => prev + 5);
        setVisibleDeathsCount(prev => prev + 5);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return <div className={styles.loadingMessage}>Loading...</div>;
  if (error) return <div className={styles.errorMessage}>Error: {error}</div>;
  if (!data) return <div className={styles.emptyMessage}>No data</div>;

  return (
    <div>
      <h1>Today in History - {data.date}</h1>
      
      <section>
        <h2>Events ({data.data.Events.length})</h2>
       <div className={styles.timeline}>

        {data.data.Events.slice(0, visibleEventsCount).map((event, index) => (
          <EventCard 
            key={index} 
            event={event}
            position={index % 2 === 0 ? 'left' : 'right'}  
          />
        ))}
       </div>
        {visibleEventsCount < data.data.Events.length && (
          <p style={{ textAlign: 'center', color: 'var(--text-color)' }}>
            Scroll for more...
          </p>
        )}
      </section>

    </div>
  );
}

export default Today;