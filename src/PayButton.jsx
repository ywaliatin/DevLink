import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayButton = () => {
  return (
    <PayPalScriptProvider options={{ "client-id": "ENZ7fD6INvv6PJy0Gqu1ENA5rEYw-OYlJyQdyqPLVOocrnUO7BT478qV20t1vtP-XLL9xzY9vHtuQjIy" }}>
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
    </PayPalScriptProvider>
  );
};

export default PayButton;
