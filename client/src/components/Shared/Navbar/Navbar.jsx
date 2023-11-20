import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container';
import logoImg from '../../../assets/images/logo.png';
import MenuDropdown from './MenuDropdown';

const Navbar = () => {
  return (
    <div className='fixed w-full bg-gray text-white z-10 bg-opacity-20  shadow-sm'>
      <div className=' border-b-[1px]'>
        <Container>
          <div className='flex flex-row items-center  justify-between gap-3 md:gap-0'>

            {/* Restaurant Name on the Left */}
            <div className='text-lg font-bold ml-4'>
              Bistro Boss
            </div>

            {/* Left-side Links */}
            <div className='flex space-x-4 '>
              <Link to='/home'>Home</Link>
              <Link to='/contact-us'>Contact Us</Link>
              <Link to='/dashboard'>Dashboard</Link>
              <Link to='/our-menu'>Our Menu</Link>
              <Link to='/order'>Order Foods</Link>
            </div>

            {/* Dropdown Menu */}
            <MenuDropdown />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
