import { BASE_API_URL, ALL_PROFILES } from "./../../../url";
import { load } from "./../../localStorage/Load/Load";
import { fetchHeaders } from "../config/fetchHeaders";

export async function GetProfileByName() {
    const user = load<{ name: string }>("user");
    if(!user) throw new Error ("no loged-in user found");
    const url = `${BASE_API_URL}${ALL_PROFILES}/${user.name}`;
    const response = await fetch(url, {
        method: "GET",
        headers: fetchHeaders(),
    });

    if (!response) throw new Error ("Failed to fetch profile from api");
    const data = await response.json();
    return data.data;
}