import { createContext, useContext, useState } from "react";

const ToggleContext = createContext();

// eslint-disable-next-line react/prop-types
export const ToggleProvider = ({ children }) => {
  const [isGuestView, setIsGuestView] = useState(true);

  const toggleView = () => {
    setIsGuestView(!isGuestView);
  };

  return (
    <ToggleContext.Provider value={{ isGuestView, toggleView }}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggle = () => useContext(ToggleContext);
