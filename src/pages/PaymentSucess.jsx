// src/pages/PaymentSuccess.jsx
import { useNavigate } from "react-router-dom";


const PaymentSuccess = () => {
  const navigate = useNavigate();
  
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

