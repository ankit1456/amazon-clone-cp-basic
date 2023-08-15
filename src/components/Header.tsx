import "../css/header.scss";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "../hooks/useStateValue";
import auth from "../firebase";
import { ACTION_TYPES_CONSTANTS } from "../constants/actionTypeConstants";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState, MouseEvent } from "react";

const Header = () => {
  const [{ orders, user }, dispatch] = useStateValue();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLSpanElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <span
              className="header__option--2"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {user
                ? `${user.email
                    ?.split("@")[0]
                    .charAt(0)
                    .toLocaleUpperCase()}${user.email?.split("@")[0]?.slice(1)}`
                : "Sign in"}
            </span>
          </div>
          {user && (
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {orders.length > 0 && (
                <Link to="/orders">
                  <MenuItem sx={{ fontSize: "1.7rem" }} onClick={handleClose}>
                    Orders
                  </MenuItem>
                </Link>
              )}

              <MenuItem sx={{ fontSize: "1.7rem" }} onClick={handleSignout}>
                Log out
              </MenuItem>
            </Menu>
          )}
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
      </div>
    </header>
  );
};

export default Header;
