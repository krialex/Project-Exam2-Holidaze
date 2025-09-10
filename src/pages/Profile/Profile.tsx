import styles from "./profile.module.css";
import { useEffect, useState } from "react";
import { GetProfileByName } from "../../common/auth/api/GetProfileByName";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EditModal } from "./../../components/Modal/EditModal";

export function Profile() {
    const [profile, setProfile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const data = await GetProfileByName();
                setProfile(data);
            } catch (error) {
                setError("failed to fetch profile");
                console.log(error, "kunne ikke hente profilen..");
            } finally {
                setIsLoading(false); //må sette loading spinner da
            }
        }
 
        fetchProfile();
    }, []);

    if (isLoading) {
    return <div className={styles.loading}>...Spinner...</div>
    }

    if (error) {
        return <div className={styles.error}>{error}</div>
    }

    if (!profile) {
    return <div className={styles.error}>No profile found</div>
    }

     function openEditModal() {
        setIsEditOpen(true);
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileInfoWrapper}>
                <div className={styles.profileImgEdit}>
                    <img src={profile.avatar.url} alt={profile.avatar.alt} className={styles.profileAvatar} />
                    <button onClick={openEditModal} className={styles.editBtn}><FontAwesomeIcon icon={faPenToSquare} /></button>
                </div>
                <div>
                    <p>{profile.name}</p>
                    <p>{profile.email}</p>
                </div>
                <p>{profile.bio}</p>
            </div>
            <hr />
            {profile.venueManager ? (
                <ManagerProfile profile={profile} />
            ) : (
                <CostumerProfile profile={profile} />
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
        <div className={styles.managerSection}>
            <button className={styles.newVenueBtn}>Create a new venue</button>
            <h3>My venues</h3>
            <p>{profile._count.venues}</p>
        </div>
    );
}

function CostumerProfile({ profile }: { profile: any }) {
    return (
        <div className={styles.costumerSection}>
            <h3>My bookings</h3>
            <p>{profile._count.bookings}</p>
        </div>
    );
}