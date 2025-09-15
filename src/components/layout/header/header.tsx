import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { faLocationDot, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { save } from "../../../common/auth/localStorage/Save";
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
    <header className="w-full bg-gradient-to-b from-[#6223F7] to-[#BBE1FF] text-white">
      <div className="max-w-[1600px] mx-auto p-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-5 text-white text-2xl no-underline">
              <img src="/img/logo1.png" alt="logo" className="max-w-[72px] rounded-full" />
            <div>Holidaze</div>
          </Link>

          <div className="flex items-center">
            {!user ? (
              <>
                  <button 
                  onClick={openRegisterModal}
                  className="ml-4 px-4 py-2 rounded-lg bg-white text-[#05059D] transition-transform duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1"
                  >Register
                  </button>
                  <button 
                  onClick={openLoginModal}
                  className="ml-4 px-4 py-2 rounded-lg bg-white text-[#05059D] transition-transform duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1"
                  >Log in
                  </button>
              </>
            ) : (
              <>
              <div className="flex items-center gap-4">
                <button 
                onClick={goToProfile} 
                className="text-white text-2xl p-0 bg-transparent"><FontAwesomeIcon icon={faUser} /></button>
                <button 
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-white text-[#05059D] transition-transform duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1"
                >Log out
                </button>
              </div>
              </>
            )}
          </div>
        </div>

        {shouldShowSearch && (
        <div className="mt-8 text-center">
          <h1 className="font-henny text-4xl">Where is your next destination?</h1>
          <div className="flex gap-1 max-w-xs mx-auto mt-4 p-1 rounded-md shadow-md bg-white">
            <FontAwesomeIcon icon={faLocationDot} className="text-[#6B37F8]" />
            <input
              type="text"
              placeholder="Where to..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border-none w-full focus:outline-none text-black"
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


            