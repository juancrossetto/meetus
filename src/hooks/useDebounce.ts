import { useState, useEffect } from 'react';

const DEBOUNCE_MILLISECONDS = 500;
const useDebounce = (value: string | number, delay: number | undefined = DEBOUNCE_MILLISECONDS) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<any>(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
};

export default useDebounce;
