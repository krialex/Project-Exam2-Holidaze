import { Link } from "react-router-dom";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <Link to="/" className={styles.logoSection}>
            <div>
              <img src="/img/logo1.png" alt="logo" />
            </div>
            <div>Holidaze</div>
          </Link>
          <div className={styles.actions}>
            <button>Register</button>
            <button>Log in</button>
          </div>
        </div>
        <div className={styles.heroText}>
          <h1>Where is your next destination?</h1>
        </div>
      </div>
    </header>
  );
}
