import { Outlet } from "react-router-dom";
import { Header } from "./header/header";
import { useState } from "react";

export function Layout() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div>
            <Header onSearch={setSearchTerm} />
            <main>
                <Outlet context={{ searchTerm }} />
            </main>
        </div>
    );
}

