/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';
import Cover from '../../components/Shared/Cover/Cover';
import MenuItem from '../../components/Shared/Menu/MenuItem';

const MenuCategory = ({items, title, img}) => {
    return (
        <div className='pt-8'>
            { title && <Cover img={img} title={title}></Cover>}
            <div className="grid md:grid-cols-2 gap-10 my-16">
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <Link to={`/order/${title}`}>
            <button className="btn btn-outline border-0 border-b-4 mt-4 ml-[500px]">Order Now</button>
            </Link>
        </div>
    );
};

export default MenuCategory;