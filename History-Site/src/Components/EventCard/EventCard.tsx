import type { HistoryEvent } from '../../Components/Types/History';
import styles from './EventCard.module.scss';

interface EventCardProps {
  event: HistoryEvent;
}

function EventCard({ event }: EventCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.year}>{event.year}</div>
      <p className={styles.text}>{event.text}</p>
      {event.links.length > 0 && (
        <a 
          href={event.links[0].link} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.readMore}
        >
          Read more
        </a>
      )}
    </div>
  );
}

export default EventCard;