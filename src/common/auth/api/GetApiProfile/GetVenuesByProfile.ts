import { BASE_API_URL, ALL_PROFILES } from "./../../../url";
import { load } from "./../../localStorage/Load/Load";
import { fetchHeaders } from "../config/fetchHeaders";

export async function GetVenuesByProfile() {
    const user = load<{ name: string }>("user");
    if (!user) throw new Error("No logged-in user found");
    const url = `${BASE_API_URL}${ALL_PROFILES}/${user.name}/venues?_bookings=true&_venue=true&_customer=true`;
    const res = await fetch(url, {
        method: "GET",
        headers: fetchHeaders(),
    });

    if (!res.ok) throw new Error("Failed to fetch venues for profile");
    const json = await res.json();
    return json.data as any[]; 
}