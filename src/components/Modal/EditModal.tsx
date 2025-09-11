import { useState } from "react";
import { UpdateProfile } from "../../common/auth/api/UpdateProfile";
import styles from "./Modals.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from "../../context/UserContext";
import { editProfileSchema } from "./../../common/validationSchemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


type EditModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function EditModal({ isOpen, onClose}: EditModalProps) {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(editProfileSchema),
    });
    const { refreshUser } = useUser();

    if (!isOpen) return null;

    async function updateUser(data: any) {
        try {
            await UpdateProfile({ url: data.avatarUrl, alt: data.avatarAlt || "" }, data.bio);
            await refreshUser();
   
            onClose();
        } catch (error) {
            console.log("Update user info failed");
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
        <form onSubmit={handleSubmit(updateUser)}>
          <input {...register("bio")} placeholder="Tell everyone about you.." className={styles.modalInput} />  
          <p>{errors.bio?.message}</p>

          <input {...register("avatarUrl")} placeholder="Update your avatar with an url.." className={styles.modalInput} />  
          <p>{errors.avatarUrl?.message}</p>

            <button type="submit" className={styles.submitBtn}>
            Update
          </button>
        </form>
        </div>
        </>
    )
}

