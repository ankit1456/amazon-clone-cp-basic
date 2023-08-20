import Product from "./Product";
import "../css/productList.scss";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Product as ProductModel } from "../models/Product";
import { useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      setProducts(
        querySnapshot.docs.map((doc) => doc.data()) as ProductModel[]
      );
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return loading ? (
    <h1 style={{ textAlign: "center" }}>Loading Products...</h1>
  ) : (
    <div className="productList">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
