import { Helmet } from 'react-helmet-async';
import Cover from '../../components/Shared/Cover/Cover';
import menuImg from '../../assets/images/banner3.jpg'
import soupImg from '../../assets/images/soup-bg.jpg'
import saladImg from '../../assets/images/salad-bg.jpg'
import pizzaImg from '../../assets/images/pizza-bg.jpg'
import dessertImg from '../../assets/images/dessert-bg.jpeg'
import useMenu from '../../hooks/useMenu';
import SectionTitle from '../../components/Shared/SectionTitle/SectionTitle';
import MenuCategory from '../../pages/Menu/MenuCategory';
import Navbar from '../../components/Shared/Navbar/Navbar';
import Footer from '../../components/Shared/Footer/Footer';
import Container from '../../components/Shared/Container';


const Menu = () => {
    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');
    return (
        <div className='mb-10'>
            <Navbar></Navbar>
            <Helmet>
                <title>FlavorFusion | Menu</title>
            </Helmet>
            <Cover img={menuImg} title="our menu"></Cover>


            <Container>
                {/* main cover */}
                <SectionTitle subHeading="Don't Miss" heading="Today's Offer"></SectionTitle>
                {/* offered menu items */}
                <MenuCategory items={offered}></MenuCategory>
                {/* dessert menu items  */}
                <MenuCategory items={desserts} title="dessert" img={dessertImg}></MenuCategory>
                <MenuCategory items={pizza} title={"pizza"} img={pizzaImg}></MenuCategory>
                <MenuCategory items={salad} title={"salad"} img={saladImg}></MenuCategory>
                <MenuCategory items={soup} title={"soup"} img={soupImg}></MenuCategory>
                <Footer></Footer>



            </Container>


        </div>
    );
};

export default Menu;