import { createContext } from "react";
import { useContext } from "react";

const Context = createContext();

export const useAuthContext = () => {
  return useContext(Context);
};

export default Context;
