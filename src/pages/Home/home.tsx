import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useVenuesApi } from "../../common/getVenuesUrl";
import { Venue } from "../../common/types";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./home.module.css";

export function Home() {
    const { venues, isLoading, isError } = useVenuesApi();

    if (isLoading) return <p>Loading venues...</p>
    if (isError) return <p>Something went wrong.. Try again later.</p>

    return (
        <div className={styles.venuesContainerPage}>
            <h2>Browse our venues</h2>
            <div>
            <div className={styles.container}>
                {venues.map((venue: Venue) => (
                    <Link key={venue.id} to={`/venues/${venue.id}`} className={styles.card}>

                        {venue.media?.[0] && (
                            <img className={styles.cardImage}
                                src={venue.media[0].url}
                                alt={venue.media[0].alt || venue.name} 
                            />
                        )}

                        <div className={styles.infoContainer}>
                            <h3>{venue.name}</h3>
                            <p>{venue.description}</p>
                            <p className={styles.reviewBox}>{venue.rating || 0}</p>
                            <p className={styles.metaInfoVenue}>
                            Breakfast included{" "}
                            <FontAwesomeIcon
                                icon={venue.meta.breakfast ? faCheck : faX}
                                className={venue.meta.breakfast ? styles.checkIcon : styles.xIcon}
                            />
                            </p>
                        </div>
                    </Link>
                ))}
                
            </div>
            </div>
        </div>
    )
}