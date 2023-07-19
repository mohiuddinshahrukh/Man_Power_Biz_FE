import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import { postCallWithHeaders } from "../../helpers/apiCallHelpers";
import { Grid } from "@mantine/core";
import { backendURL } from "../../helpers/config";
import './CheckoutForm.css'
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51LZZvfE15s0GgNMhr1G5APbmPXyGbm10KdljXh7FWBA9QvUtisLvRVN6SAswoq2M1D6v5f0hTi484tqZDs50P8Rq00pU0tq3QQ");

export default function App() {
    const [clientSecret, setClientSecret] = useState("");

    const getPaymentIntent = async () => {
        const apiRes = await postCallWithHeaders('admin/create-payment-intent', { items: [{ id: "xl-tshirt" }] })
        return apiRes.clientSecret
    }
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch(`${backendURL()}/admin/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            Authorization: `Bearer ${localStorage.getItem("adminDataToken")}`,
            body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
        // getPaymentIntent().then(setClientSecret)
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <Grid>
            <Grid.Col span={8}>
                <div className="App">
                    {clientSecret && (
                        <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    )}
                </div>
            </Grid.Col>
        </Grid>
    );
}