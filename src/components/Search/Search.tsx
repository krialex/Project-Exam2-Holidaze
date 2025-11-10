import { useMemo } from "react";
import { Venue } from "./../../common/types";

type UseFilteredVenuesProps = {
  venues: Venue[];
  searchTerm: string;
};

/**
 * Custom React hook that filters a list of venues based on a search term.
 *
 * The filtering is case-insensitive and checks both the venue's `name` and `description`.
 * Empty or whitespace-only search terms return the full list of venues.
 * Uses `useMemo` to prevent unnecessary recalculations when dependencies haven't changed.
 *
 * @param {UseFilteredVenuesProps} props - The input parameters.
 * @param {Venue[]} props.venues - Array of venue objects to filter.
 * @param {string} props.searchTerm - The search string to filter venues by.
 *
 * @returns {Venue[]} The filtered array of venues. Returns all venues if `searchTerm` is empty.
 *
 */

export function useFilteredVenues({ venues, searchTerm }: UseFilteredVenuesProps) {
  return useMemo(() => {
    if (!searchTerm) return venues;

    return venues.filter((venue) =>
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [venues, searchTerm]);
}

