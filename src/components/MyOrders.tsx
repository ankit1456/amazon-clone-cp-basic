import { useState, useEffect, useCallback } from "react";
import "../css/myOrders.scss";
import { MyOrder } from "../models/MyOrder";
import { Unsubscribe, User, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useStateValue } from "../hooks/useStateValue";
import { ACTION_TYPES_CONSTANTS } from "../constants/actionTypeConstants";
import Orders from "./Orders";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<MyOrder[]>([]);
  const [{ user }, dispatch] = useStateValue();

  const getOrders = useCallback(async (user: User | null) => {
    if (user) {
      try {
        const querySnapshot = await getDocs(
          query(
            collection(db, "orders"),
            where("email", "==", user?.email),
            orderBy("timestamp", "desc")
          )
        );

        setOrders(querySnapshot.docs.map((doc) => doc.data()) as MyOrder[]);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(
      auth,
      (authUser: User | null) => {
        if (authUser) {
          getOrders(authUser);
          dispatch({
            type: ACTION_TYPES_CONSTANTS.SAVE_USER,
            payload: authUser,
          });
        } else {
          setLoading(false);
          dispatch({
            type: ACTION_TYPES_CONSTANTS.SAVE_USER,
            payload: null,
          });
        }
      },
      (error: Error) => {
        console.log(error.message);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [dispatch, getOrders]);

  return (
    <div className="myOrder">
      <img
        className="myOrder__ad"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTB67kUVGD9sEdX7qDiUPvlOz8UQfm7folHBw&usqp=CAU"
        alt=""
      />

      {loading ? (
        <h1>Fetching your orders...</h1>
      ) : user ? (
        <div className="checkout__orders">
          <h4 className="checkout__heading">
            {orders.length > 0
              ? "Your Orders"
              : "You have not ordered anything"}
          </h4>

          <Link to="/">
            <button className="checkout__noOrder">Continue shopping </button>
          </Link>

          <div className="checkout__items">
            {orders.map((order) => (
              <Orders key={order.id} myOrder={order} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <h1>Login to get your orders</h1>
          <Link to="/login">
            <button className="checkout__noOrder">Login</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default MyOrders;
