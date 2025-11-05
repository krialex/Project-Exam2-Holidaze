import { save } from "./../../localStorage/Save/Save";
import { BASE_API_URL, REGISTER } from "./../../../url";
import { fetchPublicHeaders } from "../config/fetchHeaders";

export async function Register(name: string, email: string, password: string, manager: boolean) {
    const response = await fetch(`${BASE_API_URL}${REGISTER}`, {
        method: "POST",
        headers: fetchPublicHeaders(),
        body: JSON.stringify({ 
            name, 
            email, 
            password, 
            venueManager: manager,
            }),
    });

    const data = await response.json(); 
    if(!response.ok) {
        const errorMessage = data.errors?.[0]?.message || data.message || "Register failed";
        throw new Error(errorMessage);
    }
    save("accessToken", data.data.accessToken);
    save("user", { 
        name: data.data.name, 
        email: data.data.email, 
        manager: data.data.venueManager });
        
    return data;
}
