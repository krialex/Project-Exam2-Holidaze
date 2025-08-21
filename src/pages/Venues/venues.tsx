import { useVenueIdUrl } from "../../common/getVenueIdUrl"; 
import styles from "./venues.module.css";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export function Venues() {
    const { venue, isLoading, isError } = useVenueIdUrl();
    if (isLoading) return <p>Loading venues...</p>
    if (isError) return <p>Something went wrong.. Try again later.</p>

    return (
        <>
        {venue && (
            <div className={styles.venueCard}>
                {venue.media?.[0] && (
                <img className={styles.VenueCardImage}
                    src={venue.media[0].url}
                    alt={venue.media[0].alt || venue.name} 
                />
                )}
                <div>
                    <h2>{venue.name}</h2>
                    <div>
                        <p>{venue.rating}</p>
                        <ul>
                            <li>Breakfast 
                                <FontAwesomeIcon
                                icon={venue.meta.breakfast ? faCheck : faX}
                                className={venue.meta.breakfast ? styles.checkIcon : styles.xIcon}
                            />
                            </li>
                            <li>Pets accepted 
                                <FontAwesomeIcon
                                icon={venue.meta.pets ? faCheck : faX}
                                className={venue.meta.pets ? styles.checkIcon : styles.xIcon}
                            />
                            </li>
                            <li>Free wifi 
                                <FontAwesomeIcon
                                icon={venue.meta.wifi ? faCheck : faX}
                                className={venue.meta.wifi ? styles.checkIcon : styles.xIcon}
                            />
                            </li>
                            <li>Free parking 
                                 <FontAwesomeIcon
                                icon={venue.meta.parking ? faCheck : faX}
                                className={venue.meta.parking ? styles.checkIcon : styles.xIcon}
                            />
                            </li>
                        </ul>
                    </div>
                </div>
                
            </div>
        )}
        </>
    )
}