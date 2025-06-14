import { useCallback, useState } from 'react';

const ACCESS_TOKEN_KEY = 'accesstoken';

function retrieveExistingToken() {
  try {
    const value = window.localStorage.getItem(ACCESS_TOKEN_KEY);
    if (value !== '' && value !== null) {
      return value;
    } else return undefined;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export const useSaveToken = () => {
  const [storedValue, setStoredValue] = useState<string | undefined>(
    retrieveExistingToken,
  );

  const setValue = useCallback((newValue: string) => {
    // React.SetStateAction<string>
    try {
      window.localStorage.setItem(ACCESS_TOKEN_KEY, newValue);
    } catch (err) {
      console.log(err);
      window.localStorage.setItem(ACCESS_TOKEN_KEY, '');
    }
    setStoredValue(newValue);
  }, []);

  return [storedValue, setValue] as const; // as const: see https://kentcdodds.com/blog/wrapping-react-use-state-with-type-script
};
