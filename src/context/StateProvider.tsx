import {
  Dispatch,
  PropsWithChildren,
  Reducer,
  createContext,
  useReducer,
} from "react";
import { Actions } from "../constants/Actions";
import { initialState, initialStateType } from "./reducer";

const noopDispatch: Dispatch<Actions> = () => {};

export const StateContext = createContext<
  [initialStateType, Dispatch<Actions>]
>([initialState, noopDispatch]);

type StateProviderProps = {
  reducer: Reducer<initialStateType, Actions>;
  initialState: initialStateType;
};

export const StateProvider = ({
  reducer,
  initialState,
  children,
}: PropsWithChildren<StateProviderProps>) => {
  const [state, dispatch] = useReducer<Reducer<initialStateType, Actions>>(
    reducer,
    initialState
  );

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
