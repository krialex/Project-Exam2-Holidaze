import { useState } from "react";
import { UpdateProfile } from "../../common/auth/api/UpdateProfile";
import styles from "./Modals.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


type EditModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function EditModal({ isOpen, onClose}: EditModalProps) {
    const [avatar, setAvatar] = useState("");
    const [bio, setBio] = useState("");

    if (!isOpen) return null;

    async function updateUser(e: React.FormEvent) {
        e.preventDefault();
        try {
            await UpdateProfile({ url: avatar, alt: "User avatar" }, bio);
            setBio("");
            setAvatar("");
            onClose();
            window.location.reload();
        } catch (error) {
            console.log("feil inputs på bio eller avatar");
        }
    }

    return (
        <>
        <div className={styles.overlay} onClick={onClose}></div>
        <div className={styles.container}>
            <button onClick={onClose} className={styles.closeIcon}>
            <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2>Update your profile</h2>
        <br />
        <form onSubmit={updateUser}>
            <input 
                type="bio"
                placeholder="update bio.."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className={styles.modalInput}
            />
            <input 
                type="avatar"
                placeholder="update avatar url.."
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className={styles.modalInput}
            />
            <button type="submit" className={styles.submitBtn}>
            Update
          </button>
        </form>
        </div>
        </>
    )
}