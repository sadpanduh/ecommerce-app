import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    //Stripe wants the price in cents
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_xvgjp4FHbut3JJdcR2ROjBE800jEzP9ksy';
    
    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return(
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