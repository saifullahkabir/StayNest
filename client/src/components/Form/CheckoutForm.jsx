/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { ImSpinner9 } from 'react-icons/im'
import './CheckoutForm.css';
import { useState } from 'react';
import { useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const CheckoutForm = ({ closeModal, bookingInfo, refetch }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState();
    const [cardError, setCardError] = useState('');
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        // fetch client secret
        if (bookingInfo?.price) {
            getClientSecret({ price: bookingInfo?.price });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookingInfo?.price]);

    // get clientSecret
    const getClientSecret = async price => {
        const { data } = await axiosSecure.post(`/create-payment-intent`, price);
        console.log('client secret from server --->', data);
        setClientSecret(data.clientSecret);

    }

    // save bookings data in db
    const { mutateAsync } = useMutation({
        mutationFn: async (paymentInfo) => {
            const { data } = await axiosSecure.post(`/booking`, paymentInfo);
            console.log(data);
            return data;
        },
        onSuccess: () => {
            toast.success('Room Booked Successfully!');
            closeModal();
        }

    })

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error?.message);
            setProcessing(false);
            return;
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setCardError('');
        }

        // confirm payment 
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName,
                },
            }
        });

        if (confirmError) {
            console.log("confirmError", confirmError);
            setCardError(confirmError?.message);
            setProcessing(false);
            return;
        }

        if (paymentIntent.status === "succeeded") {
            // 1. create payment info object 
            const paymentInfo = {
                ...bookingInfo,
                roomId: bookingInfo._id,
                transactionId: paymentIntent.id,
                date: new Date()
            }

            // delete for room(paymentInfo) data
            delete paymentInfo._id;
            delete paymentInfo.booked;

            try {
                // 2. save payment info in bookings collection (db)
                await mutateAsync(paymentInfo);

                // 3. change room status to booked in db
                await axiosSecure.patch(`/room/status/${bookingInfo?._id}`, { status: true });

                // update ui(reserve btn disabled)
                refetch();
                navigate('/dashboard/my-bookings');
            }
            catch (err) {
                toast.error(err);
            }
        }
        setProcessing(false);
    };



    return (
        <>
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

                <div className='flex mt-3 justify-around'>
                    <button
                        onClick={closeModal}
                        type='button'
                        className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                    >
                        Cancel
                    </button>
                    <button
                        type="submit" disabled={!stripe || !clientSecret || processing}
                        className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'

                    >
                        {
                            processing ?
                                (<ImSpinner9 className='animate-spin text-xl m-auto'></ImSpinner9>)
                                :
                                (`Pay ${bookingInfo?.price}$`)
                        }
                    </button>
                </div>
            </form>
            <div>
                {cardError && <p className='mt-2  text-red-600'>{cardError}</p>}
            </div>
        </>
    );
};

export default CheckoutForm;