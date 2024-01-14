
import { loadStripe } from "@stripe/stripe-js";
import {  Elements } from "@stripe/react-stripe-js";
import Header from "../../Shared/Header/Header";
import CheckOutForm from "./CheckOutForm";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_key);


const StripePay = () => {

 

    return (
      <div>
            <Header heading="Payment" subHeading="Please pay to eat"></Header>
           <div className="max-w-md mx-auto mt-4 p-4 bg-gray-200 rounded-md shadow-md " >
                <h1 className="text-3xl font-semibold mb-4 text-center">Payment</h1>
                <p className="text-gray-700 text-center mb-6">
                </p>

                <div className="mb-8">
                    <Elements stripe={stripePromise}>
                        <CheckOutForm></CheckOutForm>
                    </Elements>
                </div>

                <p className="text-gray-500 text-center">
                </p>
            </div>
        </div>
    );
};

export default StripePay;