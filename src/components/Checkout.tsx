import "../css/checkout.scss";
import { useStateValue } from "../hooks/useStateValue";
import Order from "./Order";

const Checkout = () => {
  const [{ orders }] = useStateValue();

  const totalAmount = orders?.reduce(
    (total, order) => order?.price * order?.quantity + total,
    0
  );

  return (
    <div className="checkout">
      <div className="checkout__orders">
        <img
          className="checkout__ad"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTB67kUVGD9sEdX7qDiUPvlOz8UQfm7folHBw&usqp=CAU"
          alt=""
        />
        <h4 className="checkout__heading">Your Shopping Cart</h4>

        <div className="checkout__items">
          {orders.map((order) => (
            <Order key={order.id} order={order} />
          ))}
        </div>
      </div>
      <div className="checkout__total">
        <p>
          Subtotal (4 items ): $ <strong>{totalAmount.toFixed(2)} </strong>
        </p>

        <div className="checkout__gift d-flex">
          <input type="checkbox" id="gift" />
          <label htmlFor="gift">This order contains a gift</label>
        </div>
        <button className="btn checkout__btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Checkout;
