import { useState } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/block/Navbar";
import booklet from "./assets/Booklet.jpeg";
import benzel from "./assets/Benzel Pendant.jpeg";
import fineglitters from "./assets/Fine Glitters.jpeg";
import keychain from "./assets/Key Chains.jpeg";
import micah from "./assets/Micah Powder.jpeg";
import solid from "./assets/Solid pigment.jpeg";
import pen from "./assets/Pen Ink.jpeg"
import bookring from "./assets/Book Ring.jpeg"

type Product = {
  id: number;
  image: any;
  name: string;
  price: number;
  quantity: number;
};

export default function App() {
  const productList: Product[] = [
    { id: 1, 
      image: booklet, 
      name: "Booklet", 
      price: 6000, 
      quantity: 0 
    },
     {
      id: 2,
      image: benzel,
      name: "Benzel Pendant",
      price: 2000,
      quantity: 0,
    },
    {
      id: 3,
      image: fineglitters,
      name: "Fine Glitters",
      price: 1500,
      quantity: 0,
    },
    {
      id: 4,
      image: keychain,
      name: "Keychain",
      price: 1000,
      quantity: 0,
    },
    {
      id: 5,
      image: micah,
      name: "Micah Powder",
      price: 2500,
      quantity: 0,
    },
    {
      id: 6,
      image: solid,
      name: "Solid Pigment",
      price: 3000,
      quantity: 0,
    },
    {
      id: 7,
      image: bookring,
      name: "Book Ring",
      price: 1300,
      quantity: 0,
    },
    {
      id: 8,
      image: pen,
      name: "Pen Ink",
      price: 300,
      quantity: 0,
    },
  ];

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productList);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const updateQuantity = (id: number, delta: number) => {
    setFilteredProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, quantity: Math.max(0, product.quantity + delta) } : product
      )
    );
  };

  const addToCart = (product: Product) => {
    if (product.quantity === 0) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
        );
      } else {
        return [...prev, { ...product }];
      }
    });

    updateQuantity(product.id, -product.quantity);
  };

  const updateCartQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <BrowserRouter>
      <Navbar products={productList} setFilteredProducts={setFilteredProducts} cartItems={cartItems} />

      <Routes>
        <Route
          path="/"
          element={
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredProducts.map((item) => (
                <div key={item.id} className="p-4 shadow rounded">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-4" />
                  )}
                  <div className="text-lg font-semibold mb-2">{item.name}</div>
                  <div>₦{item.price.toLocaleString()}</div>
                  <div className="flex items-center gap-2 my-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border rounded">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          }
        />

        <Route
          path="/cart"
          element={
            <div className="p-6 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
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
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <p className="text-gray-600">
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
                          <span className="px-2 py-1 border rounded">{item.quantity}</span>
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

                  <div className="text-right text-xl font-bold mt-4">
                    Total: ₦
                    {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
