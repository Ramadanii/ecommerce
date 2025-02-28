import { Link } from "react-router-dom";
import { useState } from "react";

function Header({ cartItems, handleRemoveFromCart }) {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className="flex justify-between items-center p-6 bg-gradient-to-r from-orange-400 to-brown-500 shadow-lg">
            <Link to="/" className="flex items-center gap-4">
                <h1 className="text-5xl font-extrabold text-white hover:text-yellow-300 transition duration-300">
                    Ecommerce
                </h1>
            </Link>

            <div className="flex gap-8 items-center">
                <Link
                    to="/login"
                    className="bg-white text-gray-900 px-6 py-3 rounded-lg text-xl font-medium shadow-md transition duration-300 transform hover:scale-105 hover:bg-[#4a2c2a] hover:text-white"
                >
                    Login
                </Link>


                <div className="relative">
                    <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative">
                        <img
                            src="api/images/shoppingcart.png"
                            alt="Shopping Cart"
                            className="w-7 h-7 cursor-pointer text-white"
                        />
                        {cartItems.length > 0 && (
                            <span className="absolute bottom-5 left-5 text-xs bg-red-600 text-white rounded-full px-2 py-1">
                                {cartItems.length}
                            </span>
                        )}
                    </button>

                    {isCartOpen && (
                        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-3 z-10">
                            <h3 className="text-lg font-bold text-gray-800">Your Cart</h3>
                            {cartItems.length > 0 ? (
                                <ul className="mt-2">
                                    {cartItems.map((item) => (
                                        <li key={item.id} className="flex justify-between items-center border-b py-2">
                                            <Link to={`/products/${item.id}`} className="flex items-center gap-3">
                                                <img src={`/api/images/${item.imageUrl}`} alt={item.name} className="w-12 h-12 rounded" />
                                                <div>
                                                    <p className="text-gray-700 text-sm font-semibold hover:text-[#e21d12] transition duration-300">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-gray-500 text-xs">${item.price}</p>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 text-sm mt-2">Your Cart is empty.</p>
                            )}

                            {cartItems.length > 0 && (
                                <div className="mt-3 flex justify-between items-center">
                                    <button
                                        onClick={() => handleRemoveFromCart(cartItems[0].id)} // Heq produktin i parë nga karroca si shembull
                                        className="text-red-600 text-sm font-bold hover:text-red-800 transition duration-300"
                                    >
                                        Remove first product
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
