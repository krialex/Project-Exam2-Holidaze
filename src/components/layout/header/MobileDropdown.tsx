import { useState, useRef, useEffect } from "react";
import { useUser } from "./../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { save } from "./../../../common/auth/localStorage/Save/Save";

type MobileDropdownProps = {
    openLogin: () => void;
    openRegister: () => void;
};

export function MobileDropdown({ openLogin, openRegister }: MobileDropdownProps) {
    const { user, setUser, refreshUser } = useUser();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      refreshUser();
    }, [refreshUser]);

    useEffect(() => {
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
      setMenuOpen(false);
    }

    function goToProfile() {
      if (!user) {
        openLogin();
        setMenuOpen(false);
        return;
      }
      navigate("/profile");
      setMenuOpen(false);
    }

    return (
      <div className="relative md:hidden" ref={dropdownRef}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-white dark:text-indigo-950 text-3xl bg-transparent p-2 rounded-full hover:bg-white/20"
        ><FontAwesomeIcon icon={faBars} /></button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-[#05059D] dark:bg-gray-700 dark:text-white rounded-lg shadow-lg overflow-hidden z-50 flex flex-col justify-center h-28">
            {!user ? (
              <>
                <button
                  onClick={openLogin}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-indigo-900"
                >Log in</button>
                <button
                  onClick={openRegister}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-indigo-900"
                >Register</button>
              </>
            ) : (
              <>
                <button
                  onClick={goToProfile}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-indigo-900"
                >Profile</button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-indigo-900"
                >Log out</button>
              </>
            )}
          </div>
        )}
      </div>
    );
  }

 