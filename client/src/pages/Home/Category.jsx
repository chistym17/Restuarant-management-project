import Marquee from "react-fast-marquee";

import slide1 from '../../../public/assets/home/slide1.jpg';
import slide2 from '../../../public/assets/home/slide2.jpg';
import slide3 from '../../../public/assets/home/slide3.jpg';
import slide4 from '../../../public/assets/home/slide4.jpg';
import slide5 from '../../../public/assets/home/slide5.jpg';
import Header from "../../components/Shared/Header/Header";




const Category = () => {

    return (
        <div>
            <Header
                subHeading={"From 11.00am to 10.00pm"}
                heading={"Order Online"}
            ></Header>

            <Marquee>
                <div className="flex ">

                    <div className="ml-2">
                        <img src={slide1} alt="" />
                        <h3 className="text-4xl uppercase text-center -mt-16 text-white">Salads</h3>
                    </div>
                    <div className="ml-2">
                        <img src={slide2} alt="" />
                        <h3 className="text-4xl uppercase text-center -mt-16 text-white">Pizzas</h3>
                    </div>
                    <div className="ml-2">
                        <img src={slide3} alt="" />
                        <h3 className="text-4xl uppercase text-center -mt-16 text-white">Soups</h3>
                    </div>
                    <div className="ml-2">
                        <img src={slide4} alt="" />
                        <h3 className="text-4xl uppercase text-center -mt-16 text-white">Desserts</h3>
                    </div>
                    <div className="ml-2">
                        <img src={slide5} alt="" />
                        <h3 className="text-4xl uppercase text-center -mt-16 text-white">Salads</h3>
                    </div>



                </div>



            </Marquee>
        </div>
    );
};

export default Category;