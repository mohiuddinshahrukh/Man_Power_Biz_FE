import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Text,
  Title,
  Button,
  TextInput,
  Stepper,
  Group,
  Select,
  Center,
  Textarea,
  LoadingOverlay,
} from "@mantine/core";

// import dayjs from "dayjs";
import {
  ArrowRight,
  X,
  ChevronDown,
  ArrowLeft,
  Printer,
} from "tabler-icons-react";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";

import dayjs from "dayjs";
import CancelScreenModal from "../modals/CancelScreenModal";
import { routes } from "../../helpers/routesHelper";
import { useEffect, useState } from "react";
import {
  getCallWithHeaders,
  postCallWithHeaders,
} from "../../helpers/apiCallHelpers";
import {
  failureNotification,
  successNotification,
} from "../../helpers/notificationHelper";

const AddBooking = () => {
  const [active, setActive] = useState(0);
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const [customersList, setCustomersList] = useState([]);
  const [packagesList, setPackagesList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [generalBookingDetails, setGeneralBookingDetails] = useState({});
  /*eslint-disable*/
  const [contactInfo, setContactInfo] = useState({});

  const getBookingList = async () => {
    try {
      const [apiResponseUsers, apiResponsePackages, apiResponseServices] =
        await Promise.all([
          getCallWithHeaders(`admin/getAllUsers`),
          getCallWithHeaders(`admin/getAllPackages`),
          getCallWithHeaders(`admin/getAllServices`),
        ]);
      let filteredUsers = apiResponseUsers?.filter((user) => {
        if (user.userType === "customer") {
          user.value = user._id;
          user.label = user.email;
          return user;
        }
      });
      apiResponsePackages?.forEach((element) => {
        element.value = element._id;
        element.label = element.packageTitle;
      });
      apiResponseServices?.forEach((element) => {
        element.value = element._id;
        element.label = element.serviceTitle;
      });
      setCustomersList(filteredUsers);
      setPackagesList(apiResponsePackages);
      setServicesList(apiResponseServices);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBookingList();
  }, []);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  let navigate = useNavigate();

  const generalBookingDetailsForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      bookingCity: "",
      bookingZip: "",
      bookingCustomer: "",
      bookingService: "",
      bookingPackage: "",
      bookingDate: "",
    },
    validate: {
      bookingCity: (value) =>
        value.trim().length > 0 ? null : "Select A City",
      bookingZip: (value) => (value.trim().length > 0 ? null : "Select A ZIP"),
      bookingCustomer: (value) =>
        value.trim().length > 0 ? null : "Select A Customer",
      bookingService: (value) =>
        value.trim().length > 0 ? null : "Select A Service",
      bookingPackage: (value) =>
        value.trim().length > 0 ? null : "Select A Package",
      // bookingDate: (value) => (value).length > 0 ? null : "Select A Booking Date",
    },
  });
  const generalBookingDetailsFunction = (values) => {
    console.log("Values: ", values);
    setGeneralBookingDetails(values);
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

  const contactInformationFunction = (values) => {
    try {
      setLoading(true);
      setContactInfo(values);
      let booking = { ...generalBookingDetails, ...values };
      booking.bookingStatus = "IN PROGRESS";
      // booking.bookingPrice = 5000;
      // booking.bookingPaidAmount = 500;
      booking.bookingPaymentStatus = "FULL";

      const apiResponse = postCallWithHeaders(`admin/addBooking`, booking);
      if (apiResponse.error) {
        failureNotification(`Failed to add booking`);
      } else {
        successNotification(`Booking created successfully`);
        navigate(routes.viewBookings);
      }
      // nextStep()
    } catch (error) {
      failureNotification(`${error}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Paper
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
      p={0}
    >
      <LoadingOverlay
        visible={loading}
        loaderProps={{ size: "xl", color: "pink", variant: "bars" }}
        overlayOpacity={0.5}
        overlayColor="#c5c5c5"
      />
      {/*COMPLETED BOOKING MODAL*/}
      <Center>
        <Paper
          py="xl"
          style={{
            width: "80%",
            height: "100%",
          }}
        >
          <Title order={2} align="center" py="xl">
            Add Booking
          </Title>

          <Stepper
            active={active}
            onStepClick={setActive}
            breakpoint="sm"
            pt="xl"
          >
            <Stepper.Step
              label="Booking Details"
              description="General Booking Details"
              allowStepSelect={active > 0}
            >
              <CancelScreenModal
                opened={opened}
                setOpened={setOpened}
                path={routes.viewBookings}
              />
              <Paper
                // p="xl"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Text weight="bold" size="xl" py="md">
                  General Booking Details
                </Text>

                <form
                  onSubmit={generalBookingDetailsForm.onSubmit((values) =>
                    generalBookingDetailsFunction(values)
                  )}
                >
                  <Grid justify="space-around" py="md">
                    <Grid.Col lg={6}>
                      <Select
                        searchable
                        required
                        size="md"
                        label="City"
                        placeholder="Select City"
                        data={[
                          {
                            value: "kolkata",
                            label: "Kolkata",
                          },
                        ]}
                        rightSection={<ChevronDown size={14} />}
                        rightSectionWidth={40}
                        {...generalBookingDetailsForm.getInputProps(
                          "bookingCity"
                        )}
                      />
                    </Grid.Col>
                    <Grid.Col lg={6}>
                      <Select
                        searchable
                        required
                        size="md"
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
                        {...generalBookingDetailsForm.getInputProps(
                          "bookingZip"
                        )}
                      />
                    </Grid.Col>

                    <Grid.Col lg={6}>
                      <Select
                        searchable
                        required
                        size="md"
                        label="Customer"
                        placeholder="Select A Customer"
                        data={customersList}
                        rightSection={<ChevronDown size={14} />}
                        rightSectionWidth={40}
                        {...generalBookingDetailsForm.getInputProps(
                          "bookingCustomer"
                        )}
                      />
                    </Grid.Col>
                    <Grid.Col lg={6}>
                      <Select
                        searchable
                        required
                        size="md"
                        label="Service"
                        placeholder="Select Service"
                        data={servicesList}
                        rightSection={<ChevronDown size={14} />}
                        rightSectionWidth={40}
                        {...generalBookingDetailsForm.getInputProps(
                          "bookingService"
                        )}
                      />
                    </Grid.Col>

                    <Grid.Col lg={6}>
                      <Select
                        size="md"
                        required
                        label="Package"
                        placeholder="Select A Package"
                        searchable
                        data={packagesList}
                        {...generalBookingDetailsForm.getInputProps(
                          "bookingPackage"
                        )}
                      />
                    </Grid.Col>
                    <Grid.Col lg={6}>
                      <DateInput
                        size="md"
                        required
                        label="Booking Date"
                        placeholder="Select Booking Date"
                        searchable
                        minDate={dayjs(new Date())
                          .startOf("month")
                          .add(new Date().getDate() - 1, "days")
                          .toDate()}
                        inputFormat="YYYY-MM-DD"
                        {...generalBookingDetailsForm.getInputProps(
                          "bookingDate"
                        )}
                      />
                    </Grid.Col>
                  </Grid>

                  <Grid justify="flex-end">
                    <Grid.Col sm={6} xs={12} md={5} lg={4} xl={3} p="md">
                      <Button
                        size="md"
                        fullWidth
                        variant="filled"
                        color="red"
                        // disabled={loading}
                        rightIcon={<X />}
                        onClick={() => setOpened(true)}
                        uppercase
                      >
                        cancel
                      </Button>
                    </Grid.Col>
                    <Grid.Col sm={6} xs={12} md={5} lg={4} xl={3} p="md">
                      <Button
                        size="md"
                        fullWidth
                        variant="filled"
                        color="dark"
                        type="submit"
                        uppercase
                        // loading={loading}
                        rightIcon={<ArrowRight />}
                      >
                        next
                      </Button>
                    </Grid.Col>
                  </Grid>
                </form>
              </Paper>
            </Stepper.Step>

            <Stepper.Step
              label="Contact Information"
              description="Contact Information"
              allowStepSelect={active > 1}
            >
              <Paper py="xl">
                <form
                  onSubmit={contactInformationForm.onSubmit((values) =>
                    contactInformationFunction(values)
                  )}
                >
                  <Group position="apart">
                    <Text weight="bold" size="xl" py="md">
                      Contact Information
                    </Text>
                    {/* <Text weight="bold" color="red" size="xl" py="md">
                      Total Cost Rs.
                    </Text> */}
                  </Group>
                  <Grid>
                    <Grid.Col md={12} lg={6}>
                      <TextInput
                        size="md"
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
                        size="md"
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
                        size="md"
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
                        size="md"
                        fullWidth
                        variant="filled"
                        color="red"
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
                        size="md"
                        fullWidth
                        variant="filled"
                        color="green"
                        type="submit"
                        // disabled={disabled}
                        // loading={loading}
                        rightIcon={<ArrowRight />}
                        uppercase
                      >
                        book
                      </Button>
                    </Grid.Col>
                  </Grid>
                </form>
              </Paper>
            </Stepper.Step>

            {/* <Stepper.Step
              label="Review and Pay"
              description="Please review your booking details and proceed To payment"
              allowStepSelect={active > 3}
            >
              <Paper py="xl">
                <form
                // onSubmit={form.onSubmit((values) => handleSubmit1(values))}
                >
                  <Group position="apart">
                    <Group>
                      <Text weight="bold" size="xl" py="md">
                        Review And
                      </Text>

                      <Button
                        rightIcon={
                          <div className="xyz">
                            <ArrowDown />
                          </div>
                        }
                        style={{
                          backgroundImage:
                            "url(https://media.istockphoto.com/photos/violet-color-velvet-texture-background-picture-id587219358?k=20&m=587219358&s=612x612&w=0&h=PtwQq0Cx7AllJLpAqQkO315w8NxwwAJIrquHjaTym3Y=)",
                        }}
                      >
                        Pay
                      </Button>
                    </Group>
                    <Text weight="bold" color="red" size="xl" py="md">
                      Total Cost Rs.
                    </Text>
                  </Group>
                  <Grid>
                    <Grid.Col md={12} lg={6}>
                      <Paper
                        p="sm"
                        withBorder
                        shadow="md"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <Title order={2} pt="sm">
                          Payment Breakdown
                        </Title>

                        <SimpleGrid
                          cols={1}
                          spacing={20}
                          breakpoints={[
                            { maxWidth: 550, cols: 1, spacing: 40 },
                          ]}
                          style={{ marginTop: 30 }}
                        ></SimpleGrid>
                      </Paper>
                    </Grid.Col>
                    <Grid.Col md={12} lg={6}></Grid.Col>
                  </Grid>
                </form>
              </Paper>
            </Stepper.Step> */}
            <Stepper.Completed>
              <Paper
                py="xl"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Text size="xl" weight="bold" pb="xl" color="green">
                  Booking Has Been Successfully Logged!
                </Text>
                <div></div>

                <Grid justify="flex-end">
                  <Grid.Col sm={6} xs={12} md={5} lg={4} xl={3} p="md">
                    <Button
                      size="md"
                      fullWidth
                      variant="filled"
                      color="red"
                      // disabled={loading}
                      onClick={() => {
                        navigate("/vendorBookings");
                      }}
                    >
                      View All Bookings
                    </Button>
                  </Grid.Col>
                  <Grid.Col sm={6} xs={12} md={5} lg={4} xl={3} p="md">
                    <Button
                      rightIcon={<Printer />}
                      uppercase
                      fullWidth
                      color="dark"
                      size="md"
                    >
                      Print Invoice
                    </Button>
                  </Grid.Col>
                </Grid>
              </Paper>
            </Stepper.Completed>
          </Stepper>
        </Paper>
      </Center>
    </Paper>
  );
};

export default AddBooking;
