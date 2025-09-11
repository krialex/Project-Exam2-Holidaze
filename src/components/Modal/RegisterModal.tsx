import { useState } from "react";
import { Register } from "../../common/auth/api/Register"; 
import styles from "./Modals.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./../../common/validationSchemas";
import { Login } from "../../common/auth/api/Login";

type RegisterModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(registerSchema),
    });
    const { refreshUser } = useUser();

    if(!isOpen) return null;

     async function handleRegister(data: any) {
    try {
      await Register(data.name, data.email, data.password, data.isManager);
      await Login(data.email, data.password);
      await refreshUser();
      onClose();
    } catch (error) {
      console.log("Registration failed");
    }
  }

    return (
        <>
    <div className={styles.overlay} onClick={onClose}></div>    
      <div className={styles.container}>
        <button onClick={onClose} className={styles.closeIcon}>
            <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2>Register</h2>
        <form onSubmit={handleSubmit(handleRegister)}>
          <input {...register("name")} placeholder="Your name.." className={styles.modalInput} />  
          <p>{errors.name?.message}</p>

          <input {...register("email")} placeholder="Your email.." className={styles.modalInput} />
          <p>{errors.email?.message}</p>

          <input {...register("password")} type="password" placeholder="Your password.." className={styles.modalInput} />
          <p>{errors.password?.message}</p>

          <label className={styles.checkboxLabel}>
            <input type="checkbox" {...register("isManager")} className={styles.checkbox} />
            Register as Manager
          </label>

          <button type="submit" className={styles.submitBtn}>
            Register
          </button>
        </form>
      </div>
    </>
  );

}


