import { Link } from "react-router-dom";
import { Venue } from "./../../common/types";
import { faCheck, faX, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../pages/Home/home.module.css";

interface AllVenuesHtmlProps {
  venues: Venue[];
  isLoading: boolean;
  isError: boolean;
}

export function AllVenuesHtml({ venues, isLoading, isError }: AllVenuesHtmlProps) {
    if (isLoading) {
        return <div className={styles.spinner} aria-label="Loading spinner"></div>;
    }

    if (isError) {
        return <p>Something went wrong.. Try again later.</p>;
    }

    if (!venues || venues.length === 0) {
        return <p>No venues found.</p>;
    }

    return (
        <div>
        <div className={styles.container}>
            {venues.map((venue: Venue) => (
            <Link key={venue.id} to={`/venues/${venue.id}`} className={styles.card}>
                {venue.media?.[0] && (
                <img
                    className={styles.cardImage}
                    src={venue.media[0].url}
                    alt={venue.media[0].alt || venue.name}
                />
                )}

                <div className={styles.infoContainer}>
                <h3>{venue.name}</h3>
                <p>{venue.description}</p>
                <p className={styles.reviewBox}>
                    {venue.rating || 0}{" "}
                    <FontAwesomeIcon icon={faStar} size="xs" />
                </p>
                <p className={styles.metaInfoVenue}>
                    Breakfast included{" "}
                    <FontAwesomeIcon
                    icon={venue.meta.breakfast ? faCheck : faX}
                    className={
                        venue.meta.breakfast ? styles.checkIcon : styles.xIcon
                    }
                    />
                </p>
                </div>
            </Link>
            ))}
        </div>
        </div>
  );
}
