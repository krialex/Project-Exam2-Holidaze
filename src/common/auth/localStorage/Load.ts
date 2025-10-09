export function load<T = any>(key: string): T | null {
  try {
    const value = localStorage.getItem(key);
    if (!value) return null; 
    return JSON.parse(value);
  } catch (err) {
    console.error(`Error parsing localStorage value for key: ${key}`, err);
    localStorage.removeItem(key);
    return null;
  }
}



/**
 * // load data from local storage
export function load<T>(key: string): T | null {
  const value = localStorage.getItem(key);
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch (err) {
    console.error("Error parsing localStorage value for key:", key, err);
    return null;
  }
}

 */