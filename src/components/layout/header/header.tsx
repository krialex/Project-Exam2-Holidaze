import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./header.module.css";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type HeaderProps = {
  onSearch: (term: string) => void;
};

export function Header({ onSearch }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };


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
          <div className={styles.searchRow}>
            <FontAwesomeIcon icon={faLocationDot} className={styles.locationIcon} />
            <input 
              type="text"
              placeholder="Where to..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

