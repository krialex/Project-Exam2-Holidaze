import { save } from "./../../localStorage/Save/Save";
import { BASE_API_URL, LOGIN } from "./../../../url";
import { fetchPublicHeaders } from "../config/fetchHeaders";

/**
 * Logs in a user with email and password.
 * Stores accessToken and user info in localStorage.
 * Throws error if login fails.
 *
 * @param {string} email - User email
 * @param {string} password - Password
 * @param {boolean} [manager=false] - Set true if user is a venue manager (manager false/true set in register flow)
 *
 * @returns API response with token and user info
 */

export async function Login(email: string, password: string, manager?: boolean) {
    const response = await fetch(`${BASE_API_URL}${LOGIN}`, {
      method: "POST",
      headers: fetchPublicHeaders(),
      body: JSON.stringify({ 
        email, 
        password,
        venueManager: manager, }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }
    const data = await response.json();
    save("accessToken", data.data.accessToken);
    save("user", { 
      name: data.data.name, 
      email: data.data.email, 
      manager: data.data.venueManager });

    return data;
}
