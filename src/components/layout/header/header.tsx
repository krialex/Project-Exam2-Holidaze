import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { LoginModal } from "../../Modal/LoginModal";
import { RegisterModal } from "../../Modal/RegisterModal";
import { SearchBar } from "./SearchBar";
import { UserMenu } from "./UserMenu";
import { MobileDropdown } from "./MobileDropdown";
import { ThemeToggle } from "./ThemeToggle";

type HeaderProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  onSearch: (term: string) => void;
};

export function Header({ darkMode, setDarkMode, onSearch }: HeaderProps) {
  const location = useLocation();
  const shouldShowSearch = location.pathname === "/";

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <header className="w-full bg-gradient-to-b from-[#6223F7] to-[#BBE1FF] text-white">
      <div className="max-w-[1600px] mx-auto p-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-5 text-white text-2xl no-underline flex-grow">
            <img src="/img/logo1.png" alt="logo" className="max-w-[72px] rounded-full" />
            <div className="text-white dark:text-gray-800">Holidaze</div>
          </Link>

          <UserMenu
            openLogin={() => setIsLoginOpen(true)}
            openRegister={() => setIsRegisterOpen(true)}
          />

          <MobileDropdown
            openLogin={() => setIsLoginOpen(true)}
            openRegister={() => setIsRegisterOpen(true)}
          />

          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        {shouldShowSearch && <SearchBar onSearch={onSearch} />}
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </header>
  );
}

