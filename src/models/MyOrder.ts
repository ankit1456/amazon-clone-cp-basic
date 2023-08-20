import { Order } from "./Order";

export interface MyOrder {
  id: string;
  products: Order[];
  email: string;
  subtotal: number;
  total: number;
  payment_status: string;
  customer_name: string;
}
