/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import GetsingleItem from "../../ServerConfig/CommonApi/GetsingleItem";

const OrderCard = ({ title }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetsingleItem({ category: title });
      setItems(data);
    };

    fetchData();
  }, [title]);

  return (
    <div>
      <h1>{items.length}</h1>
      {/* Render your items here */}
      {items.map((item) => (
        <div key={item._id} className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img src={item.image} alt={item.name} className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{item.name}</h2>
            <p>{item.recipe}</p>
            <p className="text-gray-500">{item.category}</p>
            <p className="text-primary font-semibold">${item.price.toFixed(2)}</p>
            <div className="card-actions">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderCard;
