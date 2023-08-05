/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  Grid,
  Group,
  Modal,
  Select,
  SimpleGrid,
  Stepper,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { useContext } from "react";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown } from "tabler-icons-react";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import CheckoutTable from "./CheckoutTable";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import {
  postCallWithHeaders,
  postCallWithoutHeaders,
} from "../../helpers/apiCallHelpers";
import {
  failureNotification,
  successNotification,
} from "../../helpers/notificationHelper";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "react-stripe-js";
import CheckoutForm from "../payment/CheckoutForm";
import card from "../../assets/card.jpg";
import cod from "../../assets/cod.jpg";
import { PaymentOptions } from "./PaymentOptions";
import InvoiceViewCard from "../cards/InvoiceViewCard";
import { UserProfileContext } from "../../contexts/userProfileContext";
import { CategoriesContext } from "../../contexts/categoriesContext";
import { v4 } from "uuid";
import { customerRoutes } from "../../helpers/routesHelper";
import { useNavigate } from "react-router-dom";
const stripePromise = loadStripe(
  "pk_test_51LZZvfE15s0GgNMhr1G5APbmPXyGbm10KdljXh7FWBA9QvUtisLvRVN6SAswoq2M1D6v5f0hTi484tqZDs50P8Rq00pU0tq3QQ"
);
const BookingModal = ({ opened, setOpened, categories }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  // STRIPE
  const [externalStripe, setExternalStripe] = useState(null);
  const [externalElements, setExternalElements] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const [step1FormValues, setStep1FormValues] = useState({});
  const [step2FormValues, setStep2FormValues] = useState({});
  const [dataBeforeBooking, setDataBeforeBooking] = useState({});
  const { shoppingCartItems, totalAmountWithTaxes } =
    useContext(ShoppingCartContext);
  const { loggedInUserDetails } = useContext(UserProfileContext);
  const { categoriesData, setCategoriesData } = useContext(CategoriesContext);
  const step1Form = useForm({
    validateInputOnChange: true,
    initialValues: {
      bookingZip: "",
      bookingDate: "",
    },
    validate: {
      bookingZip: (value) => (value.trim().length > 0 ? null : "Select A ZIP"),
    },
  });
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 5 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const nextNextStep = () =>
    setActive((current) => (current < 5 ? current + 2 : current));
  const prevPrevStep = () =>
    setActive((current) => (current > 0 ? current - 2 : current));

  const step1FormHandleSubmit = (values) => {
    setStep1FormValues(values);
    nextStep();
  };

  const contactInformationForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      bookingContactNumber: "",
      bookingEmailAddress: "",
      bookingDescription: "",
    },
    validate: {
      bookingEmailAddress: (value) =>
        /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(
          value.trim()
        )
          ? null
          : "Invalid Email",
      bookingContactNumber: (value) =>
        /^[1-9]\d{9}$/.test(value) ? null : "10 digit Phone Number",
      bookingDescription: (value) =>
        /^[\s\S]{1,500}$/.test(value.trim())
          ? null
          : "Description can't exceed 500 characters",
    },
  });

  const contactInformationFunction = async (values) => {
    console.log("paymentMethod: ", paymentMethod);
    try {
      console.log(values);
      let bookingData = {
        ...step1FormValues,
        ...values,
        ...{ bookingPackage: shoppingCartItems },
        ...{ bookingCustomer: loggedInUserDetails },
      };
      bookingData.bookingId =
        "kolkata" +
        "_" +
        step1FormValues.bookingZip +
        "_" +
        loggedInUserDetails?.fullName[0] +
        "_" +
        new Date().toISOString().toLocaleString().split("T")[0] +
        "_" +
        v4().split("-")[0];
      bookingData.bookingStatus = "IN PROGRESS";
      bookingData.bookingPaidAmount = 0;
      bookingData.bookingPrice = totalAmountWithTaxes;
      bookingData.bookingCity = "kolkata";
      bookingData.bookingService = shoppingCartItems
        .map((pkg) => pkg.packageService) // Get an array of packageService IDs
        .filter((value, index, self) => self.indexOf(value) === index) // Filter out duplicate IDs
        .map((serviceId) =>
          categoriesData.categoryServices.find(
            (category) => category._id === serviceId
          )
        );

      console.log("Final Booking Date: $123", bookingData);
      setDataBeforeBooking(bookingData);
      setStep2FormValues(values);
      const apiResponse = await postCallWithHeaders(
        "customer/customer-payment-intent",
        {
          amount: totalAmountWithTaxes,
        }
      );
      console.log("Stripe customer: ", apiResponse);
      if (apiResponse.error) {
        failureNotification(`${apiResponse.msg}`);
      } else {
        setClientSecret(apiResponse.data);
        nextStep();
      }
    } catch (error) {
      console.log(error);
      failureNotification(`${error}`);
    }
  };

  const createBooking = async () => {
    const apiResponse = await postCallWithoutHeaders(
      "customer/customer-create-payment",
      dataBeforeBooking
    );
    if (!apiResponse.error) {
      successNotification(`Booking successful`);
      nextStep();
    } else {
      failureNotification(`Booking unsuccessful`);
    }
  };
  return (
    <Modal
      size={"xl"}
      p={"xl"}
      m={"xl"}
      opened={opened}
      closeOnClickOutside={false}
      closeOnEscape={false}
      onClose={() => {
        setOpened(!opened);
      }}
      title="Booking"
    >
      <Title order={3} align="center">
        If payment method is card, once payment is done the information can not
        be changed!
      </Title>
      <Stepper
        size="xs"
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        p={"md"}
        m={"md"}
      >
        <Stepper.Step
          label="Selected Packages"
          description="Confirm your selections"
        >
          <form
            onSubmit={step1Form.onSubmit((values) => {
              step1FormHandleSubmit(values);
            })}
          >
            <Grid>
              <Grid.Col lg={12}>
                <Card withBorder>
                  <Card.Section>
                    <CheckoutTable hideCheckoutButton={true} />
                  </Card.Section>
                </Card>
              </Grid.Col>
              <Grid.Col lg={12}>
                <Select
                  mt={0}
                  withinPortal
                  searchable
                  required
                  size="sm"
                  label="Zip"
                  placeholder="Select Zip"
                  data={[
                    {
                      value: "70024",
                      label: "70024",
                    },
                    {
                      value: "70025",
                      label: "70025",
                    },
                    {
                      value: "70026",
                      label: "70026",
                    },
                    {
                      value: "70027",
                      label: "70027",
                    },
                    {
                      value: "70028",
                      label: "70028",
                    },
                    {
                      value: "70029",
                      label: "70029",
                    },
                  ]}
                  rightSection={<ChevronDown size={14} />}
                  rightSectionWidth={40}
                  {...step1Form.getInputProps("bookingZip")}
                />

                <DateInput
                  mb={0}
                  size="sm"
                  required
                  label="Booking Date"
                  placeholder="Select Booking Date"
                  searchable
                  minDate={dayjs(new Date())
                    .startOf("month")
                    .add(new Date().getDate() - 1, "days")
                    .toDate()}
                  inputFormat="YYYY-MM-DD"
                  {...step1Form.getInputProps("bookingDate")}
                />
              </Grid.Col>
            </Grid>
            <Grid justify="flex-end">
              <Grid.Col xl={3} lg={4} sm={6}>
                <Button
                  fullWidth
                  uppercase
                  onClick={() => {
                    prevStep();
                  }}
                  leftIcon={<IconArrowLeft />}
                >
                  Previous
                </Button>
              </Grid.Col>
              <Grid.Col xl={3} lg={4} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  uppercase
                  onClick={() => {}}
                  rightIcon={<IconArrowRight />}
                >
                  Next
                </Button>
              </Grid.Col>
            </Grid>
          </form>
        </Stepper.Step>
        <Stepper.Step
          label="Contact information"
          description="Confirm your contact information"
        >
          <form
            onSubmit={contactInformationForm.onSubmit((values) =>
              contactInformationFunction(values)
            )}
          >
            <Group position="apart">
              <Text weight="bold" size="xl" py="md">
                Contact Information
              </Text>
              <Text weight="bold" color="red" size="xl" py="md">
                Total Cost Rs. {totalAmountWithTaxes.toLocaleString()}
              </Text>
            </Group>
            <Grid>
              <Grid.Col md={12} lg={6}>
                <TextInput
                  size="sm"
                  required
                  label="Contact Number"
                  placeholder="Enter 10 Digit Phone Number"
                  {...contactInformationForm.getInputProps(
                    "bookingContactNumber"
                  )}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6}>
                <TextInput
                  size="sm"
                  placeholder="Enter User's Email"
                  required
                  label="Email Address"
                  {...contactInformationForm.getInputProps(
                    "bookingEmailAddress"
                  )}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={12} py="md">
                <Textarea
                  minRows={5}
                  size="sm"
                  placeholder="Describe Your Event"
                  required
                  maxLength={1000}
                  // disabled={disabled}
                  label="Booking Description"
                  {...contactInformationForm.getInputProps(
                    "bookingDescription"
                  )}
                />
              </Grid.Col>
            </Grid>
            <Grid justify="flex-end">
              <Grid.Col sm={6} xs={12} md={5} lg={4} xl={3} p="md">
                <Button
                  size="sm"
                  fullWidth
                  variant="filled"
                  // disabled={loading}
                  leftIcon={<ArrowLeft />}
                  onClick={prevStep}
                  uppercase
                >
                  BACK
                </Button>
              </Grid.Col>
              <Grid.Col sm={6} xs={12} md={5} lg={4} xl={3} p="md">
                <Button
                  size="sm"
                  fullWidth
                  variant="filled"
                  type="submit"
                  // disabled={disabled}
                  // loading={loading}
                  rightIcon={<ArrowRight />}
                  uppercase
                >
                  Next
                </Button>
              </Grid.Col>
            </Grid>
          </form>
        </Stepper.Step>

        <Stepper.Step
          label="Payment Options"
          description="Choose a payment option"
        >
          <SimpleGrid breakpoints={[]} cols={2}>
            <div>
              <PaymentOptions
                image={card}
                nextStep={nextStep}
                title={"CARD PAYMENT"}
                buttonTitle={"Credit Card"}
                setPaymentMethod={setPaymentMethod}
                setDataBeforeBooking={setDataBeforeBooking}
              />
            </div>
            <div>
              <PaymentOptions
                image={cod}
                nextStep={nextNextStep}
                buttonTitle={"COD"}
                title={"CASH ON DELIVERY"}
                setPaymentMethod={setPaymentMethod}
                setDataBeforeBooking={setDataBeforeBooking}
              />
            </div>
          </SimpleGrid>
        </Stepper.Step>

        <Stepper.Step label="Payment" description="Pay for your booking">
          <Grid align="start">
            <Grid.Col sm={12} md={12} lg={12}>
              {clientSecret.length > 0 && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm
                    clientSecret={clientSecret}
                    paymentValue={totalAmountWithTaxes}
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
        </Stepper.Step>

        <Stepper.Step
          label="Confirm Booking"
          description="Confirm your booking details"
        >
          <InvoiceViewCard data={dataBeforeBooking} />
          <Grid justify="flex-end">
            <Grid.Col sm={6} xs={12} md={5} lg={4} xl={3} p="md">
              <Button
                size="sm"
                fullWidth
                variant="filled"
                // disabled={loading}
                leftIcon={<ArrowLeft />}
                onClick={() => {
                  paymentMethod === "card" ? prevStep() : prevPrevStep();
                }}
                uppercase
              >
                BACK
              </Button>
            </Grid.Col>
            <Grid.Col sm={6} xs={12} md={5} lg={4} xl={3} py="md">
              <Button
                size="sm"
                fullWidth
                variant="filled"
                // disabled={disabled}
                // loading={loading}
                rightIcon={<ArrowRight />}
                uppercase
                onClick={() => {
                  createBooking();
                }}
              >
                Book
              </Button>
            </Grid.Col>
          </Grid>
        </Stepper.Step>
        <Stepper.Completed>
          <Grid>
            <Grid.Col>
              <Title fw="normal" order={3} my="md">
                Your booking was created{" "}
                <b style={{ color: "green" }}>successfully</b> and has been
                added to your dashboard!{" "}
              </Title>

              <Title fw="normal" order={3} my="md">
                Click on <b>Dashboard</b> to see your bookings
              </Title>
            </Grid.Col>
          </Grid>
          <Grid justify="flex-end">
            <Grid.Col sm={6} xs={12} md={5} lg={4} xl={3} p="md">
              <Button
                disabled
                size="sm"
                fullWidth
                variant="filled"
                // disabled={loading}
                leftIcon={<ArrowLeft />}
                onClick={() => {
                  prevStep();
                }}
                uppercase
              >
                BACK
              </Button>
            </Grid.Col>
            <Grid.Col sm={6} xs={12} md={5} lg={4} xl={3} py="md">
              <Button
                size="sm"
                fullWidth
                variant="filled"
                // disabled={disabled}
                // loading={loading}
                rightIcon={<ArrowRight />}
                uppercase
                onClick={() => {
                  navigate(customerRoutes.customerDashboard);
                }}
              >
                Dashboard
              </Button>
            </Grid.Col>
          </Grid>
        </Stepper.Completed>
      </Stepper>
    </Modal>
  );
};

export default BookingModal;
