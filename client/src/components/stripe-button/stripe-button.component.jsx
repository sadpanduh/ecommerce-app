import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    //Stripe wants the price in cents
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_xvgjp4FHbut3JJdcR2ROjBE800jEzP9ksy';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert("Payment Successful!");
        }).catch(error => {
            console.log('Payment Error: ', JSON.parse(error));
            alert(
                'There was an issue with your payment. Please make sure you use the provided credit card.'
            );
        })
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='Ecommerce Shop'
            billingAddress
            shippingAddress
            image='http://svgshare.com/i/CUz.svg'
            description={`Your Total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;