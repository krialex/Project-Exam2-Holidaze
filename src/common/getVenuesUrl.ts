import { useState, useEffect } from "react";
import {BASE_API_URL, ALL_VENUES } from "./url";
import { Venue } from "./types";

interface ApiResponse {
    data: Venue[];
}

const venuesUrl = BASE_API_URL + ALL_VENUES;

export function useVenuesApi() {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function getVenues() {
            try {
                setIsLoading(true);
                setIsError(false);

                let lastVenues: Venue[] = [];

               for (let page = 1; page <= 2; page++) {
                const response = await fetch(`${venuesUrl}?page=${page}&limit=100`);
                if (!response.ok) {
                    throw new Error(`Feil ved henting av venues (side ${page})`);
                }

                    const json: ApiResponse = await response.json();
                    lastVenues = [...lastVenues, ...json.data];
                }

                setVenues(lastVenues);
            } catch (error) {
                console.log('Feil ved å hente ut venues fra API', error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        getVenues();
    }, []);
    return { venues, isLoading, isError };
}


