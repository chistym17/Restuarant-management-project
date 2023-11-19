import React from 'react';
import Container from '../../components/Shared/Container';
import ngImage from '../../../public/assets/shop/banner2.jpg';

const AboutUs = () => {
  return (
    <div>
      <Container>
        <div className="relative">
          {/* Background Image */}
          <div
            className="bg-cover bg-center h-96 flex justify-center items-center"
            style={{ backgroundImage: `url(${ngImage})` }}
          >
            {/* Centered White Div */}
            <div className="bg-white p-8 rounded shadow-md text-center">
              <h2 className="text-3xl font-bold mb-4">About Us</h2>
              <p className="text-lg text-gray-700">
                Welcome to Bistro Boss, a culinary destination that brings together passion, flavor,and a touch of elegance.
        
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
