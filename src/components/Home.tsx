import { Unsubscribe, User, onAuthStateChanged } from "firebase/auth";
import { ACTION_TYPES_CONSTANTS } from "../constants/actionTypeConstants";
import "../css/home.scss";
import ProductList from "./ProductList";
import { useStateValue } from "../hooks/useStateValue";
import { useEffect } from "react";
import { auth } from "../firebase";

const Home = () => {
  const [, dispatch] = useStateValue();
  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(
      auth,
      (authUser: User | null) => {
        if (authUser) {
          dispatch({
            type: ACTION_TYPES_CONSTANTS.SAVE_USER,
            payload: authUser,
          });
        } else {
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
  }, [dispatch]);

  return (
    <div className="home">
      <img
        className="home__banner"
        src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
        alt="hero image"
      />

      <ProductList />
    </div>
  );
};

export default Home;
