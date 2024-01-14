import { useEffect, useState } from "react";
import MenuItem from "../../components/Shared/Menu/MenuItem";
import Header from "../../components/Shared/Header/Header";
import { Link } from "react-router-dom";


const PopularMenu = () => {
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        fetch('menu.json')
            .then(res => res.json())
            .then(data => {
                const popularItems = data.filter(item => item.category === 'popular');
                setMenu(popularItems)
            })
    }, [])
    return (
        <section className="mb-12">
            <Header
                heading="From Our Menu"
                subHeading="Popular Items"
            ></Header>
            <div className="grid md:grid-cols-2 gap-10">
                {
                    menu.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>

            <Link to='/menu'>

                <button className="btn btn-outline border-0 border-b-4 mt-6 ml-[600px]">View Full Menu</button>


            </Link>
        </section>
    );
};

export default PopularMenu;