import { useVenueIdUrl } from "../../common/getVenueIdUrl"; 
import styles from "./venues.module.css";
import { faCheck, faX, faStar } from "@fortawesome/free-solid-svg-icons";
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
                <div className={styles.venueInfo}>
                    <h2>{venue.name}</h2>
                    <div className={styles.topInfo}>
                        <p className={styles.reviewBox}>{venue.rating} <FontAwesomeIcon icon={faStar} size="xs" /></p>
                        <ul className={styles.topListInfo}>
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
                    <div className={styles.infoDetails}>
                        <div className={styles.description}>
                            <h3>About our venue</h3>
                            <p>{venue.description}</p>
                        </div>
                        <div className={styles.bottomInfo}>
                            <h4>More info</h4>
                            <div className={styles.listInfo}>
                                <p>Max guests: <span>{venue.maxGuests}</span></p>
                                <p>Address: <span>{venue.location.address}</span></p>
                                <p>Zip code: <span>{venue.location.zip}</span></p>
                                <p>City: <span>{venue.location.city}</span></p>
                                <p>Country: <span>{venue.location.country}</span></p>
                                <br />
                                <hr />
                                <p>Price pr night: <span>{venue.price} kr</span></p>
                            </div>
                            <button className={styles.bookingBtn}>Book your adventure here</button>
                        </div>
                    </div>

                </div>
                
            </div>
        )}
        </>
    )
}