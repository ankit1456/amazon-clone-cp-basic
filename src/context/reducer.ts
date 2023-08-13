import { Order } from "../models/Order";
import { Actions } from "../constants/Actions";
import { ACTION_TYPES_CONSTANTS } from "../constants/actionTypeConstants";
import { Reducer } from "react";
import { Product } from "../models/Product";
import { User } from "firebase/auth";

export type initialStateType = {
  products: Product[];
  orders: Order[];
  user: User | null;
};

export const initialState: initialStateType = {
  products: [
    {
      id: 1,
      title:
        "Vivo Y91i (Ocean Blue, 2GB RAM, 32GB Storage) with No Cost EMI/Additional Exchange Offers",
      price: 108.1,
      rating: 5,
      imageurl:
        "https://m.media-amazon.com/images/I/71CA2d53yML._AC_UY327_FMwebp_QL65_.jpg",
    },
    {
      id: 2,
      title:
        "Noise Twist Bluetooth Calling Smart Watch with 1.38' TFT Biggest Display, Up-to 7 Days Battery, 100+ Watch Faces, IP68, Heart Rate Monitor, Sleep Tracking (Jet Black)",
      price: 100.1,
      rating: 4,
      imageurl:
        "https://m.media-amazon.com/images/I/61TapeOXotL._AC_UL600_FMwebp_QL65_.jpg",
    },
    {
      id: 3,
      title:
        "Vivo Y91i (Ocean Blue, 2GB RAM, 32GB Storage) with No Cost EMI/Additional Exchange Offers",
      price: 105.1,
      rating: 5,
      imageurl:
        "https://m.media-amazon.com/images/I/61ljEnH3sUL._AC_UL600_FMwebp_QL65_.jpg",
    },
    {
      id: 4,
      title: "Men's Teal Graphic Print Sweatshirt",
      price: 110.1,
      rating: 5,
      imageurl:
        "https://m.media-amazon.com/images/I/71CA2d53yML._AC_UY327_FMwebp_QL65_.jpg",
    },
    {
      id: 5,
      title: "Amazon Brand - Solimo Zates 3 Seater Sofa (Fabric, Blue)",
      price: 90.16,
      rating: 5,
      imageurl: "https://m.media-amazon.com/images/I/81z0jzop6IL._SX522_.jpg",
    },
    {
      id: 6,
      title:
        "ROSHIKA FABRICATION Women's Embroidery Rayon Kurta Pant Set with Dupatta",
      price: 50.12,
      rating: 5,
      imageurl: "https://m.media-amazon.com/images/I/51+-BTs00WL._UX679_.jpg",
    },
    {
      id: 7,
      title:
        "Master Your Emotions: A Practical Guide to Overcome Negativity and Better Manage Your Feelings (Mastery Series Book 1)",
      price: 30.1,
      rating: 5,
      imageurl:
        "https://m.media-amazon.com/images/I/61ZPDQOjw-L._AC_UY327_FMwebp_QL65_.jpg",
    },
    {
      id: 8,
      title:
        "Apple 2022 MacBook Air Laptop with M2 chip: 34.46 cm (13.6-inch) Liquid Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, 1080p FaceTime HD Camera. Works with iPhone/iPad; Starlight",
      price: 100.12,
      rating: 5,
      imageurl:
        "https://m.media-amazon.com/images/I/710TJuHTMhL._AC_UY327_FMwebp_QL65_.jpg",
    },
    {
      id: 9,
      title:
        "Vivo Y91i (Ocean Blue, 2GB RAM, 32GB Storage) with No Cost EMI/Additional Exchange Offers",
      price: 108.1,
      rating: 5,
      imageurl:
        "https://m.media-amazon.com/images/I/71CA2d53yML._AC_UY327_FMwebp_QL65_.jpg",
    },
    {
      id: 10,
      title: "VApple iPhone 14 Plus (128 GB) - Purple",
      price: 90,
      rating: 4,
      imageurl:
        "https://m.media-amazon.com/images/I/61BGE6iu4AL._AC_UY327_FMwebp_QL65_.jpg",
    },
  ],

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

    default:
      return state;
  }
};
