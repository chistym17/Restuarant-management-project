
import { loadStripe } from "@stripe/stripe-js";
import {  Elements } from "@stripe/react-stripe-js";
import Header from "../../Shared/Header/Header";
import CheckOutForm from "./CheckOutForm";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_key);


const StripePay = () => {

 

    return (
      <div>
            <Header heading="Payment" subHeading="Please pay to eat"></Header>
            <div>
                <Elements  stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default StripePay;