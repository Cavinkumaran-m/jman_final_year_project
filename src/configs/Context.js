import { createContext } from "react";
import { useContext } from "react";

const Context = createContext();
export const ModalContext = createContext();

export const useAuthContext = () => {
  return useContext(Context);
};

export const useModalContext = () => {
  return useContext(ModalContext);
};

export default Context;
