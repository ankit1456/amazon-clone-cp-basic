import { ChangeEvent } from "react";
import StarIcon from "@mui/icons-material/Star";
import "../css/order.scss";
import { Order as OrderModel } from "../models/Order";
import { useStateValue } from "../hooks/useStateValue";
import { ACTION_TYPES_CONSTANTS } from "../constants/actionTypeConstants";

type OrderProps = {
  order: OrderModel;
  myOrders: boolean;
};

const Order = ({ order, myOrders }: OrderProps) => {
  const [, dispatch] = useStateValue();

  const handleChangeOrderQuantity = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: ACTION_TYPES_CONSTANTS.CHANGE_QUANTITY,
      payload: { id: order.id, quantity: +e.target.value },
    });
  };

  const removeFromCart = () => {
    dispatch({
      type: ACTION_TYPES_CONSTANTS.REMOVE_FROM_CART,
      payload: order.id,
    });
  };

  return (
    <div className="order">
      <img className="order__image" src={order.imageurl} alt="order image" />

      <div className="order__info">
        <p className="order__title">{order.title}</p>
        <p>
          ₹ <strong>{order.price}</strong>
        </p>

        <div className="order__rating">
          {Array.from({ length: order.rating }, (_, i) => (
            <StarIcon key={i} className="product__rating" />
          ))}
        </div>

        <select
          value={order?.quantity}
          onChange={handleChangeOrderQuantity}
          className="order__quantity"
        >
          {[...Array(20).keys()].map((num) => (
            <option key={num.toString()}>{num + 1}</option>
          ))}
        </select>

        {!myOrders && (
          <button onClick={removeFromCart} className="btn order__btn">
            Remove from cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Order;
