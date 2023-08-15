import { FC } from "react";
import { Link } from "react-router-dom";
import "../css/cancel.scss";

const Cancel: FC = () => {
  return (
    <div className="payment-failed">
      <h2>Payment Failed</h2>
      <p>We're sorry, but your payment could not be processed.</p>
      <Link to="/">
        <button className="back-to-home-button">Back to Home</button>
      </Link>
    </div>
  );
};

export default Cancel;
