import { useState } from "react";
import { Login } from "../../common/auth/api/Login";
import styles from "./Modals.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if(!isOpen) return null;

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        try {
            await Login(email, password);
            setEmail("");
            setPassword("");
            onClose();
        } catch (error) {
            console.log("feil inputs på mail eller passord");
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
        <form onSubmit={handleLogin}>
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
          <button type="submit" className={styles.submitBtn}>
            Log in
          </button>
        </form>
      </div>
      </>
  );

}