import Container from '../../components/Shared/Container';
import ngImage from '../../../public/assets/shop/banner2.jpg';
import { TypeAnimation } from 'react-type-animation';
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
              <h2 className="text-3xl font-bold mb-4">FlavorFusion</h2>
              <div>

                <TypeAnimation
                  sequence={[
                    'Welcome to FlavorFusion Eaterie -',
                    1000,
                    'Embark on a gastronomic adventure where diverse tastes converge, creating a symphony of flavors that dance on your palate.',
                   
                  ]}
                  wrapper="span"
                  speed={50}
                  style={{ fontSize: '2em', display: 'inline-block' }}
                  repeat={Infinity}
                />


              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
