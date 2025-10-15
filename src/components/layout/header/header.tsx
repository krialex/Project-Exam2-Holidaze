import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { faLocationDot, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { save } from "../../../common/auth/localStorage/Save";
import { RegisterModal } from "../../Modal/RegisterModal";
import { LoginModal } from "../../Modal/LoginModal"; 
import { useUser } from "../../../context/UserContext";
import { ThemeToggle } from "./ThemeToggle";


type HeaderProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  onSearch: (term: string) => void;
};

export function Header({ darkMode, setDarkMode, onSearch }: HeaderProps) {
  const { user, setUser, refreshUser } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  //Dropdown menu for small screen
  useEffect(()=> {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <header className="w-full bg-gradient-to-b from-[#6223F7] to-[#BBE1FF] text-white">
      <div className="max-w-[1600px] mx-auto p-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-5 text-white text-2xl no-underline flex-grow">
              <img src="/img/logo1.png" alt="logo" className="max-w-[72px] rounded-full" />
            <div className="text-white dark:text-gray-800">Holidaze</div>
          </Link>

          <div className="hidden md:flex items-center">
            {!user ? (
              <>
                  <button 
                  onClick={openRegisterModal}
                  className="ml-4 px-4 py-2 rounded-lg bg-white text-[#05059D]  dark:bg-purple-800 dark:hover:bg-purple-900 dark:text-white transition-transform duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1"
                  >Register
                  </button>
                  <button 
                  onClick={openLoginModal}
                  className="ml-4 px-4 py-2 rounded-lg bg-white text-[#05059D]  dark:bg-purple-800 dark:hover:bg-purple-900 dark:text-white transition-transform duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1"
                  >Log in
                  </button>
              </>
            ) : (
              <>
              <div className="flex items-center gap-4">
                <button 
                onClick={goToProfile} 
                className="text-white text-3xl p-0 bg-transparent dark:text-purple-900 dark:hover:text-purple-950 transition-transform duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1"><FontAwesomeIcon icon={faUser} /></button>
                <button 
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-white text-[#05059D] dark:bg-purple-800 dark:hover:bg-purple-900 dark:text-white transition-transform duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1"
                >Log out
                </button>
              </div>
              </>
            )}
          </div>

          {/* Dropdown menu for small screen */}
          <div className="relative md:hidden" ref={dropdownRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-white dark:text-purple-950 text-3xl bg-transparent p-2 rounded-full hover:bg-white/20 transition">
              <FontAwesomeIcon icon={faUser} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-[#05059D] dark:bg-gray-700 dark:text-white rounded-lg shadow-lg overflow-hidden z-50 h-28 flex flex-col justify-center">
                {!user ? (
                  <>
                    <button
                      onClick={() => {
                        openLoginModal();
                        setMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-purple-900">
                      Log in
                    </button>
                    <button
                      onClick={() => {
                        openRegisterModal();
                        setMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-purple-900">
                      Register
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        goToProfile();
                        setMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-purple-900">
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-purple-900">
                      Log out
                    </button>
                  </>
                )}
              </div>
            )}
          </div>


          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        {shouldShowSearch && (
        <div className="mt-8 text-center">
          <h1 className="font-henny text-4xl text-white dark:text-purple-900">Where is your next destination?</h1>
          <div className="flex gap-1 max-w-xs mx-auto mt-4 p-1 rounded-md shadow-md bg-white dark:bg-gray-700">
            <FontAwesomeIcon icon={faLocationDot} className="text-[#6B37F8] dark:text-white" />
            <input
              type="text"
              placeholder="Where to..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border-none w-full focus:outline-none bg-white text-black dark:text-white dark:bg-gray-700"
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


