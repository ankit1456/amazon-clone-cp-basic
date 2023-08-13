import StarIcon from "@mui/icons-material/Star";
import "../css/product.scss";
import { Product as ProductModel } from "../models/Product";
import { useStateValue } from "../hooks/useStateValue";
import { ACTION_TYPES_CONSTANTS } from "../constants/actionTypeConstants";

type ProductProps = {
  product: ProductModel;
};

const Product = ({ product }: ProductProps) => {
  const [, dispatch] = useStateValue();

  const addToCart = () => {
    dispatch({
      type: ACTION_TYPES_CONSTANTS.ADD_TO_CART,
      payload: { ...product, quantity: 1 },
    });
  };
  return (
    <div className="product d-flex-col">
      <p className="product__title">{product.title}</p>

      <p className="product__price">
        $<strong>{product.price}</strong>
      </p>

      <div>
        {Array.from({ length: product.rating }, (_, i) => (
          <StarIcon key={i} className="product__rating" />
        ))}
      </div>

      <img src={product.imageurl} alt="" className="product__image" />

      <button onClick={addToCart} className="btn product__addToCart">
        Add to cart
      </button>
      {/* <div className="d-flex">
        <button className="btn btn__addToCart">+</button>
        <span>5</span>
        <button className="btn btn__addToCart">-</button>
      </div> */}
    </div>
  );
};

export default Product;
