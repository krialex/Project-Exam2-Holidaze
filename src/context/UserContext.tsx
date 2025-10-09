import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { load } from "../common/auth/localStorage/Load";
import { save } from "../common/auth/localStorage/Save";
import { GetProfileByName } from "../common/auth/api/GetApiProfile/GetProfileByName";
import type { User } from "../common/types";

type UserContextType = {
  user: User | null;
  setUser: (u: User | null) => void;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UseProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(() => load<User>("user"));
    const isRefreshing = useRef(false);

    const refreshUser = useCallback(async () => {
        if (isRefreshing.current) return;
        isRefreshing.current = true;
        try {
            const storedUser = load<User>("user");
            const token = load<string>("accessToken");
            if(!storedUser || !token) {
                setUser(null);
                return;
            }

            const profile = await GetProfileByName();
            setUser(profile);
            save("user", profile);
        } catch (err) {
            console.error("refreshUser failed: ", err);
            const stored = load<User>("user");
            setUser(stored);
        } finally {
            isRefreshing.current = false;
        }
    }, []);

    useEffect(() => {
        const token = load<string>("accessToken");
        if (token) refreshUser();   
    }, [refreshUser]);

    return (
        <UserContext.Provider value={{ user, setUser, refreshUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be inside UseProvider");

    return context;
}

