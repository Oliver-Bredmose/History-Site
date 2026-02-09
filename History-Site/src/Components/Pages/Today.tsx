import { useEffect, useState } from 'react';
import type { HistoryData } from '../Types/History';

function Today() {
  const [data, setData] = useState<HistoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data når komponenten loader
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
      <h2>Events</h2>
      {/* Vi viser kun de første 10 events for nu */}
      {data.data.Events.slice(0, 10).map((event, index) => (
        <div key={index}>
          <strong>{event.year}</strong>: {event.text}
        </div>
      ))}
    </div>
  );
}

export default Today;