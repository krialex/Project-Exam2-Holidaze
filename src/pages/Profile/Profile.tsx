import styles from "./profile.module.css";
import { useEffect, useState } from "react";
import { GetProfileByName } from "../../common/auth/api/GetProfileByName";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EditModal } from "./../../components/Modal/EditModal";
import { useUser } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

export function Profile() {
    const { user, refreshUser } = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);

    useEffect(() => {
        async function init() {
            await refreshUser();
            setIsLoading(false);
        }
        init();
    }, [refreshUser]);

    if (isLoading) {
         return <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto my-8" aria-label="Loading spinner"></div> 
        }

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
                <ManagerProfile profile={user} />
            ) : (
                <CostumerProfile profile={user} />
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

function ManagerProfile({ profile }: { profile: any }) {
    return (
        <div className="flex flex-col gap-2 mx-auto my-6">
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">Create a new venue</button>
            <h3 className="text-lg font-semibold text-center">My venues</h3>
            <p className="text-center">{profile._count.venues}</p>
        </div>
    );
}

function CostumerProfile({ profile }: { profile: any }) {
    return (
        <div className="flex flex-col gap-2 mx-auto my-6">
            <h3 className="text-lg font-semibold text-center">My bookings</h3>
            <p className="text-center">{profile._count.bookings}</p>
        </div>
    )
}


