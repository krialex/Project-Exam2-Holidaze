import { useVenueIdUrl } from "../../common/getVenueIdUrl"; 
import { faCheck, faX, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Calendar } from "../../components/Search/Calender";
import { BookingModal } from "../../components/Modal/BookingModal";
import { useState } from "react";


export function Venues() {
    const { venue, isLoading, isError } = useVenueIdUrl();
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedStart, setSelectedStart] = useState<Date | null>(null);
    const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);

    if (isLoading) return <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto my-8" aria-label="Loading spinner"></div>;

    if (isError) return <p className="text-center text-red-500 mt-8">Something went wrong.. Try again later.</p>;

    return (
        <>
        {venue && (
            <div className="max-w-3xl mx-auto my-6 p-4">
                {venue.media?.[0] && (
                <img className="w-full rounded-lg mb-4"
                    src={venue.media[0].url}
                    alt={venue.media[0].alt || venue.name} 
                />
                )}
                    <h2 className="text-2xl font-bold text-center mb-4 break-words">{venue.name}</h2>
                    <div className="flex flex-col items-center gap-4 mb-6">
                        <p className="bg-blue-600 text-white px-3 py-1 rounded inline-flex items-center gap-1">{venue.rating} <FontAwesomeIcon icon={faStar} size="xs" /></p>
                        <ul className="flex gap-8 italic text-gray-700">
                            <li className="flex items-center gap-1">Breakfast{" "} 
                                <FontAwesomeIcon
                                icon={venue.meta.breakfast ? faCheck : faX}
                                className={venue.meta.breakfast ? "text-green-500" : "text-red-500"}
                            />
                            </li>
                            <li className="flex items-center gap-1">Pets{" "}
                                <FontAwesomeIcon
                                icon={venue.meta.pets ? faCheck : faX}
                                className={venue.meta.pets ? "text-green-500" : "text-red-500"}
                            />
                            </li>
                            <li className="flex items-center gap-1">Free wifi{" "} 
                                <FontAwesomeIcon
                                icon={venue.meta.wifi ? faCheck : faX}
                                className={venue.meta.wifi ? "text-green-500" : "text-red-500"} 
                            />
                            </li>
                            <li className="flex items-center gap-1">Parking{" "} 
                                 <FontAwesomeIcon
                                icon={venue.meta.parking ? faCheck : faX}
                                className={venue.meta.parking ? "text-green-500" : "text-red-500"}
                            />
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/2">
                            <h3 className="text-lg font-semibold mb-2">About our venue</h3>
                            <p className="text-gray-700">{venue.description}</p>
                        </div>
                        <div className="md:w-1/2 bg-white rounded-lg shadow-md p-6 text-center">
                            <h4 className="font-semibold mb-2">More info</h4>
                            <div className="flex flex-col gap-3 text-left italic">
                                <p>Max guests: <span className="font-bold">{venue.maxGuests}</span></p>
                                <p>Address: <span>{venue.location.address}</span></p>
                                <p>Zip code: <span className="font-bold">{venue.location.zip}</span></p>
                                <p>City: <span className="font-bold">{venue.location.city}</span></p>
                                <p>Country: <span className="font-bold">{venue.location.country}</span></p>
                                <hr className="border-t border-gray-300 my-2 opacity-50" />
                                <p>Price pr night: <span className="font-bold">{venue.price} kr</span></p>
                            </div>
                            <button 
                            onClick={() => setIsBookingOpen(true)}
                            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                            >Book your adventure here</button>
                        </div>
                    </div>
                    <div className="md:w-1/2 float-right">
                        <Calendar bookings={venue.bookings ?? []}
                          onDateSelect={(start, end) => {
                            setSelectedStart(start);
                            setSelectedEnd(end);
                          }} />
                    </div>

                <BookingModal
                    isOpen={isBookingOpen}
                    onClose={() => setIsBookingOpen(false)}
                    venueId={venue.id}
                    venueName={venue.name}
                    startDate={selectedStart}
                    endDate={selectedEnd}
                    maxGuests={venue.maxGuests}
                />
 
            </div>
        )}
        </>
    );
}

