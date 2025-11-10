import { Link } from "react-router-dom";
import { Venue } from "./../../common/types";
import { faCheck, faX, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AllVenuesHtmlProps {
  venues: Venue[];
  isLoading: boolean;
  isError: boolean;
}

/**
 * Displays list of venues in a grid
 * - Shows loading-spinner when data is loading
 * - Shows error if something went wrong
 * - Shows "No venues found." if the list is empty
 * - Every venue has a image, name, short description, rating and breakfast icon
 * - Clickable – sends user to detail page
 *
 * @param {Object} props
 * @param {Venue[]} props.venues - List of venues
 * @param {boolean} props.isLoading - True if data is loading
 * @param {boolean} props.isError - True if error
 *
 * @returns Grid of venues
 */

export function AllVenuesHtml({ venues, isLoading, isError }: AllVenuesHtmlProps) {
  if (isLoading) { return <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>; }
  if (isError) { return <p className="text-center text-red-600">Something went wrong.. Try again later.</p>; }
  if (!venues || venues.length === 0) {
    return <p className="text-center text-gray-500 dark:text-white">No venues found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {venues.map((venue: Venue) => (
        <Link
          key={venue.id}
          to={`/venues/${venue.id}`}
          className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
        >
          {venue.media?.[0] && (
            <img
              className="w-full h-48 object-cover"
              src={venue.media[0].url}
              alt={venue.media[0].alt || venue.name}
            />
          )}
          <div className="p-4 flex flex-col gap-2">
            <h3 className="text-xl font-semibold break-words">{venue.name}</h3>
            <p className="text-gray-700 dark:text-white text-sm line-clamp-3">{venue.description}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="inline-flex items-center gap-1 bg-blue-600 text-white text-sm font-bold rounded px-2 py-1">
                {venue.rating || 0} <FontAwesomeIcon icon={faStar} size="xs" />
              </span>
                <p className="italic mt-2 flex items-center gap-1">
                Breakfast included{" "}
                <FontAwesomeIcon
                    icon={venue.meta.breakfast ? faCheck : faX}
                    className={venue.meta.breakfast ? "text-green-500" : "text-red-500"}
                />
                </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}


