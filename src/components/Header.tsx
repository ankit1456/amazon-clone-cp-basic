import "../css/header.scss";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "../hooks/useStateValue";
import auth from "../firebase";
import { ACTION_TYPES_CONSTANTS } from "../constants/actionTypeConstants";

const Header = () => {
  const [{ orders, user }, dispatch] = useStateValue();

  const handleSignout = () => {
    auth.signOut();
    dispatch({ type: ACTION_TYPES_CONSTANTS.SIGNOUT_USER, payload: null });
  };
  return (
    <header className="header d-flex">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="logo"
        />
      </Link>

      <div className="header__searchBox d-flex">
        <input type="text" />

        <button className="d-flex">
          <SearchIcon />
        </button>
      </div>

      <div className="header__options d-flex">
        <Link to={user ? "/" : "/login"}>
          <div className="header__option">
            <span className="header__option--1">Hello</span>
            <span className="header__option--2">
              {user
                ? `${user.email
                    ?.split("@")[0]
                    .charAt(0)
                    .toLocaleUpperCase()}${user.email?.split("@")[0]?.slice(1)}`
                : "Sign in"}
            </span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__option--1">Returns</span>
          <span className="header__option--2">& Orders</span>
        </div>
        <div className="header__option">
          <span className="header__option--1">Your</span>
          <span className="header__option--2">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header__option--basket">
            <span>
              <ShoppingCartIcon />
            </span>
            <span className="header__option--basketQuantity">
              {orders.length}
            </span>
          </div>
        </Link>

        {user && (
          <button onClick={handleSignout} className="btn">
            Log out
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
