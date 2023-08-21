import { User } from "firebase/auth";
import { ACTION_TYPES_CONSTANTS } from "./actionTypeConstants";
import { Order } from "../models/Order";

export type Actions =
  | { type: ACTION_TYPES_CONSTANTS.ADD_TO_CART; payload: Order }
  | { type: ACTION_TYPES_CONSTANTS.REMOVE_FROM_CART; payload: string }
  | { type: ACTION_TYPES_CONSTANTS.SAVE_USER; payload: User | null }
  | {
      type: ACTION_TYPES_CONSTANTS.CHANGE_QUANTITY;
      payload: { id: string; quantity: number };
    }
  | {
      type: ACTION_TYPES_CONSTANTS.SIGNOUT_USER;
      payload: null;
    };
