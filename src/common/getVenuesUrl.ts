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

                const venuesData = await fetch(venuesUrl);
                const venuesJson: ApiResponse = await venuesData.json();

                console.log(venuesJson);
                setVenues(venuesJson.data);
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