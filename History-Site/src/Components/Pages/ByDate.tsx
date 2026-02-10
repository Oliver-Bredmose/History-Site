import { useEffect, useState } from 'react';
import type { HistoryData } from '../../Components/Types/History';
import EventCard from '../EventCard/EventCard';
import styles from './ByDate.module.scss';

function ByDate() {
  const [selectedDate, setSelectedDate] = useState('');
  const [data, setData] = useState<HistoryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleEventsCount, setVisibleEventsCount] = useState(10);
  const [visibleBirthsCount, setVisibleBirthsCount] = useState(10);
  const [visibleDeathsCount, setVisibleDeathsCount] = useState(10);

  useEffect(() => {
    if (!selectedDate) return;
    
    setLoading(true);
    
    // Konverter 2025-01-15 til 01/15
    const parts = selectedDate.split('-');
    const formattedDate = `${parts[1]}/${parts[2]}`;
    
    // Fetch fra API med den formaterede dato
    fetch(`https://history.muffinlabs.com/date/${formattedDate}`)
      .then(response => response.json())
      .then((data: HistoryData) => {
        setData(data);
        setLoading(false);
        // Reset lazy loading counts når ny dato vælges
        setVisibleEventsCount(1);
        setVisibleBirthsCount(1);
        setVisibleDeathsCount(1);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [selectedDate]);

  // Scroll listener for lazy loading
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollTop + windowHeight >= documentHeight - 100) {
        setVisibleEventsCount(prev => prev + 5);
        setVisibleBirthsCount(prev => prev + 5);
        setVisibleDeathsCount(prev => prev + 5);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div>
      <h1>By Date</h1>
      <input type="date" onChange={handleDateChange} />
      
      {loading && <div className={styles.loadingMessage}>Loading...</div>}
      {error && <div className={styles.errorMessage}>Error: {error}</div>}
      
      {data && (
        <>
          <section>
            <h2>Events ({data.data.Events.length})</h2>
            <div className={styles.timelineContainer}>
              {data.data.Events.slice(0, visibleEventsCount).map((event, index) => (
                <EventCard key={index} event={event} position={index % 2 === 0 ? 'left' : 'right'} />
              ))}
            </div>
            {visibleEventsCount < data.data.Events.length && (
              <p className={styles.scrollIndicator}>
                Scroll for more...
              </p>
            )}
          </section>

          <section>
            <h2>Births ({data.data.Births.length})</h2>
            <div className={styles.timelineContainer}>
              {data.data.Births.slice(0, visibleBirthsCount).map((event, index) => (
                <EventCard key={index} event={event} position={index % 2 === 0 ? 'left' : 'right'} />
              ))}
            </div>
            {visibleBirthsCount < data.data.Births.length && (
              <p className={styles.scrollIndicator}>
                Scroll for more...
              </p>
            )}
          </section>

          <section>
            <h2>Deaths ({data.data.Deaths.length})</h2>
            <div className={styles.timelineContainer}>
              {data.data.Deaths.slice(0, visibleDeathsCount).map((event, index) => (
                <EventCard key={index} event={event} position={index % 2 === 0 ? 'left' : 'right'} />
              ))}
            </div>
            {visibleDeathsCount < data.data.Deaths.length && (
              <p className={styles.scrollIndicator}>
                Scroll for more...
              </p>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default ByDate;