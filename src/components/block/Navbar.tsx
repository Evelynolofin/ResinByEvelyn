import { Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { Link, useLocation } from "react-router-dom";

type Product = {
  id: number;
  image: any;
  name: string;
  price: number;
  quantity: number;
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type NavbarProps = {
  products: Product[];
  setFilteredProducts: (items: Product[]) => void;
  cartItems: CartItem[];
};

export default function Navbar({ products, setFilteredProducts, cartItems, }: NavbarProps) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [search, setSearch] = useState ("");

  const display = useLocation()

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setSearch(value);

  if (value.trim() === "") {
    setFilteredProducts(products);
    return;
  }

  const filtered = products.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase())
  );

  setFilteredProducts(filtered);
};

const isCartPage = display.pathname === "/cart";

  return (
    <nav className="flex items-center justify-between bg-blue-600 text-white p-4 fixed top-0 left-0 w-full z-50">
      <h1 className="text-2xl">ResinByEvelyn</h1>

      <div className="flex items-center gap-4">
        {!isCartPage && (
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 max-md:border-0">
            <Search className="w-5 h-5 text-gray-300 max-md:hidden"/>
                <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={handleSearch}
                className="bg-transparent outline-none ml-2 w-100 max-md:hidden"
            />
        </div>
        )}

        <Link to="/cart" className="relative">
        <ShoppingCart className="w-7 h-7" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {totalItems}
          </span>
        )}
      </Link>
      </div>
    </nav>
  );
}
