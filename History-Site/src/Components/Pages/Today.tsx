import { useEffect, useState } from 'react';
import type { HistoryData } from '../Types/History';
import EventCard from '../EventCard/EventCard';

function Today() {
  const [data, setData] = useState<HistoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div>
      <h1>Today in History - {data.date}</h1>
      
      <section>
        <h2>Events</h2>
        {data.data.Events.slice(0, 10).map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </section>

      <section>
        <h2>Births</h2>
        {data.data.Births.slice(0, 10).map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </section>

      <section>
        <h2>Deaths</h2>
        {data.data.Deaths.slice(0, 10).map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </section>
    </div>
  );
}

export default Today;