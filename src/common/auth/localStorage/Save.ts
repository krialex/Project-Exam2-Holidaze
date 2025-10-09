export function save(key: string, value: any) {
  try {
    const serialized = typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (err) {
    console.error(`Error saving localStorage value for key: ${key}`, err);
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