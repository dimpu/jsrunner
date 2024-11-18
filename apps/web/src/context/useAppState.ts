import { useContext } from "react";
import { AppContext } from "./AppContext";


export const useAppState = () => {
  const { code, setCode } = useContext(AppContext);

  return { code, setCode }

}
