import { save } from "../localStorage/Save";
import { BASE_API_URL, REGISTER } from "../../url";

export async function Register(name: string, email: string, password: string, manager: boolean) {
    const response = await fetch(`${BASE_API_URL}${REGISTER}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({ 
            name, 
            email, 
            password, 
            venueManager: manager,
         }),
    });

    if(!response.ok) {
        throw new Error("Register failed");
    }

    const data = await response.json();
    save("accessToken", data.data.accessToken);
    save("user", { 
        name: data.data.name, 
        email: data.data.email, 
        manager: data.data.venueManager });
        
    return data;
}