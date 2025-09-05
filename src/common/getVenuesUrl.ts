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

                let allVenues: Venue[] = [];
                let page = 1;

                while (true) {
                    const response = await fetch(`${venuesUrl}?page=${page}&limit=100`);
                    if(!response.ok) {
                        throw new Error(`Feil ved henting av venues (side${page})`);
                    }

                    const json: ApiResponse = await response.json();

                    if(json.data.length === 0) break;
                    allVenues = [...allVenues, ...json.data];
                    page++;
                }

                setVenues(allVenues);
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


/* DENNE TAR KUN INN DE 100 SIST LAGDE..
import { useMemo } from "react";
import { Venue } from "./../../common/types";

type UseFilteredVenuesProps = {
  venues: Venue[];
  searchTerm: string;
};

export function useFilteredVenues({ venues, searchTerm }: UseFilteredVenuesProps) {
  return useMemo(() => {
    if (!searchTerm) return venues;

    return venues.filter((venue) =>
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [venues, searchTerm]);
}

 */