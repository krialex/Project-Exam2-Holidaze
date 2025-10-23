import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {BASE_API_URL, ALL_VENUES } from "./url";
import { Venue } from "./types";
import { ApiResponse } from "./types";


export function useVenueIdUrl() {
    const { id } = useParams();
    const [venue, setVenue] = useState<Venue | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      async function getVenueId() {
        try {
          setIsLoading(true);
          setIsError(false);

          const response = await fetch(`${BASE_API_URL}${ALL_VENUES}/${id}?_bookings=true`);
          if(!response.ok) throw new Error("Failed to fetch venue");

          const json: ApiResponse = await response.json();
          setVenue(json.data);
        } catch (error) {
          console.error("Failed to fetch venue from API", error);
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }

      if (id) getVenueId();
    }, [id]);

    return { venue, isLoading, isError };
}
