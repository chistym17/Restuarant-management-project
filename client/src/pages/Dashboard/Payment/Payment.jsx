import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import NavBar from "../../../components/Shared/Navbar/Navbar";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    return (
          <div>

            <NavBar></NavBar>

            <div className="max-w-md mx-auto mt-14 p-4 bg-gray-200 rounded-md shadow-md " >
                <h1 className="text-3xl font-semibold mb-4 text-center">Membership Page</h1>
                <p className="text-gray-700 text-center mb-6">
                    Unlock premium features by becoming a member. For just $5, you can enjoy exclusive benefits.
                </p>

                <div className="mb-8">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm></CheckoutForm>
                    </Elements>
                </div>

                <p className="text-gray-500 text-center">
                    Premium members can post more than 5 posts and access other exciting features.
                </p>
            </div>




        </div>
    );
};

export default Payment;