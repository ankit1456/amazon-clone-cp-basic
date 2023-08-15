import { FC } from "react";
import "../css/success.scss";
import { Link } from "react-router-dom";

const Success: FC = () => {
  return (
    <div className="payment-success">
      <h2>Payment Successful!</h2>
      <p>
        Thank you for your payment. Your order has been processed successfully.
      </p>
      <Link to="/">
        <button className="back-to-home-button">Back to Home</button>
      </Link>
    </div>
  );
};

export default Success;
