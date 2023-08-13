import Product from "./Product";
import "../css/productList.scss";
import { useStateValue } from "../hooks/useStateValue";

const ProductList = () => {
  const [{ products }] = useStateValue();
  return (
    <div className="productList">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
