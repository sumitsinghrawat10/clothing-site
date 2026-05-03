import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [likedIds, setLikedIds] = useState(new Set());
  const [cartCount, setCartCount] = useState(0);

  const toggleLike = (id) => {
    setLikedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <AppContext.Provider value={{
      likedIds,
      toggleLike,
      cartCount,
      setCartCount
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);