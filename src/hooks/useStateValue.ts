import { useContext } from "react";
import { StateContext } from "../context/StateProvider";

export const useStateValue = () => useContext(StateContext);
