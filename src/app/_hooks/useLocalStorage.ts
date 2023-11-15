import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [item, setItem] = useState<T>(defaultValue);

  const updateItem = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setItem(value);
  };

  useEffect(() => {
    const item = localStorage.getItem(key);
    let parsedItem;

    try {
      parsedItem = JSON.parse(item || '');
    } catch (e) {
      parsedItem = item || '';
    }

    if (item) {
      setItem(parsedItem);
    }
  }, [key]);

  return {
    item,
    updateItem,
  };
}
