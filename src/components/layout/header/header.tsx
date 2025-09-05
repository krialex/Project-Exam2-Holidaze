import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./header.module.css";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { save } from "../../../common/auth/localStorage/Save";
import { load } from "../../../common/auth/localStorage/Load";
import { RegisterModal } from "../../Modal/RegisterModal";
import { LoginModal } from "../../Modal/LoginModal"; 


type HeaderProps = {
  onSearch: (term: string) => void;
};


export function Header({ onSearch }: HeaderProps) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    function updateUser() {
      const storedUser = load<{ name: string; email: string }>("user");
      setUser(storedUser);
    }

    updateUser();

    window.addEventListener("storage", updateUser);
    return () => window.removeEventListener("storage", updateUser);
  }, []);

  function handleLogout() {
    save("user", null);
    save("accessToken", null);
    setUser(null);
    window.dispatchEvent(new Event("storage"));
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  }


  function openLoginModal() {
    setIsLoginOpen(true);
  }

  function openRegisterModal() {
    setIsRegisterOpen(true);
  }

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
            {!user ? (
              <>
                  <button onClick={openRegisterModal}>Register</button>
                  <button onClick={openLoginModal}>Log in</button>
              </>
            ) : (
              <>
                <span>Hei, {user.name}</span>
                <button onClick={handleLogout}>Log out</button>
              </>
            )}
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

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => {
          setIsLoginOpen(false);
        }}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => {
          setIsRegisterOpen(false);
        }}
      />
    </header>
  );
}

