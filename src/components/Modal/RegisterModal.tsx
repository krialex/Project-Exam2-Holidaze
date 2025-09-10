import { useState } from "react";
import { Register } from "../../common/auth/api/Register"; 
import styles from "./Modals.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type RegisterModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isManager, setIsManager] = useState(false);

    if(!isOpen) return null;

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        try {
            await Register(name, email, password, isManager);
            setName("");
            setEmail("");
            setPassword("");
            onClose();
        } catch (error) {
            console.log("feil inputs på navn, mail eller passord");
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
        <form onSubmit={handleRegister}>
          <input
            type="name"
            placeholder="Your name.."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.modalInput}
          />  
          <input
            type="email"
            placeholder="Your email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.modalInput}
          />
          <input
            type="password"
            placeholder="Your password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.modalInput}
          />


          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={isManager}
              onChange={(e) => setIsManager(e.target.checked)}
              className={styles.checkbox}
            />
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

