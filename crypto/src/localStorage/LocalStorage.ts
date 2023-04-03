export const setLocalStorageItem = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  export const getLocalStorageItem = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  };
  
  export const removeLocalStorageItem = (key: string) => {
    localStorage.removeItem(key);
  };
  