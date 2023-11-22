// SideNav.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingCart } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { VscPreview } from 'react-icons/vsc';

const SideNav = () => {
  return (
    <nav className="bg-green-400 text-white p-4 h-screen">
      <div className="mb-4 text-3xl font-bold">
        <h1>My Dashboard</h1>
      </div>
      <ul>
        <li className="my-2 flex items-center">
          <FaHome className="mr-2" />
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li className="my-2 flex items-center">
          <FaShoppingCart className="mr-2" />
          <Link to="/mycart" className="hover:underline">
            My Cart
          </Link>
        </li>
        <li className="my-2 flex items-center">
          <CgProfile className="mr-2" />
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
        </li>
        <li className="my-2 flex items-center">
          <VscPreview className="mr-2" />
          <Link to="/addreview" className="hover:underline">
            Add Review
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
