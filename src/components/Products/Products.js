import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

const Products = ({ handleAddToCart, isClick }) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    useEffect(() => {
        fetch("/api/products.json")
            .then((res) => res.json())
            .then((res) => setProducts(res));
    }, []);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const filteredProducts = useMemo(() => {
        return products.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    }, [currentPage, products]);

    const numberOfPages = Math.ceil(products.length / pageSize);

    const handleNextPage = () => {
        if (currentPage < numberOfPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="border border-gray-300 rounded-lg shadow-lg p-6 bg-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    >
                        <Link to={`/products/${product.id}`} className="block">
                            <img
                                src={`/api/images/${product.imageUrl}`}
                                alt={product.name}
                                className="w-full h-64 object-cover rounded-md mb-4 transition-all duration-300 transform hover:scale-105"
                            />
                        </Link>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                            {product.name}
                        </h2>
                        <div className="flex justify-between items-center">
                            <p className="text-xl font-bold text-orange-600">
                                ${product.price}
                            </p>
                            <button
                                onClick={() => handleAddToCart(product)}
                                disabled={isClick[product.id]}
                                className={`px-6 py-2 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 ${isClick[product.id]
                                    ? "bg-yellow-600 cursor-default"
                                    : "bg-orange-600 hover:bg-orange-700"}`}
                            >
                                {isClick[product.id] ? (
                                    <span className="text-lg font-bold"> Added</span>
                                ) : (
                                    "Add to Cart"
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>


            <div className="flex justify-center mt-8 items-center space-x-4">

                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${currentPage === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-orange-600 hover:bg-orange-700 text-white"}`}
                >
                    Previous
                </button>


                {[...Array(numberOfPages)].map((_, i) => (
                    <button
                        key={i}
                        className={`px-4 py-2 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-orange-600 hover:text-white shadow-md ${currentPage === i + 1
                            ? "bg-orange-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300"}`}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}


                <button
                    onClick={handleNextPage}
                    disabled={currentPage === numberOfPages}
                    className={`px-4 py-2 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${currentPage === numberOfPages
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-orange-600 hover:bg-orange-700 text-white"}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Products;
