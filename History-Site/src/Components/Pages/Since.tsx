import { useEffect, useState } from 'react';
import type { HistoryData, HistoryEvent } from '../Types/History';
import EventCard from '../../Components/EventCard/EventCard';
import styles from './Since.module.scss';

function Since() {
  const [data, setData] = useState<HistoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [year, setYear] = useState<string>('');
  const [filteredEvents, setFilteredEvents] = useState<HistoryEvent[]>([]);
  const [filteredBirths, setFilteredBirths] = useState<HistoryEvent[]>([]);
  const [filteredDeaths, setFilteredDeaths] = useState<HistoryEvent[]>([]);
  
  // Lazy loading states
  const [visibleEventsCount, setVisibleEventsCount] = useState(10);
  const [visibleBirthsCount, setVisibleBirthsCount] = useState(10);
  const [visibleDeathsCount, setVisibleDeathsCount] = useState(10);

  useEffect(() => {
    // Send det valgte år til parent (App)
    if (year) {
      // Trigger en custom event så Header kan lytte
      window.dispatchEvent(new CustomEvent('sinceYearChange', { detail: year }));
    }
  }, [year]);

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

  useEffect(() => {
    if (!data || !year) {
      setFilteredEvents([]);
      setFilteredBirths([]);
      setFilteredDeaths([]);
      return;
    }

    const yearNum = parseInt(year);
    
    const events = data.data.Events.filter(event => parseInt(event.year) >= yearNum);
    const births = data.data.Births.filter(event => parseInt(event.year) >= yearNum);
    const deaths = data.data.Deaths.filter(event => parseInt(event.year) >= yearNum);
    
    setFilteredEvents(events);
    setFilteredBirths(births);
    setFilteredDeaths(deaths);
    
    setVisibleEventsCount(10);
    setVisibleBirthsCount(10);
    setVisibleDeathsCount(10);
  }, [year, data]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h1>Events Since Year</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="year" className={styles.label}>
            Select a year:
          </label>
          <input
            type="number"
            id="year"
            min="1"
            max={new Date().getFullYear()}
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="e.g., 1900"
            className={styles.input}
          />
        </div>
      </form>

      {year && (
        <>
          <div className={styles.summary}>
            Showing events from year <strong>{year}</strong> and onwards on this day ({data?.date})
          </div>

          {filteredEvents.length > 0 && (
            <section>
              <h2>Events ({filteredEvents.length})</h2>
              {filteredEvents.slice(0, visibleEventsCount).map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
              {visibleEventsCount < filteredEvents.length && (
                <p style={{ textAlign: 'center', color: 'var(--text-color)' }}>
                  Scroll for more...
                </p>
              )}
            </section>
          )}

          {filteredBirths.length > 0 && (
            <section>
              <h2>Births ({filteredBirths.length})</h2>
              {filteredBirths.slice(0, visibleBirthsCount).map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
              {visibleBirthsCount < filteredBirths.length && (
                <p style={{ textAlign: 'center', color: 'var(--text-color)' }}>
                  Scroll for more...
                </p>
              )}
            </section>
          )}

          {filteredDeaths.length > 0 && (
            <section>
              <h2>Deaths ({filteredDeaths.length})</h2>
              {filteredDeaths.slice(0, visibleDeathsCount).map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
              {visibleDeathsCount < filteredDeaths.length && (
                <p style={{ textAlign: 'center', color: 'var(--text-color)' }}>
                  Scroll for more...
                </p>
              )}
            </section>
          )}

          {filteredEvents.length === 0 && filteredBirths.length === 0 && filteredDeaths.length === 0 && (
            <p className={styles.noResults}>No events found from year {year} onwards on this day.</p>
          )}
        </>
      )}
    </div>
  );
}

export default Since;