/*eslint-disable*/
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import {
  Badge,
  Button,
  Center,
  Grid,
  Group,
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
import {
  getCallWithHeaders,
  postCallWithHeaders,
} from "../../helpers/apiCallHelpers";
import CheckoutFormCustomer from "../customer-components/CheckoutForm-Customer";
import PaymentForm from "./PaymentForm";
import { failureNotification } from "../../helpers/notificationHelper";
import { useForm } from "@mantine/form";

const stripePromise = loadStripe(
  "pk_test_51LZZvfE15s0GgNMhr1G5APbmPXyGbm10KdljXh7FWBA9QvUtisLvRVN6SAswoq2M1D6v5f0hTi484tqZDs50P8Rq00pU0tq3QQ"
);

const Test = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // User
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState({});

  // Payment
  const [paymentValue, setPaymentValue] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState("");
  const [paymentID, setPaymentID] = useState("");

  // Bookings
  const [paidBooking, setPaidBooking] = useState({});
  const [bookingDates, setBookingDates] = useState([]);
  const [selectedBookingID, setSelectedBookingID] = useState("");
  const [bookedServices, setBookedServices] = useState([]);
  const [bookedPackages, setBookedPackages] = useState([]);
  const [bookingPrice, setBookingPrice] = useState(0);

  // External Stripe
  const [clientSecret, setClientSecret] = useState("");
  const [externalStripe, setExternalStripe] = useState(null);
  const [externalElements, setExternalElements] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState({});
  const [dataToSend, setDataToSend] = useState({});
  const [newBookingId, setNewBookingId] = useState("");

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  // Stepper
  const [active, setActive] = useState(0);
  const [disabledStepper, setDisabledStepper] = useState(false);
  const nextStep = () =>
    setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const getData = async () => {
    const customersWithBookings = await getCallWithHeaders(
      "admin/get-customers-with-pending-payments"
    );
    setCustomers(customersWithBookings);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (selectedCustomer?._id) {
      const selectedCustomerBookings = customers.find(
        (customer) => customer?._id === selectedCustomer?._id
      )?.bookings;

      if (selectedCustomerBookings) {
        const filteredDates = selectedCustomerBookings
          .filter((booking) => booking?.bookingPaymentStatus !== "FULL")
          .map((booking) => ({
            value: booking?._id,
            label: booking?.bookingId,
          }));

        setBookingDates(filteredDates);
      }
    }
  }, [selectedCustomer, customers]);

  useEffect(() => {
    if (selectedBookingID) {
      const selectedBooking = customers
        .flatMap((customer) => customer.bookings)
        .find((booking) => booking._id === selectedBookingID);

      if (selectedBooking) {
        setBookedPackages(selectedBooking.bookingPackage);
        setBookedServices(selectedBooking.bookingService);
        setBookingPrice(selectedBooking.bookingPrice);
        setPaymentID(selectedBooking._id);
        setNewBookingId(selectedBooking.bookingId);
      }
    }
  }, [selectedBookingID, customers]);

  const paymentIntentCreator = async () => {
    const apiResponse = await postCallWithHeaders(
      "customer/customer-payment-intent",
      {
        amount: bookingPrice,
      }
    );
    if (apiResponse.error) {
      failureNotification(`${apiResponse.msg}`);
    } else {
      setClientSecret(apiResponse.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (bookingPrice === 0) {
      failureNotification("Please enter a valid amount");
    } else {
      setDataToSend({
        bookingId: paymentID,
        amount: bookingPrice,
        customerId: selectedCustomer._id,
        paymentMethod: "FULL",
      });
      nextStep();
      paymentIntentCreator();
    }
  };

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

              <form onSubmit={handleSubmit}>
                <Grid>
                  <Grid.Col sm={12} lg={6}>
                    <Select
                      required
                      size="md"
                      label={"Select Customer"}
                      data={customers?.map((customer) => ({
                        value: customer,
                        label: customer.fullName,
                        key: customer._id,
                      }))}
                      placeholder="Select Customer"
                      onChange={(event) => {
                        setSelectedCustomer(event);
                      }}
                      searchable
                      clearable
                    />
                  </Grid.Col>
                  <Grid.Col sm={12} lg={6}>
                    <Select
                      required
                      size="md"
                      placeholder="Select id"
                      label={"Select Booking ID"}
                      data={bookingDates}
                      onChange={(event) => {
                        setSelectedBookingID(event);
                      }}
                      clearable
                    />
                  </Grid.Col>

                  {bookedServices.length > 0 && (
                    <Grid.Col lg={6}>
                      <Text size="md" fw="bold">
                        Booked Services
                      </Text>
                      <Group noWrap mt={"xs"}>
                        {bookedServices ? (
                          bookedServices?.map((serviceItem) => (
                            <Badge key={serviceItem._id}>
                              {serviceItem?.serviceTitle}
                            </Badge>
                          ))
                        ) : (
                          <Badge>No Services</Badge>
                        )}
                      </Group>
                    </Grid.Col>
                  )}

                  {bookedPackages.length > 0 && (
                    <Grid.Col lg={6}>
                      <Text size="md" fw={"bold"}>
                        Booked Packages
                      </Text>
                      <Group noWrap mt={"xs"}>
                        {bookedPackages ? (
                          bookedPackages?.map((packageItem) => (
                            <Badge key={packageItem._id}>
                              {packageItem?.package?.packageTitle}
                            </Badge>
                          ))
                        ) : (
                          <Badge>No Packages</Badge>
                        )}
                      </Group>
                    </Grid.Col>
                  )}

                  <Grid.Col lg={12}>
                    <TextInput
                      size="md"
                      label={"Payment Amount"}
                      value={bookingPrice}
                      readOnly
                    />
                  </Grid.Col>
                  <Grid.Col lg={12}>
                    <Textarea
                      size="md"
                      label={"Payment Details"}
                      maxLength={200}
                      maxRows={3}
                      minRows={3}
                      onChange={(event) => {
                        setPaymentDetails(event.target.value);
                      }}
                      required
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
                      onClick={paymentIntentCreator}
                      type="submit"
                    >
                      NEXT
                    </Button>
                  </Grid.Col>
                </Grid>
              </form>
            </Stepper.Step>

            <Stepper.Step
              disabled={disabledStepper}
              label="Make Payment"
              description="Payment Details"
              allowStepSelect={active > 0}
            >
              <Grid align="start">
                <Grid.Col sm={12} md={12} lg={12}>
                  {clientSecret.length > 0 && (
                    <Elements options={options} stripe={stripePromise}>
                      <PaymentForm
                        clientSecret={clientSecret}
                        paymentValue={paymentValue}
                        setExternalElements={setExternalElements}
                        externalElements={externalElements}
                        externalStripe={externalStripe}
                        setExternalStripe={setExternalStripe}
                        dataToSend={dataToSend}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        invoiceData={invoiceData}
                        setInvoiceData={setInvoiceData}
                      />
                    </Elements>
                  )}
                </Grid.Col>
              </Grid>
            </Stepper.Step>
            <Stepper.Completed>
              <Title align="center" order={2}>
                Payment Completed
              </Title>

              {/* <InvoiceViewCard data={paidBooking} /> */}
              <Grid justify="flex-end" py="md">
                <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                  <Button
                    fullWidth
                    rightIcon={<ArrowRight />}
                    size="md"
                    color="dark"
                    onClick={() => {
                      nextStep();
                      navigate(routes.viewPayments);
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
