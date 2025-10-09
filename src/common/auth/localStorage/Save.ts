export function save(key: string, value: any) {
  if (!key) {
    console.error("localStorage save: missing key!");
    return;
  }

  if (value === null || value === undefined) {
    localStorage.removeItem(key);
    return;
  }

  try {
    const stored = typeof value === "object" ? JSON.stringify(value) : String(value);
    localStorage.setItem(key, stored);
  } catch (err) {
    console.error(`Error saving "${key}" to localStorage:`, err);
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