import { BASE_API_URL, ALL_PROFILES } from "../../../url";
import { load } from "../../localStorage/Load";

export async function GetProfileByName() {
    const user = load<{ name: string }>("user");
    if(!user) throw new Error ("no loged-in user found");

    const token = load<string>("accessToken");
    if (!token) throw new Error ("no access token found");

    const url = `${BASE_API_URL}${ALL_PROFILES}/${user.name}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        },
    });
    if (!response) throw new Error ("Failed to fetch profile from api");

    const data = await response.json();

    return data.data;
}