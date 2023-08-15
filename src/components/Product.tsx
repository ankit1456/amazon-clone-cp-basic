import StarIcon from "@mui/icons-material/Star";
import "../css/product.scss";
import { Product as ProductModel } from "../models/Product";
import { useStateValue } from "../hooks/useStateValue";
import { ACTION_TYPES_CONSTANTS } from "../constants/actionTypeConstants";

type ProductProps = {
  product: ProductModel;
};

const Product = ({ product }: ProductProps) => {
  const [{ orders }, dispatch] = useStateValue();

  const addedInCart = orders.find((order) => order.id === product.id);

  const addToCart = () => {
    dispatch({
      type: ACTION_TYPES_CONSTANTS.ADD_TO_CART,
      payload: { ...product, quantity: 1 },
    });
  };

  const handleChangeQuantityIncrease = () => {
    dispatch({
      type: ACTION_TYPES_CONSTANTS.ADD_TO_CART,
      payload: { ...product, quantity: 1 },
    });
  };
  const handleChangeQuantityDecrease = () => {
    const productInCart = orders.find((order) => order.id === product.id);

    if (productInCart && productInCart?.quantity > 1) {
      dispatch({
        type: ACTION_TYPES_CONSTANTS.ADD_TO_CART,
        payload: { ...product, quantity: -1 },
      });
    } else {
      dispatch({
        type: ACTION_TYPES_CONSTANTS.REMOVE_FROM_CART,
        payload: product.id,
      });
    }
  };

  return (
    <div className="product d-flex-col">
      <p className="product__title">{product.title}</p>

      <p className="product__price">
        ₹ <strong>{product.price}</strong>
      </p>

      <div>
        {Array.from({ length: product.rating }, (_, i) => (
          <StarIcon key={i} className="product__rating" />
        ))}
      </div>

      <img src={product.imageurl} alt="" className="product__image" />

      {(!addedInCart || addedInCart.quantity <= 0) && (
        <button onClick={addToCart} className="btn product__addToCart">
          Add to cart
        </button>
      )}
      {!!addedInCart?.quantity && (
        <div className="d-flex product__addToCart product__added">
          <button
            onClick={handleChangeQuantityDecrease}
            className="btn btn__addToCart"
          >
            -
          </button>
          <span>{addedInCart.quantity}</span>
          <button
            onClick={handleChangeQuantityIncrease}
            className="btn btn__addToCart"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
