// src/pages/CartPage.js
import React from 'react';
import useCart from '../../hooks/useCart';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2'
import AxiosBase from '../../ServerConfig/AxiosConfig';
const CartPage = () => {
    const [cart,refatch] = useCart();

    const handleDeleteItem = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                refatch()
                AxiosBase.delete(`delete/${id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });

                    }
                }
               )

            }
        });
    };

    const totalItems = cart.length;

    const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);

    const handlePay = () => {
        // You can implement the logic to handle the payment
        console.log('Processing payment...');
    };

    return (
        <div>
            <h1 className="text-4xl font-bold mb-4 text-center">My Cart</h1>

            <div className="mb-4 flex justify-between">
                <div>
                    <p className='text-xl font-semibold'>Total Items: {totalItems}</p>
                    <p className='text-xl font-semibold'>Total Price: ${totalPrice}</p>
                </div>
                <button
                    onClick={handlePay}
                    className="bg-green-500 text-white px-4 py-2 w-[120px] rounded hover:bg-green-600"
                >
                    Pay
                </button>
            </div>

            {/* Table to show items in the cart */}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Item</th>
                        <th className="border border-gray-300 px-4 py-2">Price</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-4 py-2 flex items-center">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                                {item.name}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">${item.price}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    onClick={() => handleDeleteItem(item._id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <MdDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CartPage;
