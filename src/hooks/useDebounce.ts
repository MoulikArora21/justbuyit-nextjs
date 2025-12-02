// This custom react hook is for the search component to wait for user to stop typing for a specified delay before triggering the search action.
// This helps in reducing the number of search requests made while the user is still typing.
// It is adopted from - https://medium.com/@sankalpa115/usedebounce-hook-in-react-2c71f02ff8d8

import { useState, useEffect } from 'react';

function useDebounce<T>(value : T, delay : number) : T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;