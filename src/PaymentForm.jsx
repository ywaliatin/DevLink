import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
//import { useHistory } from 'react-router-dom';

function PaymentForm() {
  const navigate = useNavigate(); // Initialize useNavigate
  //const history = useHistory(); // Initialize useHistory

  return (
    
    <div className='headerImage2'>

<h3>Payment: $0.01 annualy</h3>
        <h3>Once the payment has been proccessed, you may post a job.</h3>
    
          <PayPalButton
        amount="0.01" 
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);
          
          // OPTIONAL: Call your server to save the transaction
          return fetch("/paypal-transaction-complete", {
            method: "post",
            body: JSON.stringify({
              orderID: data.orderID
            })
          }).then(() => {
            //history.push('/emp2jobform');
            navigate('/Emp2JobForm'); // Navigate to Emp2JobForm after successful transaction
          });
        }}
        options={{
          clientId: "AcxTQrEC8cnGnTj1BLl_Ix2fyXLadjgkf1KUYFN9hkMyXHo48DSmMW3iz64n2YV2uiaK1FcGD2-zjwdz", // Use environment variable for security reasons
          currency: "AUD"
        }}
      />
    </div>
  );
}

export default PaymentForm;
