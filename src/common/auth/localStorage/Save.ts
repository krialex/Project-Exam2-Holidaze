export function save(key: string, value: any) {
  if (value === null || value === undefined) {
    localStorage.removeItem(key); 
    return;
  }

  try {
    const stored = typeof value === "object" ? JSON.stringify(value) : value;
    localStorage.setItem(key, stored);
  } catch (err) {
    console.error(`Error saving key "${key}" to localStorage:`, err);
  }
}



/**
 * // save data to local storage
export function save(key: string, value: unknown) {
  if (value === null) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
 */