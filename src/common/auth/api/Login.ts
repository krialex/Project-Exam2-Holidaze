import { save } from "../localStorage/Save";
import { BASE_API_URL, LOGIN } from "../../url";

export async function Login(email: string, password: string, manager?: boolean) {
  const response = await fetch(`${BASE_API_URL}${LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
    },
    body: JSON.stringify({ email, password, venueManager: manager }),
  });

  if (!response.ok) throw new Error("Login failed");

  const data = await response.json();

  const accessToken = data.data.accessToken;
  const user = {
    name: data.data.name,
    email: data.data.email,
    manager: data.data.venueManager,
  };

  console.log("dette er token: ", accessToken);
  console.log("dette er user: ", user);

  save("accessToken", accessToken);
  save("user", user);

  return data;
}


/**
 * import { save } from "../localStorage/Save";
import { BASE_API_URL, LOGIN } from "../../url";

export async function Login(email: string, password: string, manager?: boolean) {
  const response = await fetch(`${BASE_API_URL}${LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
    },
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
 */