import { BASE_API_URL, ALL_PROFILES } from "../../url";
import { load } from "../localStorage/Load";

type Avatar = {
  url: string;
  alt: string;
};

export async function UpdateProfile(avatar: Avatar, bio: string) {
    const user = load<{ name: string }>("user");
    if(!user) throw new Error ("no logged-in user found");
    const token = load<string>("accessToken");
    if (!token) throw new Error ("no access token found");

    const url = `${BASE_API_URL}${ALL_PROFILES}/${user.name}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({
            bio,
            avatar: {
                url: avatar.url,
                alt: avatar.alt,
            },
        })
    });

    if (!response) throw new Error ("Failed to update profile info");
    const data = await response.json();
    return data.data;
}