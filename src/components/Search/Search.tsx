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

