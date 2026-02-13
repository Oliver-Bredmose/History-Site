import { useEffect, useState } from 'react';
import type { HistoryData } from '../Types/History';
import EventCard from '../EventCard/EventCard';
import styles from './ByDate.module.scss';

interface ByDateProps {
  onDateChange?: (date: string) => void;
}

function ByDate({ onDateChange }: ByDateProps) {
  const [data, setData] = useState<HistoryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  
  // Lazy loading states
  const [visibleEventsCount, setVisibleEventsCount] = useState(10);
  const [visibleBirthsCount, setVisibleBirthsCount] = useState(10);
  const [visibleDeathsCount, setVisibleDeathsCount] = useState(10);

  const fetchDataForDate = (dateString: string) => {
    if (!dateString) return;
    
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // Send datoen til Header (dd/mm format)
    if (onDateChange) {
      const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}`;
      onDateChange(formattedDate);
    }
    
    setLoading(true);
    setError(null);
    
    fetch(`https://history.muffinlabs.com/date/${month}/${day}`)
      .then(response => response.json())
      .then((data: HistoryData) => {
        setData(data);
        setLoading(false);
        setVisibleEventsCount(10);
        setVisibleBirthsCount(10);
        setVisibleDeathsCount(10);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  const fetchDataFromDayMonth = (day: number, month: number) => {
    setLoading(true);
    setError(null);
    
    fetch(`https://history.muffinlabs.com/date/${month}/${day}`)
      .then(response => response.json())
      .then((data: HistoryData) => {
        setData(data);
        setLoading(false);
        setVisibleEventsCount(10);
        setVisibleBirthsCount(10);
        setVisibleDeathsCount(10);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  // Lyt til ændringer fra Header komponenten
  useEffect(() => {
    const handleHeaderDateChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      const dateStr = customEvent.detail; // Format: "dd/mm"
      const [day, month] = dateStr.split('/').map(Number);
      
      if (day && month && day >= 1 && day <= 31 && month >= 1 && month <= 12) {
        fetchDataFromDayMonth(day, month);
      }
    };
    
    window.addEventListener('headerDateChange', handleHeaderDateChange);
    
    return () => {
      window.removeEventListener('headerDateChange', handleHeaderDateChange);
    };
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchDataForDate(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollTop + windowHeight >= documentHeight - 100) {
        setVisibleEventsCount(prev => prev + 10);
        setVisibleBirthsCount(prev => prev + 10);
        setVisibleDeathsCount(prev => prev + 10);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.container}>
      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>Error: {error}</div>}

      {data && !loading && (
        <>
          <div className={styles.summary}>
            Showing events for <strong>{data.date}</strong>
          </div>

          {data.data.Events.length > 0 && (
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
          )}
        </>
      )}
    </div>
  );
}

export default ByDate;