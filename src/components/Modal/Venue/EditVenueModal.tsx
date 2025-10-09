import { useUser } from "../../../context/UserContext";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BASE_API_URL, ALL_VENUES } from "../../../common/url";
import { load } from "../../../common/auth/localStorage/Load";
import { toast } from "react-toastify";
import { VenueForm } from "./VenueForm";

type EditVenueModalProps = {
    isOpen: boolean;
    onClose: () => void;
    venue: any;
}

export function EditVenueModal({ isOpen, onClose, venue }: EditVenueModalProps) {
    const { refreshUser} = useUser();
 
    if(!isOpen) return null;

    async function updateVenue(data: any) {
        try {
            const token = load("accessToken");
            const body = {
                name: data.name,
                description: data.description,
                price: data.price,
                rating: data.rating ?? 0,
                maxGuests: data.maxGuests,
                media: data.mediaUrl.trim() ? [{ url: data.mediaUrl, alt: "Venue image"}] : [],
                location: {
                    address: data.address || null,
                    city: data.city || null,
                    zip: null,
                    country: data.country || null,
                    continent: null,
                    lat: 0,
                    lng: 0,
                    },
                 meta: {
                    wifi: data.wifi || false,
                    parking: data.parking || false,
                    breakfast: data.breakfast || false,
                    pets: data.pets || false,
                    },
            };

            const res = await fetch(`${BASE_API_URL}${ALL_VENUES}/${venue.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
                },
                body: JSON.stringify(body),
            });

            if(!res.ok) throw new Error("Failed to update venue");

            toast.success("Venue updated!");
            await refreshUser();
            onClose();
        } catch(err) {
            console.log("Something went wrong when updating venue: ", err);
            toast.error("Could not update venue");
        }
}

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
            <div className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl flex flex-col">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition">
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <h2 className="text-xl font-semibold text-center mb-4 mt-6">Create a new venue</h2>

            <VenueForm onSubmit={updateVenue} 
                submitLabel="Update"
                defaultValues={{
                    name: venue.name,
                    description: venue.description,
                    price: venue.price,
                    rating: venue.rating,
                    maxGuests: venue.maxGuests,
                    mediaUrl: venue.media?.[0]?.url || "",
                    address: venue.location?.address || "",
                    city: venue.location?.city || "",
                    country: venue.location?.country || "",
                    wifi: venue.meta?.wifi || false,
                    parking: venue.meta?.parking || false,
                    breakfast: venue.meta?.breakfast || false,
                    pets: venue.meta?.pets || false,
                }} />
            </div>
        </>
    )

}
