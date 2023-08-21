import { Link, useNavigate } from "react-router-dom";
import "../css/checkout.scss";
import { useStateValue } from "../hooks/useStateValue";
import Order from "./Order";
import axios from "axios";

const Checkout = () => {
  const [{ orders, user }] = useStateValue();
  const navigate = useNavigate();

  const totalAmount = orders?.reduce(
    (total, order) => order?.price * order?.quantity + total,
    0
  );

  const totalProducts = orders?.reduce(
    (total, order) => order.quantity + total,
    0
  );

  const handleCheckout = async () => {
    if (orders.length <= 0) {
      navigate("/");
      return;
    }
    try {
      const res = await axios.post(
        "https://amazon-clone-stripe-backend.onrender.com/checkout-session",

        {
          orders,
          email: user?.email,
        }
      );

      window.location = res.data.url;
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="checkout">
      <div className="checkout__orders">
        <img
          className="checkout__ad"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTB67kUVGD9sEdX7qDiUPvlOz8UQfm7folHBw&usqp=CAU"
          alt=""
        />
        <h4 className="checkout__heading">
          Your Shopping Cart {orders.length === 0 && "is empty"}
        </h4>

        <Link to="/">
          <button className="checkout__noOrder">Continue shopping </button>
        </Link>

        <div className="checkout__items">
          {orders.map((order) => (
            <Order myOrders={false} key={order.id} order={order} />
          ))}
        </div>
      </div>

      {orders.length > 0 && (
        <div className="checkout__total">
          <p>
            Subtotal ({totalProducts} items ): ₹
            <strong>{totalAmount.toFixed(2)} </strong>
          </p>

          <div className="checkout__gift d-flex">
            <input type="checkbox" id="gift" />
            <label htmlFor="gift">This order contains a gift</label>
          </div>

          {user ? (
            <button className="btn checkout__btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          ) : (
            <Link to="/login">
              <button className="btn checkout__btn">Login to Checkout</button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Checkout;
