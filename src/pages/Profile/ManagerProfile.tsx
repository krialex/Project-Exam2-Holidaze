import { useState } from "react";
import { Link } from "react-router-dom";
import { NewVenueModal } from "../../components/Modal/Venue/NewVenueModal";
import { EditVenueModal } from "../../components/Modal/Venue/EditVenueModal";
import { DeleteVenueModal } from "../../components/Modal/Venue/DeleteVenueModal";

type ManagerProfileProps = {
    profile: any;
    venues: any[];
};

export function ManagerProfile({ profile, venues }: ManagerProfileProps) {
    const [isNewVenueOpen, setIsNewVenueOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedVenue, setSelectedVenue] = useState<any | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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
                        <button onClick={(e) => {
                            e.preventDefault();     
                            e.stopPropagation();
                            setSelectedVenue(v);
                            setIsEditOpen(true);
                        }} 
                            className="mt-auto bg-[#4996FC] text-white px-3 py-1 rounded hover:bg-[#1c73e5] transition">
                            Edit
                        </button>
                        <button onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedVenue(v);
                            setIsDeleteOpen(true);
                        }}
                            className="mt-auto bg-[#F53232] text-white px-3 py-1 rounded hover:bg-[#c02424] transition">
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

           {selectedVenue && (
                <EditVenueModal
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    venue={selectedVenue}   
              />
            )}

            {selectedVenue && (
                <DeleteVenueModal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    venue={selectedVenue}
                />
            )}
        </div>
    );
}

