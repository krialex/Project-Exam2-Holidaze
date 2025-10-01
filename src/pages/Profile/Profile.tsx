import { useEffect, useState } from "react";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EditModal } from "./../../components/Modal/EditModal";
import { useUser } from "../../context/UserContext";
import { Link, Navigate } from "react-router-dom";

import { GetBookingsByProfile } from "../../common/auth/api/GetApiProfile/GetBookingsByProfile";
import { GetVenuesByProfile } from "../../common/auth/api/GetApiProfile/GetVenuesByProfile";
import moment from "moment";
import { NewVenueModal } from "../../components/Modal/NewVenueModal";

export function Profile() {
    const { user, refreshUser } = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [bookings, setBookings] = useState<any[]>([]);
    const [venuesWithBookings, setVenuesWithBookings] = useState<any[]>([]);
    const [isError, setIsError] = useState<string | null>(null);

    useEffect(() => {
    async function loadData() {
        if (!user) {
        setIsLoading(false);
        return;
        }

        setIsLoading(true);
        setIsError(null);

        try {
        if (user.venueManager) {
            const venues = await GetVenuesByProfile();
            setVenuesWithBookings(venues);  
        } else {
            const myBookings = await GetBookingsByProfile();
            setBookings(myBookings);
        }
        } catch (err: any) {
        console.error(err);
        setIsError("Kunne ikke fetche bookings eller venues.");
        } finally {
        setIsLoading(false);
        }
    }

        loadData();
    }, [user]);


    if (isLoading) {
         return <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto my-8" aria-label="Loading spinner"></div> 
        }
    if(isError) return <div className="text-red-500">{isError}</div>

    if (!user) { return <Navigate to="/" replace /> }

     function openEditModal() {
        setIsEditOpen(true);
    }

    const avatarUrl = user.avatar?.url || "/img/default-avatar.png";

    return ( 
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 bg-white rounded-xl shadow-md p-4 mt-4">

            <div className="flex flex-row items-center gap-3 sm:gap-4">
            <div className="relative shrink-0">
                <img
                src={avatarUrl}
                alt={user.avatar?.alt || "User avatar"}
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full shadow-lg ring-1 ring-gray-200"
                />
                <button
                onClick={openEditModal}
                className="absolute top-10 sm:top-12 right-[-8px] bg-transparent hover:text-indigo-600"
                >
                <FontAwesomeIcon icon={faPenToSquare} />
                </button>
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
                <p className="font-bold text-base sm:text-lg truncate">{user.name}</p>
                <p className="italic text-xs sm:text-sm">Contact me:</p>
                <p className="break-all text-sm">{user.email}</p>
            </div>
            </div>

            <div className="flex flex-col gap-1 min-w-[150px] sm:text-left sm:items-center">
            <p className="italic text-xs sm:text-sm">About me:</p>
            <p className="max-w-[250px] text-sm sm:text-base">{user.bio}</p>
            </div>
        </div>

        <hr className="border-t border-gray-300 my-4 opacity-50" />

        {/* Manager or Customer Info */}
           {user.venueManager ? (
                <ManagerProfile profile={user} venues={venuesWithBookings} />
            ) : (
                <CostumerProfile profile={user} bookings={bookings} />
            )}

            <EditModal
                isOpen={isEditOpen}
                onClose={() => {
                setIsEditOpen(false);
                }}
            />
        </div> 

    );
}

function ManagerProfile({ profile, venues }: { profile: any; venues: any[] }) {
    const [isNewVenueOpen, setIsNewVenueOpen] = useState(false);

    return (
        <div className="flex flex-col gap-4 mx-auto my-6">
            <div className="flex justify-end mr-2">
            <button onClick={() => setIsNewVenueOpen(true)}
                className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition text-sm">
                Create a new venue
            </button>
            </div>

            <h3 className="text-lg font-semibold text-center">My venues</h3>

            {venues.length === 0 ? (
            <p className="text-center">No venues yet</p>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {venues.map((v) => (
                <Link key={v.id} to={`/venues/${v.id}`} className="h-full">
                    <div className="bg-white rounded shadow p-4 h-full flex flex-col">
                    <div className="w-full h-64 mb-4">
                        <img className="w-full h-full object-cover rounded-lg"
                        src={v.media[0].url}
                        alt={v.media[0].alt || v.name} />
                    </div>

                    <p className="font-medium">{v.name}</p>
                    <p className="text-sm text-gray-600">{v.bookings?.length ?? 0} Bookings:</p>

                    <div className="mt-3">
                        {v.bookings?.map((b: any) => (
                        <p key={b.id} className="text-xs italic text-gray-700">
                            Booked from:{" "}
                            {new Date(b.dateFrom).toLocaleDateString()} -{" "}
                            {new Date(b.dateTo).toLocaleDateString()} by {b.customer.name}
                        </p>
                        ))}
                    </div>

                    <div className="flex gap-2 mt-4">
                        <button className="mt-auto bg-[#4996FC] text-white px-3 py-1 rounded hover:bg-[#1c73e5] transition">
                        Edit
                        </button>
                        <button className="mt-auto bg-[#F53232] text-white px-3 py-1 rounded hover:bg-[#c02424] transition">
                        Delete
                        </button>
                    </div>
                    </div>
                </Link>
                ))}
            </div>
            )}

            <NewVenueModal 
                isOpen={isNewVenueOpen}
                onClose={() => setIsNewVenueOpen(false)}
            />
        </div>
    );
}

function CostumerProfile({ profile, bookings }: { profile: any; bookings: any[] }) {
    return (
            <div className="mx-auto my-6">
                <h3 className="text-lg font-semibold text-center mb-4">My bookings</h3>

                {bookings.length === 0 ? (
                <p className="text-center">No bookings yet</p>
                ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
                    {bookings.map((b) => (
                    <Link key={b.id} to={`/venues/${b.venue?.id}`} className="h-full">
                        <div className="bg-white rounded shadow p-4 h-full flex flex-col">
                        <div className="w-full h-64 mb-4">
                            <img className="w-full h-full object-cover rounded-lg"
                            src={b.venue.media[0].url}
                            alt={b.venue.media[0].alt || b.venue.name}
                            />
                        </div>

                        <p className="font-medium">{b.venue?.name ?? "Unknown venue"}</p>
                        <p className="text-sm">
                            {moment(b.dateFrom).format("DD.MM.YYYY")} –{" "}
                            {moment(b.dateTo).format("DD.MM.YYYY")}
                        </p>
                        <p className="text-sm mb-2">{b.guests} guests</p>

                        <button className="mt-auto bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition">
                            View details
                        </button>
                        </div>
                    </Link>
                    ))}
                </div>
                )}
            </div>
            );

}


