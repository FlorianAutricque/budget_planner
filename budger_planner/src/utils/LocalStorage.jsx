import { useState } from "react";

function useLocalStorage(key, initialValue) {
  // Initialize state
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored JSON or return initial value if parse fails
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error occurs (e.g., JSON parse error), return initial value
      console.error(error);
      return initialValue;
    }
  });

  // Update local storage whenever the value changes
  const setValue = (value) => {
    try {
      // Allow value to be a function
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save to local storage
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Handle write error
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
