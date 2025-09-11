import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./header.module.css";
import { faLocationDot, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { save } from "../../../common/auth/localStorage/Save";
import { load } from "../../../common/auth/localStorage/Load";
import { RegisterModal } from "../../Modal/RegisterModal";
import { LoginModal } from "../../Modal/LoginModal"; 
import { useUser } from "../../../context/UserContext";


type HeaderProps = {
  onSearch: (term: string) => void;
};

export function Header({ onSearch }: HeaderProps) {
  const { user, setUser, refreshUser } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  function handleLogout() {
    save("user", null);
    save("accessToken", null);
    setUser(null);
    navigate("/");
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

  function goToProfile() {
    if(!user) {
      setIsLoginOpen(true);
      return;
    }
    navigate("/profile");
  }

  const shouldShowSearch = location.pathname === "/";

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
              <div className={styles.logedInState}>
                <button onClick={goToProfile} className={styles.userIcon}><FontAwesomeIcon icon={faUser} /></button>
                <button onClick={handleLogout}>Log out</button>
              </div>
              </>
            )}
          </div>
        </div>

        {shouldShowSearch && (
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
        )}
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

