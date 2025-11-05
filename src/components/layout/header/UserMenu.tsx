import { useUser } from "./../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { save } from "./../../../common/auth/localStorage/Save/Save";
import { useEffect } from "react";

type UserMenuProps = {
    openLogin: () => void;
    openRegister: () => void;
};

export function UserMenu({ openLogin, openRegister }: UserMenuProps) {
    const { user, setUser, refreshUser } = useUser();
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

function goToProfile() {
    if (!user) {
      openLogin();
      return;
    }
    navigate("/profile");
}

   return (
    <div className="hidden md:flex items-center">
      {!user ? (
        <>
          <button
            onClick={openRegister}
            aria-label="Register"
            className="ml-4 px-4 py-2 rounded-lg bg-white text-[#05059D] dark:bg-indigo-800 dark:text-white hover:shadow-lg"
          >Register</button>
          <button
            onClick={openLogin}
            aria-label="Log in"
            className="ml-4 px-4 py-2 rounded-lg bg-white text-[#05059D] dark:bg-indigo-800 dark:text-white hover:shadow-lg"
          >Log in</button>
        </>
      ) : (
        <div className="flex items-center gap-4">
          <button
            onClick={goToProfile}
            aria-label="User profile"
            className="text-white text-3xl bg-transparent dark:text-indigo-900 hover:shadow-lg"
          ><FontAwesomeIcon icon={faUser} /></button>
          <button
            onClick={handleLogout}
            aria-label="Log out"
            className="px-4 py-2 rounded-lg bg-white text-[#05059D] dark:bg-indigo-800 dark:text-white hover:shadow-lg"
          >Log out</button>
        </div>
      )}
    </div>
  );
}
