import Product  from "../../App"

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
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 border rounded shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600">
                    ₦{item.price.toLocaleString()}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateCartQuantity(item.id, -1)}
                      className="px-3 py-1 bg-gray-300 rounded"
                    >
                      -
                    </button>

                    <span className="px-3 py-1 border rounded">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateCartQuantity(item.id, 1)}
                      className="px-3 py-1 bg-gray-300 rounded"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="font-semibold">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className="text-right text-2xl font-bold mt-6">
            Total: ₦{total.toLocaleString()}
          </div>
        </>
      )}
    </div>
  );
}
