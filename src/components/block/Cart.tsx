import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Product = {
  id: number;
  image: any;
  name: string;
  price: number;
  quantity: number;
};

type CartProps = {
  cartItems: Product[];
  updateCartQuantity: (id: number, delta: number) => void;
  removeFromCart: (id: number) => void;
};

export default function Cart({
  cartItems,
  updateCartQuantity,
  removeFromCart,
}: CartProps) {
  const navigate = useNavigate ()

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto mt-15">
              <button onClick={() => navigate("/")}>
                <ArrowLeft size={24} color="black"/>
              </button>
              <h2 className="text-2xl font-bold mb-6 text-black">Your Cart</h2>
              {cartItems.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col md:flex-row items-center gap-4 p-4 border rounded shadow-sm">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                      )}
                      <div className="flex-1">
                        <h2 className="text-lg font-semibold max-md:text-center text-black">{item.name}</h2>
                        <p className="text-gray-600 max-md:text-center">
                          ₦{item.price.toLocaleString()} x {item.quantity} = ₦
                          {(item.price * item.quantity).toLocaleString()}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                          >
                            -
                          </button>
                          <span className="px-2 py-1 border-black border-2 rounded text-black">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="text-right text-xl font-bold mt-4 text-black">
                    Total: ₦
                    {total.toLocaleString()}
                  </div>

                  <button
                    onClick={() => navigate("/checkout")}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
        </div>
  );
}
