/*eslint-disable*/
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import {
  Button,
  Center,
  Grid,
  LoadingOverlay,
  Paper,
  Select,
  Stepper,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import "./CheckoutForm.css";
import { ArrowLeft, ArrowRight } from "tabler-icons-react";
import { stripeHandlePayment } from "../../helpers/stripePaymentHelper";
import PaymentPolicy from "./PaymentPolicy";
import InvoiceViewCard from "../cards/InvoiceViewCard";
import { useNavigate } from "react-router-dom";
import { routes } from "../../helpers/routesHelper";
import { getCallWithHeaders } from "../../helpers/apiCallHelpers";

const stripePromise = loadStripe(
  "pk_test_51LZZvfE15s0GgNMhr1G5APbmPXyGbm10KdljXh7FWBA9QvUtisLvRVN6SAswoq2M1D6v5f0hTi484tqZDs50P8Rq00pU0tq3QQ"
);

const Test = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // User
  const [customers, setCustomers] = useState([]);

  // Payment
  const [paymentValue, setPaymentValue] = useState(0);

  // Bookings
  const [bookings, setBookings] = useState([]);
  const [paidBooking, setPaidBooking] = useState({});

  // External Stripe
  const [clientSecret, setClientSecret] = useState("");
  const [externalStripe, setExternalStripe] = useState(null);
  const [externalElements, setExternalElements] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Stepper
  const [active, setActive] = useState(0);
  const [disabledStepper, setDisabledStepper] = useState(false);
  const nextStep = () =>
    setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const getData = async () => {
    const [customers, bookings] = await Promise.all([
      getCallWithHeaders("admin/getAllUsers"),
      getCallWithHeaders("admin/getAllBookings"),
    ]);

    setCustomers(customers);
    setBookings(bookings);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Paper
      pos={"relative"}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <LoadingOverlay
        visible={loading}
        loaderProps={{ size: "xl", color: "pink", variant: "bars" }}
        overlayOpacity={0.5}
        overlayColor="#c5c5c5"
      />
      <Center>
        <Paper
          py="xl"
          style={{
            width: "80%",
            height: "100%",
          }}
        >
          <Title order={2} align="center" py="xl">
            Add Payment
          </Title>
          <Stepper
            color="grape"
            active={active}
            onStepClick={setActive}
            breakpoint="sm"
            pt="xl"
          >
            <Stepper.Step
              disabled={disabledStepper}
              label="Payment Details"
              description="General Details"
              allowStepSelect={active > 0}
            >
              <Text weight="bold" size="xl" py="md">
                General Details
              </Text>

              <Grid>
                <Grid.Col sm={12} lg={6}>
                  <Select
                    required
                    size="md"
                    label={"Select Customer"}
                    data={[
                      { value: "react", label: "React" },
                      { value: "ng", label: "Angular" },
                      { value: "svelte", label: "Svelte" },
                      { value: "vue", label: "Vue" },
                    ]}
                    placeholder="Select Customer"
                  />
                </Grid.Col>
                <Grid.Col sm={12} lg={6}>
                  <Select
                    required
                    size="md"
                    placeholder="Select Booking"
                    label={"Select Booking"}
                    data={[
                      { value: "react", label: "React" },
                      { value: "ng", label: "Angular" },
                      { value: "svelte", label: "Svelte" },
                      { value: "vue", label: "Vue" },
                    ]}
                  />
                </Grid.Col>

                <Grid.Col lg={6}>
                  <Select
                    placeholder="Select Booking"
                    required
                    size="md"
                    label={"Booked Service"}
                    data={[
                      { value: "react", label: "React" },
                      { value: "ng", label: "Angular" },
                      { value: "svelte", label: "Svelte" },
                      { value: "vue", label: "Vue" },
                    ]}
                  />
                </Grid.Col>
                <Grid.Col lg={6}>
                  <Select
                    placeholder="Select Booking"
                    required
                    size="md"
                    label={"Booked Package"}
                    data={[
                      { value: "react", label: "React" },
                      { value: "ng", label: "Angular" },
                      { value: "svelte", label: "Svelte" },
                      { value: "vue", label: "Vue" },
                    ]}
                  />
                </Grid.Col>
                <Grid.Col lg={12}>
                  <TextInput required size="md" label={"Payment Amount"} />
                </Grid.Col>
                <Grid.Col lg={12}>
                  <Textarea
                    size="md"
                    label={"Payment Details"}
                    maxLength={200}
                    maxRows={3}
                    minRows={3}
                  />
                </Grid.Col>
              </Grid>

              <Grid justify="flex-end" py="md">
                <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                  <Button
                    fullWidth
                    leftIcon={<ArrowLeft />}
                    color="red"
                    size="md"
                    onClick={prevStep}
                  >
                    BACK
                  </Button>
                </Grid.Col>

                <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                  <Button
                    fullWidth
                    rightIcon={<ArrowRight />}
                    size="md"
                    color="dark"
                    onClick={nextStep}
                  >
                    NEXT
                  </Button>
                </Grid.Col>
              </Grid>
            </Stepper.Step>

            <Stepper.Step
              disabled={disabledStepper}
              label="Make Payment"
              description="Payment Details"
              allowStepSelect={active > 0}
            >
              <Text weight="bold" size="xl" py="md">
                Payment Details
              </Text>

              <Grid align="start">
                <Grid.Col sm={12} md={6} lg={6}>
                  <PaymentPolicy />
                </Grid.Col>
                <Grid.Col sm={12} md={6} lg={6}>
                  {clientSecret.length > 0 && (
                    <Elements options={options} stripe={stripePromise}>
                      <CheckoutForm
                        clientSecret={clientSecret}
                        paymentValue={paymentValue}
                        selectedBooking={selectedBooking}
                        setMessage={setMessage}
                        message={message}
                        setExternalElements={setExternalElements}
                        externalElements={externalElements}
                        externalStripe={externalStripe}
                        setExternalStripe={setExternalStripe}
                      />
                    </Elements>
                  )}
                </Grid.Col>
              </Grid>
              <Grid justify="flex-end" py="md">
                <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                  <Button
                    fullWidth
                    leftIcon={<ArrowLeft />}
                    color="red"
                    size="md"
                    onClick={prevStep}
                  >
                    BACK
                  </Button>
                </Grid.Col>

                <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                  <Button
                    fullWidth
                    rightIcon={<ArrowRight />}
                    size="md"
                    color="dark"
                    onClick={() => {
                      stripeHandlePayment(
                        externalStripe,
                        externalElements,
                        setIsLoading,
                        selectedBooking,
                        paymentValue,
                        setMessage,
                        nextStep,
                        setDisabledStepper,
                        setPaidBooking,
                        setLoading
                      );
                    }}
                    uppercase
                  >
                    pay {paymentValue.toLocaleString()} now
                  </Button>
                </Grid.Col>
              </Grid>
            </Stepper.Step>
            <Stepper.Completed>
              <Title align="center" order={2}>
                Payment Completed
              </Title>

              <InvoiceViewCard data={paidBooking} />
              <Grid justify="flex-end" py="md">
                <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                  <Button
                    fullWidth
                    rightIcon={<ArrowRight />}
                    size="md"
                    color="dark"
                    onClick={() => {
                      nextStep();
                      //   navigate(routes.viewPayments);
                    }}
                  >
                    All Payments
                  </Button>
                </Grid.Col>
              </Grid>
            </Stepper.Completed>
          </Stepper>
        </Paper>
      </Center>
    </Paper>
  );
};

export default Test;
