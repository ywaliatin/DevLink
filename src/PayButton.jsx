import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayButton = () => {

  const [{ isLoaded }] = usePayPalScriptReducer();
  
  if (!isLoaded) return <div>Loading...</div>;

  return (
       <PayPalButtons
        createOrder={(data, actions) => {

          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "100.00",
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          // Capture the order on approve.
          return actions.order.capture();
        }}
      />
    
  );
};

export default () => (
    <PayPalScriptProvider options={{ "client-id": "AcxTQrEC8cnGnTj1BLl_Ix2fyXLadjgkf1KUYFN9hkMyXHo48DSmMW3iz64n2YV2uiaK1FcGD2-zjwdz" }}>
      <PayButton />
    </PayPalScriptProvider>
  );
