import { useState } from "react";
import { Login } from "../../common/auth/api/Login";
import styles from "./Modals.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./../../common/validationSchemas";

type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(loginSchema),
    });
    const { refreshUser } = useUser();

    if(!isOpen) return null;

    async function handleLogin(data: any) {
        try {
            await Login(data.email, data.password);
            await refreshUser();
            onClose();
        } catch (error) {
            console.log("Login failed");
        }
    }

    return (
        <>
    <div className={styles.overlay} onClick={onClose}></div>
    <div className={styles.container}>
        <button onClick={onClose} className={styles.closeIcon}>
            <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2>Log in</h2>
        <br />
        <form onSubmit={handleSubmit(handleLogin)}>
          <input {...register("email")} placeholder="Your email.." className={styles.modalInput} />
          <p>{errors.email?.message}</p>

          <input {...register("password")} type="password" placeholder="Your password.." className={styles.modalInput} />
          <p>{errors.password?.message}</p> 

          <button type="submit" className={styles.submitBtn}>
            Log in
          </button>
        </form>
      </div>
      </>
  );

}

