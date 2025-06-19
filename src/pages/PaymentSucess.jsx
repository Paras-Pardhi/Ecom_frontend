// src/pages/PaymentSuccess.jsx
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { fetchUserAddToCart } = useContext(Context);

  useEffect(() => {
    const clearCartAfterPayment = async () => {
      try {
        const response = await fetch(SummaryApi.clearCartAfterPayment.url, {
          method: SummaryApi.clearCartAfterPayment.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        if (result.success) {
          toast.success("Payment successful! Your cart is now empty.");
          fetchUserAddToCart(); // update cart count in context
        } else {
          toast.error("Something went wrong while clearing the cart.");
        }
      } catch (error) {
        toast.error("Error clearing cart.");
      }
    };

    clearCartAfterPayment();
  }, []);

  return (
    <div className="text-center mt-10">
      <h2 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h2>
      <p className="mt-4 text-lg">Thank you for your purchase!</p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;

