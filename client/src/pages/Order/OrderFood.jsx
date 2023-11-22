import React, { useState, useEffect } from 'react';
import AxiosBase from '../../ServerConfig/AxiosConfig';
import Navbar from '../../components/Shared/Navbar/Navbar';
import banner2 from '../../../public/assets/shop/banner2.jpg'
import Cover from '../../components/Shared/Cover/Cover';
import Container from '../../components/Shared/Container';
import Footer from '../../components/Shared/Footer/Footer';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
const OrderFood = () => {
  const [category, setCategory] = useState('salad');
  const [menuItems, setMenuItems] = useState([]);

  const fetchMenuItems = (selectedCategory) => {
    AxiosBase.get(`/menu/${selectedCategory}`)
      .then(response => setMenuItems(response.data))
      .catch(error => console.error('Error fetching menu items:', error));
  };

  useEffect(() => {
    fetchMenuItems(category);  
  }, [category]);

  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
    fetchMenuItems(selectedCategory); 
  };

const {user}=useAuth()

const handleCart=(id,name,image,price)=>{

const item={
cartof:user.email,
menuid:id,
name:name,
image,
price
}
AxiosBase.post('/cart',item)
.then(res=>console.log(res.data))

}



  return (
    <div>
<Navbar></Navbar>
<Cover img={banner2} title={'Order Your Favourite Foods'}></Cover>

<Container>
<div>
      {/* Your category buttons go here */}
      <div className="flex justify-center space-x-4 mt-10  mb-8">
  <button
    onClick={() => handleCategoryClick('salad')}
    className={`py-2 px-4 rounded-md ${category === 'salad' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
  >
    Salad
  </button>
  <button
    onClick={() => handleCategoryClick('pizza')}
    className={`py-2 px-4 rounded-md ${category === 'pizza' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
  >
    Pizza
  </button>
  <button
    onClick={() => handleCategoryClick('drinks')}
    className={`py-2 px-4 rounded-md ${category === 'drinks' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
  >
    Drinks
  </button>
  <button
    onClick={() => handleCategoryClick('dessert')}
    className={`py-2 px-4 rounded-md ${category === 'dessert' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
  >
    Dessert
  </button>
  <button
    onClick={() => handleCategoryClick('soup')}
    className={`py-2 px-4 rounded-md ${category === 'soup' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
  >
    Soup
  </button>
  </div>

    <div>
      {/* Display menu items based on the selected category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mb-10">
        {menuItems.map(item => (
          <div key={item._id} className="bg-white p-4 rounded-md shadow-md">
            <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-500">{item.recipe}</p>
            <p className="text-primary font-semibold">${item.price.toFixed(2)}</p>
            {/* Add more details as needed */}
              <button className='btn btn-primary w-full mt-1' onClick={()=>handleCart(item._id,item.name,item.image,item.price)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>

</div>

</Container>
<Footer></Footer>
</div>
  );
};

export default OrderFood;
