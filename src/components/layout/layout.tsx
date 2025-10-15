import { Outlet } from "react-router-dom";
import { Header } from "./header/header";
import { useState, useEffect } from "react";
import { Footer } from "./footer/Footer";

export function Layout() {
    const [searchTerm, setSearchTerm] = useState("");
    const [darkMode, setDarkMode] = useState(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) return storedTheme === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <div className="flex flex-col min-h-screen bg-white text-black dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Header darkMode={darkMode} setDarkMode={setDarkMode} onSearch={setSearchTerm}  />
            <main>
                <Outlet context={{ searchTerm }} />
            </main>
            <Footer />
        </div>
    );
}

