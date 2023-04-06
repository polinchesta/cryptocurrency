function setLocalStorageItem(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
  }
  
  function getLocalStorageItem(key: string) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
  }
  
  function removeLocalStorageItem(key: string) {
  localStorage.removeItem(key);
  }
  
  function clearLocalStorage() {
  localStorage.clear();
  }
  
  export {
  setLocalStorageItem,
  getLocalStorageItem,
  removeLocalStorageItem,
  clearLocalStorage,
  };