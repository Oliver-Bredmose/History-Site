import { useEffect, useState } from 'react';
import type { HistoryData, } from '../../Components/Types/History';
import EventCard from '../EventCard/EventCard';

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div>
      <h1>Today in History - {data.date}</h1>
      
      <section>
        <h2>Events ({data.data.Events.length})</h2>
        {data.data.Events.slice(0, visibleEventsCount).map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
        {visibleEventsCount < data.data.Events.length && (
          <p style={{ textAlign: 'center', color: 'var(--text-color)' }}>
            Scroll for more...
          </p>
        )}
      </section>

      <section>
        <h2>Births ({data.data.Births.length})</h2>
        {data.data.Births.slice(0, visibleBirthsCount).map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
        {visibleBirthsCount < data.data.Births.length && (
          <p style={{ textAlign: 'center', color: 'var(--text-color)' }}>
            Scroll for more...
          </p>
        )}
      </section>

      <section>
        <h2>Deaths ({data.data.Deaths.length})</h2>
        {data.data.Deaths.slice(0, visibleDeathsCount).map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
        {visibleDeathsCount < data.data.Deaths.length && (
          <p style={{ textAlign: 'center', color: 'var(--text-color)' }}>
            Scroll for more...
          </p>
        )}
      </section>
    </div>
  );
}

export default Today;