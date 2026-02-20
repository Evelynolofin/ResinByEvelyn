import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "./components/block/Navbar";
import booklet from "./assets/Booklet.jpeg";
import benzel from "./assets/Benzel Pendant.jpeg";
import fineglitters from "./assets/Fine Glitters.jpeg";
import keychain from "./assets/Key Chains.jpeg";
import micah from "./assets/Micah Powder.jpeg";
import solid from "./assets/Solid pigment.jpeg";
import pen from "./assets/Pen Ink.jpeg"
import bookring from "./assets/Book Ring.jpeg";
import { useEffect } from "react";
import Payment from "./components/block/Payment";
import Cart from "./components/block/Cart";

type Product = {
  id: number;
  image: any;
  name: string;
  price: number;
  quantity: number;
};

type DeliveryForm = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  state: string;
  message: string;
};

function AppContent() {
  const navigate = useNavigate();

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

  const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
  "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "Federal Capital Territory (FCT)",
  ];

  const shippingRates: Record<string, number> = {
  "Lagos": 2000,
  "Ogun": 2500,
  "Oyo": 3000,
  "Osun": 3000,
  "Ekiti": 3500,
  "Ondo": 3500,
  "Edo": 4000,
  "Delta": 4000,
  "Rivers": 4500,
  "Bayelsa": 4500,
  "Anambra": 4000,
  "Enugu": 4000,
  "Imo": 4000,
  "Abia": 4000,
  "Ebonyi": 4500,
  "Cross River": 4500,
  "Akwa Ibom": 4500,
  "Benue": 4500,
  "Kogi": 4000,
  "Kwara": 3500,
  "Abuja": 3500,
  "Federal Capital Territory (FCT)": 3500,
  "Nasarawa": 4000,
  "Plateau": 4500,
  "Niger": 4000,
  "Kaduna": 5000,
  "Kano": 5500,
  "Katsina": 5500,
  "Kebbi": 6000,
  "Sokoto": 6000,
  "Zamfara": 6000,
  "Jigawa": 5500,
  "Bauchi": 5500,
  "Gombe": 5500,
  "Adamawa": 6000,
  "Taraba": 6000,
  "Yobe": 6500,
  "Borno": 6500,
};

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productList);
  
  const [cartItems, setCartItems] = useState<Product[]>(() => {
  const stored = localStorage.getItem("cartItems");
  return stored ? JSON.parse(stored) : [];
  });

  const [details, setDetails] = useState<"delivery" | "pickup">("delivery")

  const [form, setForm] = useState<DeliveryForm>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    message: ""
  });

  const [addressSaved, setAddressSaved] = useState(false);

  // const [cartItems, setCartItems] = useState<Product[]>([]);
  // const [cartLoaded, setCartLoaded] = useState(false);

  // useEffect(() => {
  //   if (typeof window === "undefined") return

  //   try {
  //     const stored = window.localStorage.getItem("cartItems")
  //     if (stored) {
  //       setCartItems(JSON.parse(stored))
  //     }
  //   } catch (err) {
  //     console.error("Cart parse error:")
  //     window.localStorage.removeItem("caerItems")
  //   }
  //   setCartLoaded(true)
  // }, [])

  // useEffect(() => {
  //   if (!cartLoaded || typeof window === "undefined") return;

  //   window.localStorage.setItem("cartItems", JSON.stringify(cartItems))
  // }, [cartItems, cartLoaded])
  
  useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

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

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee =
    details === "delivery" && form.state ? (shippingRates[form.state] ?? 0) : 0;
  const total = subtotal + shippingFee;


  const inputClass =
  "w-full min-w-0 border border-gray-300 rounded-lg px-3 py-2 text-base outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black";

  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setAddressSaved(false);
  };

  const handleSaveAddress = () => {
    const { firstName, lastName, phone, email, address, state } = form;
    if (!firstName || !lastName || !phone || !email || !address || !state) {
      alert("Please fill in all fields before saving.");
      return;
    }
    setAddressSaved(true);
  };

  const handleConfirm = () => {
    if (details === "delivery" && !addressSaved) {
      alert("Please fill in and save your delivery address first.");
      return;
    }
    if (details === "pickup" && (!form.firstName || !form.lastName || !form.phone || !form.email)) {
      alert("Please fill in your contact details before confirming.");
      return;
    }
    navigate("/payment", {
      state: {
        form,
        total,
        subtotal,
        shippingFee,
        details
      }
    })

    setCartItems([]);

    setForm({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      state: "",
      message: ""
    });
    setAddressSaved(false);
    setDetails("delivery");
  };


  return (
    <>
      <Navbar products={productList} setFilteredProducts={setFilteredProducts} cartItems={cartItems} />

      <Routes>
        <Route
          path="/"
          element={
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 mt-15">
              {filteredProducts.map((item) => (
                <div key={item.id} className="p-4 shadow rounded">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-4 rounded-xl" />
                  )}
                  <div className="text-lg font-semibold mb-2 text-black max-md:text-sm">{item.name}</div>
                  <div className="text-black">₦{item.price.toLocaleString()}</div>
                  <div className="flex items-center gap-2 my-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      -
                    </button>
                      <span className="w-9 h-9 flex items-center justify-center rounded border-black border-2 text-black">
                        {item.quantity}
                      </span>
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

        <Route path="/cart" 
          element={
          <Cart
            cartItems={cartItems}
            updateCartQuantity={updateCartQuantity}
            removeFromCart={removeFromCart}
          />} 
        />

        <Route
          path="/checkout"
          element={
            <div className="p-4 md:p-6 max-w-2xl mx-auto mt-15 overflow-hidden">
              <button onClick={() => navigate("/cart")} className="mb-4">
                <ArrowLeft size={24} color="black"/>
              </button>
              <h2 className="text-2xl font-bold mb-4 text-black">Checkout</h2>

              {cartItems.length === 0 ? (
                <p className="text-gray-600">No items to checkout.</p>
              ) : (
                <div className="space-y-6">
                  <div className="flex rounded-lg overflow-hidden border border-blue-600">
                    <button
                      onClick={() => {
                        setDetails("delivery");
                        setAddressSaved(false);
                      }}
                      className={`flex-1 py-2 font-semibold text-sm transition ${
                        details === "delivery"
                          ? "bg-blue-600 text-white"
                          : "bg-white text-blue-600"
                      }`}
                    >
                      🚚 Delivery
                    </button>
                    <button
                      onClick={() => setDetails("pickup")}
                      className={`flex-1 py-2 font-semibold text-sm transition ${
                        details === "pickup"
                          ? "bg-blue-600 text-white"
                          : "bg-white text-blue-600"
                      }`}
                    >
                      🏪 Pickup
                    </button>
                  </div>

                  {details === "delivery" ? (
                    <div className="border rounded-lg p-4 bg-gray-50 space-y-4">
                      <p className="font-semibold text-gray-700">Delivery Details</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>First Name</label>
                          <input
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                            value={form.firstName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                                setForm(prev => ({ ...prev, firstName: onlyLetters }));
                              }}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Last Name</label>
                          <input
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                            value={form.lastName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                              setForm(prev => ({ ...prev, lastName: onlyLetters }));
                            }}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass} htmlFor="phone">Phone Number</label>
                          <input
                            name="phone"
                            inputMode="numeric"
                            type="text"
                            placeholder="e.g. 08012345678"
                            value={form.phone}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              const onlyNumbers = e.target.value.replace(/\D/g, "");
                              setForm(prev => ({ ...prev, phone: onlyNumbers }));
                            }}
                            className={inputClass}
                            maxLength={11}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Email</label>
                          <input
                            name="email"
                            inputMode="email"
                            type="email"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={handleFormChange}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Shipping Address</label>
                        <input
                          name="address"
                          type="text"
                          placeholder="House number, street, city..."
                          value={form.address}
                          onChange={handleFormChange}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>State</label>
                        <select
                          name="state"
                          value={form.state}
                          onChange={handleFormChange}
                          className={inputClass}
                        >
                          <option value="" disabled>Select State</option>
                          {nigerianStates.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      <button
                        onClick={handleSaveAddress}
                        className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition"
                      >
                        {addressSaved ? "✅ Address Saved" : "Save Address"}
                      </button>
                    </div>
                  ) : (
                    <div className="border rounded-lg p-4 bg-gray-50 space-y-2">
                      <p className="font-semibold text-gray-700">Pickup Location</p>
                      <p className="text-sm text-gray-600">
                        📍 ResinByEvelyn Store, Oju Ore, Nigeria
                      </p>
                      <p className="text-sm text-gray-500">
                        You'll be contacted to confirm a pickup time after your order is placed.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>First Name</label>
                          <input
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                            value={form.firstName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                              setForm(prev => ({ ...prev, firstName: onlyLetters }));
                            }}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Last Name</label>
                          <input
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                            value={form.lastName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                              setForm(prev => ({ ...prev, lastName: onlyLetters }));
                            }}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass} htmlFor="phone">Phone Number</label>
                          <input
                            name="phone"
                            inputMode="numeric"
                            type="text"
                            placeholder="e.g. 08012345678"
                            value={form.phone}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              const onlyNumbers = e.target.value.replace(/\D/g, "");
                              setForm(prev => ({ ...prev, phone: onlyNumbers }));
                            }}
                            className={inputClass}
                            maxLength={11}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Email</label>
                          <input
                            inputMode="email"
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={handleFormChange}
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="message">Note for merchant</label>
                        <textarea
                          id="message"
                          name="message"
                          value={form.message}
                          onChange={handleFormChange}
                          className={inputClass}
                          placeholder="Write your note here..."
                          rows={4}
                        />
                      </div>
                    </div>
                  )}

                  <div className="border rounded-lg shadow-sm overflow-hidden">
                    <p className="px-4 pt-4 font-semibold text-gray-700">Order Summary</p>
                    <div className="divide-y mt-2">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between px-4 py-3 gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium text-sm text-black">{item.name}</p>
                              <p className="text-xs text-gray-500">
                                ₦{item.price.toLocaleString()} × {item.quantity}
                              </p>
                            </div>
                          </div>
                          <p className="font-semibold text-sm whitespace-nowrap text-black">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="px-4 py-3 bg-gray-50 border-t space-y-1">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span>₦{subtotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Shipping</span>
                            <span>
                              {details === "pickup"
                                ? "Free (Pickup)"
                                : form.state
                                ? `₦${(shippingRates[form.state])}`
                                : "Select a state"}
                            </span>
                          </div>
                          <div className="flex justify-between text-base font-bold text-gray-800 border-t pt-2">
                            <span>Total</span>
                            <span className="text-blue-600">₦{total.toLocaleString()}</span>
                          </div>
                        </div>

                    <div className="px-4 py-4">
                      <button
                        onClick={handleConfirm}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                      >
                        Confirm & Pay ₦{total.toLocaleString()}
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </div>
          }
        />
        
        <Route path="/payment" element={<Payment />} />
      </Routes>
      </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent/>
    </BrowserRouter>
  );
}
