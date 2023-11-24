
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { useEffect } from "react";
import AxiosSecure from "../../../ServerConfig/AxiosSecure";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";

const CheckOutForm = () => {
    const { user } = useAuth()
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [cart, refetch] = useCart()
    const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);

    useEffect(() => {

        if (totalPrice > 0) {

            AxiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log('here', res.data.clientSecret,)
                    setClientSecret(res.data.clientSecret)
                    console.log('s',clientSecret )
                })


        }

    }, [totalPrice])


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }


        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);
            }
        }

                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), 
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuid),
                    status: 'pending'
                }

                const res = await AxiosSecure.post('/payments', payment);
                console.log('payment saved', res.data);
                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment Success",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // navigate('/dashboard/paymentHistory')
                }
        
            






    };


    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

export default CheckOutForm;