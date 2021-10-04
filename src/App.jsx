import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe("pk_test_51JgDERHLYdmDsJssopGfBXNbGHFYOsZjsja6QiQYHecVEZhrMBYAAZeWpGeVudQszY2HSZoHf0Wr3F3UhxlZ24a900rua6hl4C");

export default function App() {
  return (
    <div className="App">
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
