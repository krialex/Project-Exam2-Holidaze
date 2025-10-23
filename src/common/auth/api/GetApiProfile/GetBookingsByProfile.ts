import { BASE_API_URL, ALL_PROFILES } from "../../../url";
import { load } from "../../localStorage/Load";

export async function GetBookingsByProfile() {
    const user = load<{ name: string }>("user");
    if (!user) throw new Error("No logged in user was found");
    const token = load<string>("accessToken");
    if (!token) throw new Error("No access token was found");

    const url = `${BASE_API_URL}${ALL_PROFILES}/${user.name}/bookings?_venue=true&_customer=true`;
    const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        },
    });

    if (!res.ok) throw new Error("Failed to fetch bookings for profile");
    const json = await res.json();
    return json.data as any[]; 
}