import { Order } from "../models/Order";
import { Actions } from "../constants/Actions";
import { ACTION_TYPES_CONSTANTS } from "../constants/actionTypeConstants";
import { Reducer } from "react";
import { User } from "firebase/auth";

export type initialStateType = {
  orders: Order[];
  user: User | null;
};

export const initialState: initialStateType = {
  orders: [],
  user: null,
};

export const reducer: Reducer<initialStateType, Actions> = (
  state: initialStateType,
  action: Actions
): initialStateType => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES_CONSTANTS.ADD_TO_CART: {
      const product = state.orders.find((prd) => prd.id === payload.id);
      if (product) {
        return {
          ...state,
          orders: state.orders.map((order) =>
            order.id === payload.id
              ? { ...order, quantity: order.quantity + payload.quantity }
              : order
          ),
        };
      } else {
        return {
          ...state,
          orders: [...state.orders, payload],
        };
      }
    }

    case ACTION_TYPES_CONSTANTS.CHANGE_QUANTITY:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === payload.id
            ? { ...order, quantity: payload.quantity }
            : order
        ),
      };

    case ACTION_TYPES_CONSTANTS.REMOVE_FROM_CART:
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== payload),
      };

    case ACTION_TYPES_CONSTANTS.SAVE_USER:
      return {
        ...state,
        user: payload,
      };
    case ACTION_TYPES_CONSTANTS.SIGNOUT_USER:
      return {
        ...state,
        user: payload,
      };

    default:
      return state;
  }
};
