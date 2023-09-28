import React from 'react';
import {PayPalButton} from 'react-paypal-button-v2';
import { useHistory } from 'react-router-dom';


function PaymentForm() {
    const history = useHistory();

  return (
    
    <div>
        <h3>Payment: AUD5/ annually</h3>
        <p>Once the payment has been processed, you may post a job.</p>
      <PayPalButton
        amount="0.01" // You can set up the amount you want to charge
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);
          
            // OPTIONAL: Call your server to save the transaction
            return fetch("/paypal-transaction-complete", {
                method: "post",
                body: JSON.stringify({
                  orderID: data.orderID
                })
              }).then(() => {
                console.log(history);
                history.push('/JobPage'); // Navigate to Emp2JobForm after successful transaction
              });
            }}
        options={{
          clientId: "AcxTQrEC8cnGnTj1BLl_Ix2fyXLadjgkf1KUYFN9hkMyXHo48DSmMW3iz64n2YV2uiaK1FcGD2-zjwdz", // Replace with your sandbox client ID
          currency: "AUD"
        }}
      />
    </div>
  );
}

export default PaymentForm;
