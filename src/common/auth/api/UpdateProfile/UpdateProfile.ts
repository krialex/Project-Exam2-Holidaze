import { BASE_API_URL, ALL_PROFILES } from "./../../../url";
import { load } from "./../../localStorage/Load/Load";
import { fetchHeaders } from "../config/fetchHeaders";

type Avatar = {
  url: string;
  alt: string;
};

export async function UpdateProfile(avatar: Avatar, bio: string) {
    const user = load<{ name: string }>("user");
    if(!user) throw new Error ("no logged-in user found");
    const url = `${BASE_API_URL}${ALL_PROFILES}/${user.name}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: fetchHeaders(),
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

