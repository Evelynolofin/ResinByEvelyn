import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { form, total, subtotal, shippingFee, details } = state || {};

  useEffect(() => {
    localStorage.removeItem("cartItems");
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 mt-20">
      <div className="bg-green-50 border border-green-300 rounded-lg p-4 text-center space-y-1">
        <p className="text-2xl">🎉</p>
        <p className="text-lg font-bold text-green-700">Order Received!</p>
        <p className="text-sm text-green-600">
          Thank you, {form?.firstName}. Please make your payment to the account below.
        </p>
      </div>

      <div className="border rounded-lg p-5 bg-white shadow-sm space-y-3">
        <p className="font-bold text-gray-800 text-base">Payment Details</p>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Bank</span>
            <span className="font-semibold">First Bank Nigeria</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Account Name</span>
            <span className="font-semibold">ResinByEvelyn</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Account Number</span>
            <span className="font-semibold tracking-widest">0123456789</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Amount to Pay</span>
            <span className="font-bold text-blue-600 text-base">
              ₦{total?.toLocaleString()}
            </span>
          </div>
          {details === "delivery" && (
            <div className="flex justify-between text-xs text-gray-400">
              <span>
                Subtotal ₦{subtotal?.toLocaleString()} + Shipping ₦{shippingFee?.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 text-sm text-yellow-800 space-y-1">
        <p className="font-semibold">⚠️ Important Notice</p>
        <p>
          This payment is <span className="font-semibold">not confirmed automatically</span>.
          After making your transfer, please send your payment receipt to the merchant via
          WhatsApp or email so your order can be manually confirmed and processed.
        </p>
        <p className="mt-1">📲 WhatsApp: <span className="font-semibold">+234 800 000 0000</span></p>
        <p>📧 Email: <span className="font-semibold">resinbyevelyn@gmail.com</span></p>
      </div>

      <button
        onClick={() => navigate("/")}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Back to Shop
      </button>
    </div>
  );
}