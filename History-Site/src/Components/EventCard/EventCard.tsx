import type { HistoryEvent } from '../../Components/Types/History';
import styles from './EventCard.module.scss';
import readMoreIcon from '../../assets/readmore.png';

interface EventCardProps {
  event: HistoryEvent;
  position: 'left' | 'right';  // ← Tilføj dette
}

function EventCard({ event, position }: EventCardProps) {
  return (
    <div className={`${styles.card} ${styles[position]}`}>
      <div className={styles.year}>{event.year}</div>
      <p className={styles.text}>{event.text}</p>
      {event.links.length > 0 && (
        <a 
          href={event.links[0].link} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.readMore}
        >
          Read more <img src={readMoreIcon} alt="Read more" className={styles.readMoreIcon} />
        </a>
      )}
    </div>
  );
}

export default EventCard;