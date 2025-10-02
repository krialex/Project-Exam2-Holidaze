import { Outlet } from "react-router-dom";
import { Header } from "./header/header";
import { useState } from "react";
import { Footer } from "./footer/Footer";

export function Layout() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="flex flex-col">
            <Header onSearch={setSearchTerm} />
            <main>
                <Outlet context={{ searchTerm }} />
            </main>
            <Footer />
        </div>
    );
}

