import { save } from "./../../localStorage/Save/Save";
import { BASE_API_URL, REGISTER } from "./../../../url";
import { fetchPublicHeaders } from "../config/fetchHeaders";

/**
 * Register a user with name, email, password and isManager.
 * Stores accessToken and user info in localStorage.
 * Throws error if registration fails.
 * 
 * @param {string} name - User name
 * @param {string} email - User email
 * @param {string} password - Password 
 * @param {boolean} [manager=false]  - Set true if user is a venue manager
 *  
 * @returns API response with token and user info
 */

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
