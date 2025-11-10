import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useFilteredVenues } from "./Search";
import { Venue } from "../../common/types";

const mockVenues: Venue[] = [
  {
    id: "1",
    name: "Cozy Beach House",
    description: "A beautiful house by the sea with ocean view.",
    media: [{ url: "beach.jpg", alt: "Beach" }],
    price: 2500,
    maxGuests: 6,
    rating: 4,
    created: "2024-01-01",
    updated: "2024-01-01",
    meta: { wifi: true, parking: true, breakfast: false, pets: true },
    location: { address: "1 Ocean Dr", city: "Bergen", zip: "5000", country: "Norway", continent: "Europe", lat: 0, lng: 0 },
    _count: { bookings: 4 },
  },
  {
    id: "2",
    name: "Mountain Cabin",
    description: "Rustic cabin in the mountains. Perfect for hiking.",
    media: [{ url: "cabin.jpg", alt: "Cabin" }],
    price: 1800,
    maxGuests: 4,
    rating: 4,
    created: "2024-01-01",
    updated: "2024-01-01",
    meta: { wifi: false, parking: true, breakfast: true, pets: false },
    location: { address: "100 Fjellveien", city: "Oslo", zip: "0001", country: "Norway", continent: "Europe", lat: 0, lng: 0 },
    _count: { bookings: 4 },
  },
  {
    id: "3",
    name: "City Apartment",
    description: "Modern apartment in city center.",
    media: [{ url: "apt.jpg", alt: "Apartment" }],
    price: 1500,
    maxGuests: 2,
    rating: 4,
    created: "2024-01-01",
    updated: "2024-01-01",
    meta: { wifi: true, parking: false, breakfast: false, pets: false },
    location: { address: "5 Sentrumsgata", city: "Oslo", zip: "0150", country: "Norway", continent: "Europe", lat: 0, lng: 0 },
    _count: { bookings: 4 },
  },
];

describe("useFilteredVenues", () => {
  it("returns all venues when searchTerm is empty", () => {
    const { result } = renderHook(() =>
      useFilteredVenues({ venues: mockVenues, searchTerm: "" })
    );
    expect(result.current).toEqual(mockVenues);
    expect(result.current).toHaveLength(3);
  });

  it("returns all venues when searchTerm is only whitespace", () => {
    const { result } = renderHook(() =>
      useFilteredVenues({ venues: mockVenues, searchTerm: " " })
    );
    expect(result.current).toHaveLength(3);
  });

  it("filters venues by name (case insensitive)", () => {
    const { result } = renderHook(() =>
      useFilteredVenues({ venues: mockVenues, searchTerm: "beach" })
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe("Cozy Beach House");
  });

  it("filters venues by description (case insensitive)", () => {
    const { result } = renderHook(() =>
      useFilteredVenues({ venues: mockVenues, searchTerm: "hiking" })
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe("Mountain Cabin");
  });

  it("filters by partial match in name or description", () => {
    const { result } = renderHook(() =>
      useFilteredVenues({ venues: mockVenues, searchTerm: "ocean" })
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe("Cozy Beach House");
  });

  it("returns multiple matches when several venues match", () => {
    const { result } = renderHook(() =>
      useFilteredVenues({ venues: mockVenues, searchTerm: "cabin" })
    );
    expect(result.current).toHaveLength(1); 

    const { result: result2 } = renderHook(() =>
      useFilteredVenues({ venues: mockVenues, searchTerm: "modern" })
    );
    expect(result2.current).toHaveLength(1);
    expect(result2.current[0].name).toBe("City Apartment");
  });

  it("returns empty array when no venues match", () => {
    const { result } = renderHook(() =>
      useFilteredVenues({ venues: mockVenues, searchTerm: "nonexistent" })
    );
    expect(result.current).toHaveLength(0);
  });

  it("memoizes result – same reference if inputs unchanged", () => {
    const { result, rerender } = renderHook(
      ({ searchTerm }) => useFilteredVenues({ venues: mockVenues, searchTerm }),
      { initialProps: { searchTerm: "beach" } }
    );

    const firstResult = result.current;
    rerender({ searchTerm: "beach" });

    expect(result.current).toBe(firstResult); 
  });

  it("recalculates when searchTerm changes", () => {
    const { result, rerender } = renderHook(
      ({ searchTerm }) => useFilteredVenues({ venues: mockVenues, searchTerm }),
      { initialProps: { searchTerm: "beach" } }
    );

    expect(result.current).toHaveLength(1);

    rerender({ searchTerm: "mountain" });
    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe("Mountain Cabin");
  });
});