import { useUser } from "../../../context/UserContext";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BASE_API_URL, ALL_VENUES } from "../../../common/url";
import { load } from "./../../../common/auth/localStorage/Load/Load";
import { toast } from "react-toastify";

type DeleteVenueModalProps = {
    isOpen: boolean;
    onClose: () => void;
    venue: any;
}

export function DeleteVenueModal({ isOpen, onClose, venue }: DeleteVenueModalProps) {
    const { refreshUser } = useUser();
    if (!isOpen) return null;

    async function deleteVenue() {
        try {
            const token = load("accessToken");
            const res = await fetch(`${BASE_API_URL}${ALL_VENUES}/${venue.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
                }
            });

            if(!res.ok) throw new Error("Failed to delete venue");
            toast.success("Venue deleted!");
            await refreshUser();
            onClose();
        } catch(err) {
            toast.error("Could not delete venue");
        }
    }

    return (
        <>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
            <div className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 rounded-xl shadow-xl flex flex-col">
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"><FontAwesomeIcon icon={faXmark} /></button>
            <h2 className="text-2xl font-semibold text-center mb-4 mt-6 m-4 break-words">Are you sure you want to delete your venue?</h2>
            <div className="flex flex-col gap-3 justify-center m-3">
                <h3 className="text-center text-xl font-semibold break-words">{venue.name}</h3>
                {venue.media?.[0] && (
                    <img
                    className="w-full h-48 object-cover rounded-lg"
                    src={venue.media[0].url}
                    alt={venue.media[0].alt || venue.name}
                    />
                )}
            </div>
            <div className="flex gap-3 m-3">
                <button 
                    onClick={onClose} 
                    className="mt-2 m-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 dark:bg-green-800 dark:hover:bg-green-900 transition shadow-md w-1/2 mx-auto">Cancel</button>
                <button 
                    onClick={deleteVenue} 
                    className="mt-2 m-2 bg-[#F53232] text-white px-4 py-2 rounded-lg hover:hover:bg-[#da1010] dark:bg-[#ad1414] dark:hover:bg-[#850f0f] transition shadow-md w-1/2 mx-auto">Delete</button>
            </div> 
            </div>
        </>
    )
}