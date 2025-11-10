import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { load } from "../common/auth/localStorage/Load/Load";
import { save } from "../common/auth/localStorage/Save/Save";
import { GetProfileByName } from "./../common/auth/api/GetApiProfile/GetProfileByName";
import type { User } from "../common/types";

type UserContextType = {
  user: User | null;
  setUser: (u: User | null) => void;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * Gives access to logged in use everywhere in the app
 * Fetches user from localStorage
 * Automatically updates with GetProfileByName() if token exists
 * Stops multiple updates with useRef
 * Use with <UseProvider> on top of <App /> in main.tsx
 *
 * @param {React.ReactNode} children - The whole app
 *
 * @example
 * // In main.tsx
 * <UseProvider>
 *   <App />
 * </UseProvider>
 *
 * @example
 * // In a component
 * const { user, refreshUser } = useUser();
 * if (user) console.log("Hello,", user.name);
 */

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


 