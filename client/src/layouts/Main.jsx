import { Outlet } from 'react-router-dom'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
import Banner from '../pages/Home/Banner'
import Container from '../components/Shared/Container'
import Category from '../pages/Home/Category'
import PopularMenu from '../pages/Home/PopularMenu'
import AboutUs from '../pages/Home/AboutUs'
// import TestimonialCard from '../pages/Home/Testomonial'
const Main = () => {
  return (
    <div>
      <Navbar />
      <Banner></Banner>
      <AboutUs></AboutUs>
      <Container>   <Category></Category>
      </Container>
     <Container><PopularMenu></PopularMenu></Container>
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
{/* <Container><TestimonialCard></TestimonialCard></Container> */}
      <Footer />
    </div>
  )
}

export default Main
