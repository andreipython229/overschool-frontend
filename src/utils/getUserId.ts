
export const getUserIdFromLocalStorage = (): number | null => {
    const persistedRoot = localStorage.getItem('persist:root');
    if (persistedRoot) {
      const parsedRoot = JSON.parse(persistedRoot);
      const user = parsedRoot?.user;
      if (user) {
        const userData = JSON.parse(user);
        return userData?.userId || null;
      }
    }
    return null;
  };