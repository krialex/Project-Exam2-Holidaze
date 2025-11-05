import { load } from "../../localStorage/Load/Load";

export function fetchHeaders() {
    const token = load<string>("accessToken");
    return {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "",
        "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
    };
}

export function fetchPublicHeaders() {
        return {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
    };
}