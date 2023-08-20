import "../css/checkout.scss";
import Order from "./Order";
import { MyOrder } from "../models/MyOrder";

type OrderProps = {
  myOrder: MyOrder;
};

const Orders = ({ myOrder }: OrderProps) => {
  return (
    <div className="checkout">
      <div className="checkout__orders">
        <div className="checkout__items">
          {myOrder?.products.map((product) => (
            <Order myOrders={true} key={product.id} order={product} />
          ))}
        </div>

        <div className="checkout__orderDetails">
          <p>Subtoal : ₹ {myOrder.subtotal}</p>
          <p>Shipping Fee : ₹ 0.00</p>
          <p>Payment Status: {myOrder.payment_status}</p>
          <p>Total: ₹ {myOrder.total}</p>
        </div>
      </div>
    </div>
  );
};

export default Orders;
