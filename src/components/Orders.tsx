import { Link } from "react-router-dom";
import "../css/checkout.scss";
import { useStateValue } from "../hooks/useStateValue";
import Order from "./Order";

const Orders = () => {
  const [{ orders }] = useStateValue();
  console.log("orders:", orders);

  return (
    <div className="checkout">
      <div className="checkout__orders">
        <h4 className="checkout__heading">
          {orders.length > 0 ? " Your Orders" : "You have not ordered anything"}
        </h4>
        {orders.length === 0 && (
          <Link to="/">
            <button className="checkout__noOrder">Start shopping </button>
          </Link>
        )}

        <div className="checkout__items">
          {orders.map((order) => (
            <Order myOrders={true} key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
