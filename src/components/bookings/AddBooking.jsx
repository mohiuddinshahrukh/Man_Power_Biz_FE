import axios from "axios";
// import Congrats from "./Congrats.png";

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    Divider,
    Stack,
    createStyles,
    RingProgress,
    Image,
    SimpleGrid,
    Badge,
} from "@mantine/core";
import { Modal } from "@mantine/core";
import moment from "moment";
// import dayjs from "dayjs";
import {
    ArrowRight,
    Trash,
    TrashOff,
    X,
    ChevronDown,
    ArrowLeft,
    Calendar,
    ArrowDown,
} from "tabler-icons-react";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
// import VendorPackagesForBooking from "../VendorPackagesForBooking/VendorPackagesForBooking";
// import StripePromise from "../paymentGateways/StripePromise";
// import { useReactToPrint } from "react-to-print";
import { useScrollIntoView } from "@mantine/hooks";
import dayjs from "dayjs";
// import ViewAllVendorPaymentTableReceipts from "./ViewAllVendorPaymentTableReceipts";
// import ViewAllVendorPaymentTableReceiptsAfterPayment from "./ViewAllVendorPaymentTableReceiptsAfterPayment";
// import { socket } from "../Socket/Socket";

const useStyles = createStyles((theme) => ({
    wrapper: {
        paddingTop: 80,
        paddingBottom: 50,
    },

    item: {
        display: "flex",
    },

    itemIcon: {
        padding: theme.spacing.xs,
        marginRight: theme.spacing.md,
    },

    itemTitle: {
        marginBottom: theme.spacing.xs / 2,
    },

    supTitle: {
        textAlign: "center",
        textTransform: "uppercase",
        fontWeight: 800,
        fontSize: theme.fontSizes.sm,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
            .color,
        letterSpacing: 0.5,
    },

    title: {
        lineHeight: 1,
        textAlign: "center",
        // marginTop: theme.spacing.xl,
    },

    description: {
        textAlign: "center",
        marginTop: theme.spacing.xs,
    },

    highlight: {
        backgroundColor: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
        }).background,
        padding: 5,
        paddingTop: 0,
        borderRadius: theme.radius.sm,
        display: "inline-block",
        color: theme.colorScheme === "dark" ? theme.white : "inherit",
    },
}));
const AddBooking = () => {
    const { classes } = useStyles();

    const { scrollIntoView, targetRef } = useScrollIntoView({ offset: 60 });
    //CODE FOR PRINTING

    // const [printingTriggered, setPrintingTriggered] = useState(false);
    // const componentRef = useRef(null);
    const onBeforeGetContentResolve = useRef(null);

    // const [loading, setLoading] = useState(false);
    // const [text, setText] = useState("old boring text");

    // PAYMENT INTEGRATION HOOKS
    const [stepperDisabled, setStepperDisabled] = useState(false);
    const [paidSuccessfully, setPaidSuccessfully] = useState(false);
    const [confirmBooking, setConfirmBooking] = useState(false);

    // setCurrentLocation("Add Vendor Booking");
    const [errorMessages, setErrorMessages] = useState({});

    const [active, setActive] = useState(0);
    const nextStep = () =>
        setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () =>
        setActive((current) => (current > 0 ? current - 1 : current));

    const [refresh, setRefresh] = useState(true);
    const [visible, setVisible] = useState(true);
    const [opened, setOpened] = useState(false);

    const [allCustomers, setAllCustomers] = useState([]);
    const [allVendors, setAllVendors] = useState([]);
    const [selectedVendorCategory, setSelectedVendorCategory] = useState("");
    console.log("selected category is", selectedVendorCategory);
    const [customer, setCustomer] = useState("");
    const [city, setCity] = useState("");
    const [vendor, setVendor] = useState("");
    const [disabled, setDisabled] = useState(false);

    console.log("vendor is", vendor);

    const [bookingDateSelected, setBookingDateSelected] = useState(new Date());
    const [time, setTime] = useState("");
    const [noOfGuests, setNoOfGuests] = useState(0);
    // const [filterSubVenues, setFilterSubVenues] = useState([]);
    const bookedDateAndTime =
        moment(bookingDateSelected).format().split("T")[0] + time;
    console.log("@123bookedDateAndTime", bookedDateAndTime);
    const [idOfSelectedVendorPackage, setIdOfSelectedVendorPackage] =
        useState("");
    const [selectedVendorPackage, setSelectedVendorPackage] = useState({});

    const [totalPrice, setTotalPrice] = useState(0);
    console.log("ttal price", totalPrice);
    const [eventType, setEventType] = useState("");

    const [phone, setPhone] = useState();
    const [email, setEmail] = useState("");
    const [category, setCategory] = useState("");
    const [allCategories, setAllCategories] = useState([]);
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [bookingPercentage, setBookingPercentage] = useState(0.2);
    const [taxPercentage, setTaxPercentage] = useState(0.17);
    const [discountPercentage, setDiscountPercentage] = useState(0);

    //   function setIdOfSelectedVendorPackage(id) {
    //     alert(id);
    //   }

    // const handlePrint = useReactToPrint({
    //     documentTitle: `AWEP_Invoice_${allVendors
    //         .filter((e) => e._id === vendor)
    //         .map((e) => e.vendorBusinessTitle)}_${allCustomers
    //             .filter((e) => e._id === customer)
    //             .map((e) => e.name)}_${phone}`,
    //     content: () => componentRef.current,
    //     copyStyles: true,
    //     pageStyle: { margin: "10px" },
    // });
    const refreshStates = () => {
        setTotalPrice(0);
        setVendor("");
        setIdOfSelectedVendorPackage("");
        setSelectedVendorCategory("");
    };

    console.log("categoryyyyyy", category);
    console.log("this is the returne id", idOfSelectedVendorPackage);
    const [duration, setDuration] = useState("");

    console.log("_id of subvenue from table", idOfSelectedVendorPackage);
    console.log("testing date and time", bookedDateAndTime);
    // const { start, clear } = useTimeout(() => setConfirmBooking(false), 10000);

    console.log("no of guests", noOfGuests);

    const data = [
        {
            percent: bookingPercentage * 100,
            Amount: (
                (totalPrice +
                    totalPrice * taxPercentage -
                    totalPrice * discountPercentage) *
                bookingPercentage
            ).toLocaleString(),
            color: "red",
            title: `${bookingPercentage * 100} % Advance Payment`,
            description: `To Book A Date ${bookingPercentage * 100
                } % Advance Payment is Required `,
        },
        {
            percent: (1 - bookingPercentage) * 100,
            Amount: (
                totalPrice -
                totalPrice * discountPercentage +
                totalPrice * taxPercentage -
                (totalPrice -
                    totalPrice * discountPercentage +
                    totalPrice * taxPercentage) *
                bookingPercentage
            ).toLocaleString(),
            color: "green",
            title: `${(1 - bookingPercentage) * 100} % Remaining Payment`,
            description: `Remaining ${(1 - bookingPercentage) * 100
                } % Payment is Required 7 Days Before The Event Date`,
        },
    ];
    const items = data.map((item) => (
        <div className={classes.item} key={item.image}>
            <Group position="center">
                <RingProgress
                    size={100}
                    thickness={10}
                    label={
                        <Text
                            size="md"
                            align="center"
                            px="xs"
                            sx={{ pointerEvents: "none" }}
                        >
                            {item.percent}%
                        </Text>
                    }
                    sections={[
                        {
                            value: item.percent,
                            color: item.color,
                        },
                    ]}
                />
            </Group>

            <div>
                <Text weight={700} size="lg" className={classes.itemTitle}>
                    {item.title}{" "}
                    <b
                        style={{
                            color: "red",
                        }}
                    >
                        Rs. {item.Amount}
                    </b>
                </Text>
                <Text color="dimmed">{item.description}</Text>
            </div>
        </div>
    ));

    let navigate = useNavigate();
    const renderErrorMessage = (name) => {
        if (errorMessages[name]) {
            return errorMessages[name];
        }
    };

    const form1 = useForm({
        validateInputOnChange: true,
        initialValues: {
            // category: "",
            // vendor: "",
        },

        validate: {
            //   vendor: (value) => {
            //     if (!value) {
            //       return "Vendor is required";
            //     }
            //   },
        },
    });
    const form = useForm({
        validateInputOnChange: ["customer", "phone", "email"],
        initialValues: { customer: "", phone: "", email: "", description: "" },

        validate: {
            customer: (value) => {
                if (!value) {
                    return "Customer is required";
                }
            },
            phone: (value) =>
                /^(03)(\d{9})$/.test(value)
                    ? null
                    : "11 digits Phone Number must start with 03",
            email: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value.trim())
                    ? // /^\S+@[a-zA-Z]+\.[a-zA-Z]+$/.test(value.trim())
                    null
                    : "Invalid Email",
            description: (value) =>
                value.trim().length > 20
                    ? // && /^[a-zA-Z0-9\s]*$/.test(value.trim())
                    null
                    : "Describe in At least 20 Characters",
        },
    });
    const customersData = allCustomers.map((item) => ({
        value: item._id,
        label: item.name,
    }));
    // const vendorsData = allVendors
    //   .filter((e) => e.vendorCategoryId._id === category)
    //   .map((item) => ({
    //     value: item._id,
    //     label: item.vendorServiceTitle,
    //   }));
    const vendorsData = allVendors
        ?.filter((e) => e.city === city)
        ?.map((item) => ({
            value: item._id,
            label: item.vendorBusinessTitle,
        }));
    const CategoryData = allVendors
        ?.filter((e) => e._id === vendor)[0]
        ?.vendorCategories?.map((item) => ({
            value: item?._id,
            label: item?.categoryTitle,
        }));

    // const categoryData = allCategories.map((item) => ({
    //   value: item._id,
    //   label: item.categoryTitle,
    // }));

    const handleSubmit = async () => {
        // var { } = event;

        if (idOfSelectedVendorPackage === "") {
            setError("Please Select A Venue To Proceed");
            setDisabled(true);

            return;
        } else {
            nextStep();
        }
    };
    const handleSubmit1 = async (event) => {
        var { customer, phone, email, description } = event;
        console.log("phone", phone);
        console.log("email", email);
        console.log("description", description);
        console.log(event);
        setCustomer(customer);
        setPhone(phone);
        setEmail(email);
        setDescription(description);

        nextStep();
        // makeVendorBookings();
    };

    useEffect(() => {
        const url = "https://a-wep.herokuapp.com/superAdmin/getCustomers";
        if (refresh) {
            axios.get(url).then((res) => {
                console.log(res.data);
                if (res.data.status === "success") {
                    setAllCustomers(res.data.data);
                    setRefresh(false);
                    setVisible(false);
                } else {
                    setVisible(false);

                    // alert("Error");
                }
            });
        }
        const url1 = "https://a-wep.herokuapp.com/superAdmin/getVendorBusiness";
        if (refresh) {
            axios.get(url1).then((res) => {
                console.log(res.data);
                if (res.data.status === "success") {
                    setAllVendors(res.data.data);
                    setRefresh(false);
                    setVisible(false);
                } else {
                    setVisible(false);

                    // alert("Error");
                }
            });
        }

        const url2 = "https://a-wep.herokuapp.com/superAdmin/getVendorCategories";
        if (refresh) {
            axios.get(url2).then((res) => {
                console.log(res.data);
                if (res.data.status === "success") {
                    console.log("we are here in api call");
                    setAllCategories(res.data.data);
                    setRefresh(false);
                    setVisible(false);
                } else {
                    setVisible(false);

                    // alert("Error");
                }
            });
        }
    }, [refresh]);

    useEffect(() => {
        if (paidSuccessfully) {
            console.log("DO THE AXIOS CALL");
            makeVendorBookings();
            setStepperDisabled(true);
        }
    }, [paidSuccessfully]);

    // PRINTING USE EFFECT
    useEffect(() => {
        if (

            typeof onBeforeGetContentResolve.current === "function"
        ) {
            onBeforeGetContentResolve.current();
        }
    }, [onBeforeGetContentResolve.current]);

    // const reactToPrintContent = useCallback(() => {
    //     return componentRef.current;
    // }, [componentRef.current]);

    // const reactToPrintTrigger = useCallback(() => {
    //     // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
    //     // to the root node of the returned component as it will be overwritten.

    //     // Bad: the `onClick` here will be overwritten by `react-to-print`
    //     // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

    //     // Good
    //     return (
    //         <Button
    //             size="md"
    //             fullWidth
    //             variant="filled"
    //             color="dark"
    //             type="submit"
    //             // disabled={disabled}
    //             // loading={loading}
    //             rightIcon={<Download />}
    //             onClick={() => {
    //                 console.log("Print");
    //                 setPrintingTriggered(true);
    //             }}
    //             uppercase
    //         >
    //             print invoice
    //         </Button>
    //     );
    // }, []);
    //
    const makeVendorBookings = async () => {
        // setComponent("3");
        setVisible(true);

        const body = {
            vendorPackageId: idOfSelectedVendorPackage,
            customerId: customer,
            bookingDate: bookingDateSelected,
            bookingTime: time,
            eventType: eventType,
            eventDuration: duration,
            pointOfContact: {
                email: email,
                phone: phone,
            },
            price: {
                totalPrice: totalPrice,
                paidAmount:
                    (totalPrice +
                        totalPrice * taxPercentage -
                        totalPrice * discountPercentage) *
                    bookingPercentage,
                remainingAmount:
                    totalPrice -
                    totalPrice * discountPercentage +
                    totalPrice * taxPercentage -
                    (totalPrice -
                        totalPrice * discountPercentage +
                        totalPrice * taxPercentage) *
                    bookingPercentage,
                discountPercentage: discountPercentage,
                taxPercentage: taxPercentage,
                totalPriceAfterTaxAndDiscount:
                    totalPrice +
                    totalPrice * taxPercentage -
                    totalPrice * discountPercentage,
            },

            bookingDescription: description,
        };
        console.log("body");
        console.log("bosyyyy", body);

        const headers = {
            "Content-Type": "application/json",
        };
        try {
            const response = await axios({
                method: "post",
                url: "https://a-wep.herokuapp.com/superAdmin/addVendorPackageBooking",
                data: body,
                headers: headers,
            });
            // setLoading(false);
            console.log(response.data);

            if (response.data.status === "error") {
                // setErrorMessages(response.data.error);
                // setLoading(false);
                console.log(response.data.error);
                showNotification({
                    color: "red",
                    title: `${response.data.error}`,

                    message: `${response.data.error}`,
                });
                setVisible(false);
            } else {
                // socket.socket.emit("generateNotification", {
                //     userId: JSON.parse(localStorage.getItem("superAdminData")).id,
                //     title: "Vendor Package Booked Successfully",
                //     message: `Customer for which booking logged: ${email}`,
                //     link: "https://awep-superadmin-team-awep.vercel.app/vendorBookings",
                // });

                showNotification({
                    color: "green",
                    title: `Successfully`,

                    message: `PACKAGE BOOKED SUCCESSFULLY!!`,
                });
                console.log("navigating");
                // setOpened(true);
                console.log("navigated");
                nextStep();
                setVisible(false);
                // navigate("/vendorBookings");
            }
        } catch (err) {
            console.log(err);
        }
    };
    const [hideSelectButton, setHideSelectButton] = useState(true);

    useEffect(() => {
        if (
            city === "" ||
            eventType === "" ||
            duration === "" ||
            bookingDateSelected === ""
        ) {
            setHideSelectButton(true);
            return;
        } else {
            setHideSelectButton(false);
            return;
        }
    }, [city, eventType, duration, bookingDateSelected]);

    return (
        <Paper
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
            }}
            p={0}
        >
            {/*COMPLETED BOOKING MODAL*/}
            <Center>
                <Modal
                    styles={{
                        close: {
                            color: "black",
                            backgroundColor: "#EAEAEA",
                            borderRadius: "50%",
                            "&:hover": {
                                transition: "50ms",
                                color: "white",
                                backgroundColor: "red",
                            },
                        },
                    }}
                    title={
                        <Title align="center" order={3}>
                            Booking Logged Successfully!!
                        </Title>
                    }
                    opened={confirmBooking}
                    transition="rotate-left"
                    transitionDuration={600}
                    centered
                    size={600}
                    transitionTimingFunction="ease"
                    onClose={() => {
                        navigate("/vendorBookings");
                        setConfirmBooking(false);
                    }}
                >
                    <Stack>
                        <Group position="apart">
                            <Group position="left">
                                <Text weight={900}>Booking ID: {"12345678910"}</Text>
                            </Group>
                            <Badge size="lg">New Booking</Badge>
                        </Group>
                        <Paper
                            withBorder
                            p="xl"
                            shadow="md"
                            sx={{
                                ":hover": {
                                    transform: `scale(1.05)`,
                                    transition: "0.3s",
                                },
                            }}
                        >
                            <Grid>
                                <Grid.Col span={6}>
                                    <Group position="left">
                                        <Text>
                                            {
                                                selectedVendorPackage?.vendorBusinessId
                                                    ?.vendorBusinessTitle
                                            }
                                        </Text>
                                    </Group>
                                    <Group position="left">
                                        <Text>{bookedDateAndTime} </Text>
                                    </Group>
                                    <Group position="left">
                                        <Text>{selectedVendorPackage?.vendorPackageTitle}</Text>
                                    </Group>
                                    <Group position="left">
                                        <Text>{selectedVendorPackage?.packageDuration}</Text>
                                    </Group>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    {/* <Image height={125} src={Congrats} /> */}
                                </Grid.Col>
                            </Grid>
                        </Paper>
                        <Paper
                            withBorder
                            p="xl"
                            shadow="md"
                            sx={{
                                ":hover": {
                                    transform: `scale(1.05)`,
                                    transition: "0.3s",
                                },
                            }}
                        >
                            <Group position="apart">
                                <Text>Subtotal</Text>
                                <Text> {totalPrice.toLocaleString()}</Text>
                            </Group>
                            {/*              <Group position="apart">
<Text>Discount</Text>
<Text>-{(totalPrice * 0.25).toLocaleString()}</Text>
</Group>*/}
                            <Group position="apart">
                                <Text>Tax</Text>
                                <Text>+{(totalPrice * 0.17).toLocaleString()}</Text>
                            </Group>
                            <Group position="apart">
                                <Text>Total</Text>
                                <Text>{(totalPrice + totalPrice * 0.17).toLocaleString()}</Text>
                            </Group>
                            <Divider />
                            <Group position="apart">
                                <Text>Amount Paid</Text>
                                <Text>
                                    {(
                                        (totalPrice - totalPrice * 0.25 + totalPrice * 0.17) *
                                        0.25
                                    ).toLocaleString()}
                                </Text>
                            </Group>
                            <Divider />
                            <Group position="apart">
                                <Text>Amount Remaining: </Text>
                                <Text>
                                    {(
                                        totalPrice +
                                        totalPrice * 0.17 -
                                        (totalPrice - totalPrice * 0.25 + totalPrice * 0.17) * 0.25
                                    ).toLocaleString()}
                                </Text>
                            </Group>
                        </Paper>
                    </Stack>

                    <Group position="center">
                        <Button
                            component={Link}
                            to="/vendorBookings"
                            mt="md"
                            leftIcon={<X />}
                            color="green"
                            // fullWidth
                            onClick={() => setConfirmBooking(false)}
                            uppercase
                        >
                            Close
                        </Button>
                    </Group>
                </Modal>
                <Paper
                    py="xl"
                    style={{
                        width: "80%",
                        height: "100%",
                    }}
                >
                    <Title order={2} align="center" py="xl">
                        Add New Vendor Booking
                    </Title>
                    {/* <MyMapComponent /> */}
                    <Stepper
                        active={active}
                        onStepClick={setActive}
                        breakpoint="sm"
                        pt="xl"
                    >
                        <Stepper.Step
                            color={!stepperDisabled ? "grape" : "gray"}
                            disabled={stepperDisabled}
                            label="Vendor Booking Details"
                            description="General Booking Details"
                            allowStepSelect={active > 0}
                        >
                            <Modal
                                styles={{
                                    close: {
                                        color: "black",
                                        backgroundColor: "#EAEAEA",
                                        borderRadius: "50%",
                                        "&:hover": {
                                            transition: "50ms",
                                            color: "white",
                                            backgroundColor: "red",
                                        },
                                    },
                                }}
                                opened={opened}
                                transition="rotate-left"
                                transitionDuration={600}
                                size={600}
                                transitionTimingFunction="ease"
                                onClose={() => setOpened(false)}
                            >
                                <Title align="center" order={3}>
                                    All Changes Will Be Discarded. Do You Want To Go Back?
                                </Title>
                                <Grid align="center" justify="space-around" p="md">
                                    <Grid.Col align="center" xs={3} sm={3} md={4} lg={4}>
                                        <Button
                                            align="center"
                                            color="light"
                                            leftIcon={<TrashOff size={14} />}
                                            onClick={() => setOpened(false)}
                                        >
                                            No, Don't Go Back
                                        </Button>
                                    </Grid.Col>
                                    <Grid.Col align="center" xs={5} sm={4} md={4} lg={4}>
                                        <Button
                                            align="center"
                                            color="red"
                                            leftIcon={<Trash size={14} />}
                                            onClick={() => navigate("/vendorBookings")}
                                        >
                                            Yes, Discard Changes
                                        </Button>
                                    </Grid.Col>
                                </Grid>
                            </Modal>
                            <Paper
                                // p="xl"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            >
                                <Group position="apart">
                                    <Text weight="bold" size="xl" py="md">
                                        General Booking Details
                                    </Text>
                                    <Button
                                        size="md"
                                        disabled={city === ""}
                                        variant="filled"
                                        color="red"
                                        // disabled={loading}
                                        // leftIcon={<X />}
                                        onClick={() => {
                                            setCity("");
                                            setEventType("");
                                            setDuration("");
                                            setBookingDateSelected(new Date());
                                            setHideSelectButton(true);
                                            setSelectedVendorCategory("");
                                            setTotalPrice("");
                                            setVendor("");
                                            setSelectedVendorPackage("");
                                            setIdOfSelectedVendorPackage("");

                                            form1.reset();
                                        }}
                                    >
                                        RESET
                                    </Button>

                                    {/* <Text weight="bold" color="red" size="xl" py="md">
                    Total Cost Rs. {totalPrice}
                  </Text> */}
                                </Group>

                                <form
                                // onSubmit={form1.onSubmit((values) => handleSubmit(values))}
                                >
                                    <Grid justify="space-around" py="md">
                                        <Grid.Col lg={6}>
                                            <Select
                                                required
                                                size="md"
                                                label="City"
                                                placeholder="Select City"
                                                value={city}
                                                onChange={(e) => {
                                                    refreshStates();
                                                    setCity(e);
                                                }}
                                                data={[
                                                    {
                                                        value: "islamabad",
                                                        label: "Islamabad",
                                                    },
                                                    {
                                                        value: "rawalpindi",
                                                        label: "Rawalpindi",
                                                    },
                                                    {
                                                        value: "lahore",
                                                        label: "Lahore",
                                                    },
                                                ]}
                                                rightSection={<ChevronDown size={14} />}
                                                rightSectionWidth={40}
                                            />
                                        </Grid.Col>
                                        <Grid.Col lg={6}>
                                            <Select
                                                required
                                                size="md"
                                                label="Event Type"
                                                placeholder="Event Type"
                                                value={eventType}
                                                onChange={(e) => {
                                                    console.log("event is ", e);
                                                    setEventType(e);
                                                    //   setValue2([]);
                                                }}
                                                data={[
                                                    {
                                                        value: "MEHNDI",
                                                        label: "MEHNDI",
                                                    },
                                                    {
                                                        value: "BARAT",
                                                        label: "BARAT",
                                                    },
                                                    {
                                                        value: "WALIMA",
                                                        label: "WALIMA",
                                                    },
                                                    {
                                                        value: "SEMINAR",
                                                        label: "SEMINAR",
                                                    },
                                                    {
                                                        value: "OTHER",
                                                        label: "OTHER",
                                                    },
                                                ]}
                                                rightSection={<ChevronDown size={14} />}
                                                rightSectionWidth={40}
                                            />
                                        </Grid.Col>
                                        <Grid.Col lg={6}>
                                            <DatePicker
                                                required
                                                minDate={dayjs(new Date())
                                                    .startOf("month")
                                                    .add(new Date().getDate() - 1, "days")
                                                    .toDate()}
                                                inputFormat="YYYY-MM-DD"
                                                size="md"
                                                placeholder="Pick date"
                                                label="Event Date"
                                                icon={<Calendar size={16} />}
                                                value={bookingDateSelected}
                                                // onChange={onChange}

                                                onChange={(e) => {
                                                    setBookingDateSelected(e);

                                                    //   setValue2([]);
                                                }}
                                            />
                                        </Grid.Col>

                                        <Grid.Col lg={6}>
                                            <Select
                                                required
                                                size="md"
                                                label="Duration of Event"
                                                placeholder="Select Duration"
                                                value={duration}
                                                onChange={(e) => setDuration(e)}
                                                data={[
                                                    {
                                                        value: "1 Day",
                                                        label: "1 Day",
                                                    },
                                                    {
                                                        value: "2 Days",
                                                        label: "2 Days",
                                                    },
                                                    {
                                                        value: "3 Days",
                                                        label: "3 Days",
                                                    },
                                                    {
                                                        value: "4 Days",
                                                        label: "4 Days",
                                                    },
                                                ]}
                                                rightSection={<ChevronDown size={14} />}
                                                rightSectionWidth={40}
                                            />
                                        </Grid.Col>

                                        <Grid.Col lg={6}>
                                            <Select
                                                size="md"
                                                required
                                                disabled={city === ""}
                                                label="Select Vendor"
                                                placeholder={
                                                    city
                                                        ? "Select Vendor"
                                                        : "Select Vendor City To Select Vendor"
                                                }
                                                // limit={Infinity}
                                                searchable
                                                value={vendor}
                                                onChange={(e) => {
                                                    setVendor(e);
                                                    setSelectedVendorCategory("");
                                                }}
                                                nothingFound="No One Found"
                                                data={vendorsData}
                                            />
                                        </Grid.Col>
                                        <Grid.Col lg={6}>
                                            <Select
                                                size="md"
                                                disabled={vendor === ""}
                                                label="Service Category"
                                                placeholder={
                                                    vendor
                                                        ? "Select Category"
                                                        : "Select Vendor To Select Vendor"
                                                } // limit={Infinity}
                                                searchable
                                                value={selectedVendorCategory}
                                                onChange={setSelectedVendorCategory}
                                                nothingFound="None Found"
                                                data={CategoryData ? CategoryData : []}
                                            //   {...form.getInputProps("vendorServiceId")}
                                            />
                                        </Grid.Col>
                                    </Grid>
                                    {/* <VendorPackagesForBooking
                                        setIdOfSelectedVendorPackage={setIdOfSelectedVendorPackage}
                                        setTotalPrice={setTotalPrice}
                                        setSelectedVendorPackage={setSelectedVendorPackage}
                                        idOfSelectedVendorPackage={idOfSelectedVendorPackage}
                                        bookingDateSelected={bookingDateSelected}
                                        bookedDateAndTime={bookedDateAndTime}
                                        city={city}
                                        // setCity={setCity}
                                        setVendor={setVendor}
                                        selectedVendorCategory={selectedVendorCategory}
                                        hideSelectButton={hideSelectButton}
                                        vendor={vendor}
                                        error={error}
                                        setError={setError}
                                        setDisabled={setDisabled}
                                        setSelectedVendorCategory={setSelectedVendorCategory}
                                    /> */}
                                    <Grid justify="flex-end">
                                        <Grid.Col sm={6} xs={6} md={6} lg={3} p="md">
                                            <Button
                                                size="md"
                                                fullWidth
                                                variant="filled"
                                                color="red"
                                                // disabled={loading}
                                                rightIcon={<X />}
                                                onClick={() => setOpened(true)}
                                            >
                                                CANCEL
                                            </Button>
                                        </Grid.Col>
                                        <Grid.Col sm={6} xs={6} md={6} lg={3} p="md">
                                            <Button
                                                size="md"
                                                fullWidth
                                                variant="filled"
                                                color="dark"
                                                type="submit"
                                                disabled={disabled}
                                                // loading={loading}
                                                rightIcon={<ArrowRight />}
                                                onClick={nextStep}
                                            >
                                                NEXT
                                            </Button>
                                        </Grid.Col>
                                    </Grid>
                                </form>
                            </Paper>
                        </Stepper.Step>

                        <Stepper.Step
                            color={!stepperDisabled ? "grape" : "gray"}
                            disabled={stepperDisabled}
                            label="Contact Information"
                            description="Contact Information"
                            allowStepSelect={active > 1}
                        >
                            <Paper py="xl">
                                <form
                                // onSubmit={form.onSubmit((values) => handleSubmit1(values))}
                                >
                                    <Group position="apart">
                                        <Text weight="bold" size="xl" py="md">
                                            Contact Information
                                        </Text>
                                        <Text weight="bold" color="red" size="xl" py="md">
                                            Total Cost Rs. {totalPrice}
                                        </Text>
                                    </Group>
                                    <Grid>
                                        <Grid.Col lg={12}>
                                            <Select
                                                size="md"
                                                required
                                                label={
                                                    <>
                                                        <span>Select Customer</span> (
                                                        <span
                                                            style={{
                                                                color: "gray",
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() =>
                                                                navigate("/adduser", {
                                                                    state: {
                                                                        UserType: "customer",
                                                                    },
                                                                })
                                                            }
                                                        >
                                                            Add New Customer?
                                                        </span>
                                                        )
                                                    </>
                                                }
                                                placeholder="Select Customer"
                                                // limit={Infinity}
                                                searchable
                                                value={customer}
                                                onChange={setCustomer}
                                                nothingFound="No One Found"
                                                data={customersData}
                                                {...form.getInputProps("customer")}
                                            // filter={(value, item) =>
                                            //   item.email
                                            //     .toLowerCase()
                                            //     .includes(value.toLowerCase().trim()) ||
                                            //   item._id
                                            //     .toLowerCase()
                                            //     .includes(value.toLowerCase().trim()) ||
                                            //   item.phone
                                            //     .toLowerCase()
                                            //     .includes(value.toLowerCase().trim()) ||
                                            //   item.name
                                            //     .toLowerCase()
                                            //     .includes(value.toLowerCase().trim()) ||
                                            //   item.CNIC.toLowerCase().includes(
                                            //     value.toLowerCase().trim()
                                            //   )
                                            // }
                                            />
                                        </Grid.Col>
                                        <Grid.Col md={12} lg={6}>
                                            <TextInput
                                                error={renderErrorMessage("phone")}
                                                size="md"
                                                required
                                                type="number"
                                                label="Contact Number"
                                                placeholder="03XXXXXXXX"
                                                // disabled={disabled}
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                {...form.getInputProps("phone")}
                                            />
                                        </Grid.Col>
                                        <Grid.Col md={12} lg={6}>
                                            <TextInput
                                                error={renderErrorMessage("email")}
                                                size="md"
                                                placeholder="abc@gmail.com"
                                                value={email}
                                                required
                                                // disabled={disabled}
                                                label="Email Address"
                                                onChange={(e) => setEmail(e.target.value)}
                                                {...form.getInputProps("email")}
                                            />
                                        </Grid.Col>
                                        <Grid.Col md={12} lg={12} py="md">
                                            <Textarea
                                                error={renderErrorMessage("description")}
                                                minRows={10}
                                                size="md"
                                                placeholder="Describe Your Event"
                                                value={description}
                                                required
                                                maxLength={1000}
                                                // disabled={disabled}
                                                label="Booking Description"
                                                onChange={(e) => setDescription(e.target.value)}
                                                {...form.getInputProps("description")}
                                            />
                                        </Grid.Col>
                                    </Grid>
                                    <Grid justify="flex-end">
                                        <Grid.Col sm={6} xs={6} md={6} lg={3} p="md">
                                            <Button
                                                size="md"
                                                fullWidth
                                                variant="filled"
                                                color="red"
                                                // disabled={loading}
                                                leftIcon={<ArrowLeft />}
                                                onClick={prevStep}
                                            >
                                                BACK
                                            </Button>
                                        </Grid.Col>
                                        <Grid.Col sm={6} xs={6} md={6} lg={3} p="md">
                                            <Button
                                                size="md"
                                                fullWidth
                                                variant="filled"
                                                color="dark"
                                                type="submit"
                                                // disabled={disabled}
                                                // loading={loading}
                                                rightIcon={<ArrowRight />}
                                                onClick={nextStep}
                                            >
                                                NEXT
                                            </Button>
                                        </Grid.Col>
                                    </Grid>
                                </form>
                            </Paper>
                        </Stepper.Step>

                        <Stepper.Step
                            color={!stepperDisabled ? "grape" : "gray"}
                            disabled={stepperDisabled}
                            label="Review and Pay"
                            description="Please review your booking details and proceed To payment"
                            allowStepSelect={active > 4}
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
                                                onClick={() => scrollIntoView({ alignment: "center" })}
                                                style={{
                                                    backgroundImage:
                                                        "url(https://media.istockphoto.com/photos/violet-color-velvet-texture-background-picture-id587219358?k=20&m=587219358&s=612x612&w=0&h=PtwQq0Cx7AllJLpAqQkO315w8NxwwAJIrquHjaTym3Y=)",
                                                }}
                                            >
                                                Pay
                                            </Button>
                                        </Group>
                                        <Text weight="bold" color="red" size="xl" py="md">
                                            Total Cost Rs. {totalPrice}
                                        </Text>
                                    </Group>
                                    <Grid>
                                        {/* <Grid.Col lg={12}>
                                            <ViewAllVendorPaymentTableReceipts
                                                bookedDateAndTime={bookedDateAndTime}
                                                vendorTitle={allVendors
                                                    .filter((e) => e._id === vendor)
                                                    .map((e) => e.vendorBusinessTitle)}
                                                vendorAddress={allVendors
                                                    .filter((e) => e._id === vendor)
                                                    .map((e) => e.address)}
                                                vendorEmail={allVendors
                                                    .filter((e) => e._id === vendor)
                                                    .map((e) => e.infoEmail)}
                                                vendorPhone={allVendors
                                                    .filter((e) => e._id === vendor)
                                                    .map((e) => e.contactPhone)}
                                                vendorWhatsapp={allVendors
                                                    .filter((e) => e._id === vendor)
                                                    .map((e) => e.contactWhatsApp)}
                                                packageTitle={selectedVendorPackage?.vendorPackageTitle}
                                                packageDuration={selectedVendorPackage?.packageDuration}
                                                bookingDesription={description}
                                                serviceTitle={
                                                    selectedVendorPackage?.vendorBusinessId
                                                        ?.vendorBusinessTitle
                                                }
                                                totalPrice={totalPrice}
                                                customerName={allCustomers
                                                    .filter((e) => e._id === customer)
                                                    .map((e) => e.name)}
                                                customerPhone={phone}
                                                customerEmail={email}
                                            />
                                        </Grid.Col> */}
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
                                                <Title className={classes.title} order={2} pt="sm">
                                                    Payment Breakdown
                                                </Title>

                                                <SimpleGrid
                                                    cols={1}
                                                    spacing={20}
                                                    breakpoints={[
                                                        { maxWidth: 550, cols: 1, spacing: 40 },
                                                    ]}
                                                    style={{ marginTop: 30 }}
                                                >
                                                    {items}
                                                </SimpleGrid>
                                            </Paper>
                                        </Grid.Col>
                                        <Grid.Col md={12} lg={6} ref={targetRef}>
                                            {/* <Center> */}
                                            {/* <StripePromise
                                                paidSuccessfully={paidSuccessfully}
                                                setPaidSuccessfully={setPaidSuccessfully}
                                                onClickBack={prevStep}
                                                setConfirmBooking={setConfirmBooking}
                                                amountPayable={
                                                    (totalPrice +
                                                        totalPrice * taxPercentage -
                                                        totalPrice * discountPercentage) *
                                                    bookingPercentage
                                                }
                                            // start={start}
                                            />

                                            </Center> */}
                                        </Grid.Col>
                                    </Grid>
                                </form>
                            </Paper>
                        </Stepper.Step>
                        {/*            <Stepper.Completed>
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
                <div ref={componentRef}>
                  <ViewAllVendorPaymentTableReceiptsAfterPayment
                    bookedDateAndTime={bookedDateAndTime}
                    vendorTitle={allVendors
                      .filter((e) => e._id === vendor)
                      .map((e) => e.vendorBusinessTitle)}
                    vendorAddress={allVendors
                      .filter((e) => e._id === vendor)
                      .map((e) => e.address)}
                    vendorEmail={allVendors
                      .filter((e) => e._id === vendor)
                      .map((e) => e.infoEmail)}
                    vendorPhone={allVendors
                      .filter((e) => e._id === vendor)
                      .map((e) => e.contactPhone)}
                    vendorWhatsapp={allVendors
                      .filter((e) => e._id === vendor)
                      .map((e) => e.contactWhatsApp)}
                    packageTitle={selectedVendorPackage?.vendorPackageTitle}
                    packageDuration={selectedVendorPackage?.packageDuration}
                    bookingDesription={description}
                    serviceTitle={
                      selectedVendorPackage?.vendorBusinessId
                        ?.vendorBusinessTitle
                    }
                    totalPrice={totalPrice}
                    customerName={allCustomers
                      .filter((e) => e._id === customer)
                      .map((e) => e.name)}
                    customerPhone={phone}
                    customerEmail={email}
                  />
                </div>

                <Grid justify="flex-end">
                  <Grid.Col sm={6} xs={6} md={6} lg={3} p="md">
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
                  <Grid.Col sm={6} xs={6} md={6} lg={3} p="md">
                    <Button
                      rightIcon={<Printer />}
                      uppercase
                      fullWidth
                      color="dark"
                      size="md"
                      onClick={() => {
                        console.log("Downloading your invoice");
                        handlePrint();
                      }}
                    >
                      Print Invoice
                    </Button>
                  </Grid.Col>
                </Grid>
              </Paper>
            </Stepper.Completed>*/}
                    </Stepper>
                </Paper>
            </Center>
        </Paper>
    );
};

export default AddBooking;
