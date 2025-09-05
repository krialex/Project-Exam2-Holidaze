// save data to local storage
export function save(key: string, value: unknown) {
  if (value === null) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
