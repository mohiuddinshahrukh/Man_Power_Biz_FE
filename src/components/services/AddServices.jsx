import {
    ArrowLeft,
    ArrowRight,
    BrandFacebook,
    BrandInstagram,
    BrandLinktree,
    BrandWhatsapp,
    Check,
    ChevronDown,
    Mail,
    Mailbox,
    Map2,
    MapPin,
    Phone,
    Trash,
    TrashOff,
} from "tabler-icons-react";
import { useForm } from "@mantine/form";
import {
    TextInput,
    Group,
    Title,
    Text,
    Image,
    Button,
    Textarea,
    Grid,
    createStyles,
    Modal,
    Stepper,
    Paper,
    Center,
    // NativeSelect,
    Select,
    Card,
    Input,
    Checkbox,
    Avatar,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState, useEffect } from "react";

import { X } from "tabler-icons-react";

import { LoadingOverlay } from "@mantine/core";
// import axios from "axios";

// import { v4 } from "uuid";
// import { storage } from "../../firbase/Firebase";
// import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

// import { SimpleGrid } from "@mantine/core";
import { useRef } from "react";
// import { Dropzone, MIME_TYPES } from "@mantine/dropzone";

import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import UploadImages from "../UploadImages/UploadImages";
import { Carousel } from "@mantine/carousel";
// import MapComponent from "../mapGoogle/MapComponent";
// import MapComponentView from "../mapGoogle/MapComponentView";

const useStyles = createStyles((theme) => ({
    wrapper: {
        marginTop: "25px",
        position: "relative",
        marginBottom: 30,
    },

    dropzone: {
        borderWidth: 2,
        paddingBottom: 50,
    },

    icon: {
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[3]
                : theme.colors.gray[4],
    },

    control: {
        position: "absolute",
        width: 250,
        left: "calc(50% - 125px)",
        bottom: -20,
    },
    card: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },

    footer: {
        display: "flex",
        justifyContent: "space-between",
        padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
        borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
            }`,
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1,
    },
}));

// const items = stats.map((stat) => (
//   <div key={stat.title}>
//     <Text size="xs" color="dimmed">
//       {stat.title}
//     </Text>
//     <Text weight={500} size="sm">
//       {stat.value}
//     </Text>
//   </div>
// ));

const AddService = () => {
    // const location = useLocation();
    // setCurrentLocation("Add Vendor");

    const renderErrorMessage = (name) => {
        if (errorMessages[name]) {
            return errorMessages[name];
        }
    };
    // HOOKS
    // CONST PIN LOCATION
    const [pinLocation, setPinLocation] = useState(null);
    const [pinAddress, setPinAddress] = useState("");
    const [pinGeoLocation, setPinGeoLocation] = useState("");
    const [error3, setError3] = useState("");
    const [errorMessages, setErrorMessages] = useState({});
    const [opened, setOpened] = useState(false);
    const [percentage, setPercentage] = useState(0);
    const [isLoading, setLoading] = useState(true);
    // const imageListRef = ref(storage, "images/");
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [props, setProps] = useState([]);
    const [coverImageHook, setCoverImageHook] = useState(null);
    const { classes, theme } = useStyles();
    const [getConfirm, setConfirm] = useState(false);
    const openRef = useRef(null);

    const [vendor, setVendor] = useState("");
    const [getaddress, setaddress] = useState("");
    const [getVendorBusinessDescription, setVendorBusinessDescription] =
        useState("");

    const [getcontactPhone, setcontactPhone] = useState("");
    const [getcontactWhatsApp, setcontactWhatsApp] = useState("");
    const [getfeedbackEmail, setfeedbackEmail] = useState("");
    const [getwebsiteURL, setwebsiteURL] = useState("");
    const [getfacebookURL, setfacebookURL] = useState("");
    const [getinstagramURL, setinstagramURL] = useState("");
    const [getvendorId, setvendorId] = useState("");
    const [getvendorCategoryId, setvendorCategoryId] = useState("");
    const [getvendorServiceTitle, setvendorServiceTitle] = useState("");
    const [getinfoEmail, setinfoEmail] = useState("");
    const [getcity, setcity] = useState("");
    const [venueCity, setVenueCity] = useState("");

    // UPLOAD IMAGES
    const [error, setError] = useState("");
    const [error2, setError2] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [disabled1, setDisabled1] = useState(false);
    const [images, setImages] = useState([]);
    const [hidden, setHidden] = useState(true);

    const [percentages, setPercentages] = useState([]);
    const [urls, setUrls] = useState([]); // for useEffect only.... else not needed
    const [imageURLS, setImageURLS] = useState([]);
    const [indexOfCoverImageURL, setIndexOfCoverImageURL] = useState();

    const [disabled2, setDisabled2] = useState(false);

    const [videos, setVideos] = useState([]);
    const [percentages2, setPercentages2] = useState([]);
    const [urls2, setUrls2] = useState([]);
    const [checked, setChecked] = useState(false);

    const [allVenueServices, setAllVenueServices] = useState([]);
    console.log("allVenueServices", allVenueServices);
    const [selectedVenueServices, setSelectedVenueServices] = useState([]);
    const [selectedVenueServiceObject, setSelectedVenueServiceObject] = useState(
        []
    );
    console.log("selectedVenueServiceObject", selectedVenueServiceObject);
    console.log("selectedVenueServices", selectedVenueServices);

    const [citiesData, setCitiesData] = useState([
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
    ]);

    const [id, setid] = useState("");

    useEffect(() => {
        console.log("UseEffect is running!");
        // Image uploading code here
        if (isLoading) {
            setLoading(false);
            console.log("use Effect Triggered");
            // listAll(imageListRef).then((res) => {
            //   res.items.forEach((item) => {
            //     getDownloadURL(item).then((url) => {
            //       console.log("Talha URL", url);
            //       setImageList((prev) => [...prev, url]);
            //     });
            //   });
            // });
        } else return;
        // Get Vendor categories code here
        // axios
        //     .get("https://a-wep.herokuapp.com/superAdmin/getVendorCategories")
        //     .then((res) => {
        //         console.log(res.data);
        //         if (res.data.status === "success") {
        //             console.log("Get Vendors Categories API was a success");
        //             // let data = res.data.data.map((categories) =>
        //             //   createVendorsCategories(categories._id, categories.categoryTitle)
        //             // );
        //             // setVendorsCategories(data);
        //             setAllVenueServices(res.data.data);
        //             setVisible(false);
        //         } else {
        //             alert("Error");
        //         }
        //     });

        // Get Vendors code here
        // axios
        //     .get("https://a-wep.herokuapp.com/superAdmin/getVendors")
        //     .then((res) => {
        //         console.log(res.data);
        //         if (res.data.status === "success") {
        //             let users = res.data?.data;
        //             console.log("Get Vendors API was a success", users);
        //             console.log(res.data);
        //             if (res.data.data.length == 0) {
        //                 console.log("Length Checked equal to 0");
        //                 setVendorsData([]);
        //                 return;
        //             } else {
        //                 console.log("Length Checked not equal to 0");
        //             }
        //             console.log("Get Vendors API was a success, checking data length");
        //             let data = res.data.data.map((vendors) =>
        //                 createVendorsData(vendors._id, vendors.name)
        //             );
        //             setVendorsData(data);
        //             setVisible(false);
        //         } else {
        //             alert("Error");
        //         }
        //     });
    }, []);
    const createVendorsData = (id, name) => {
        console.log("Here in create vendors Data");
        if (id != null && name != null) {
            console.log("If");
            console.log("service id: ", id);
            console.log("service name: ", name);

            return { value: id, label: name };
        } else {
            console.log("Else");
            console.log("service id: ", id);
            console.log("service name: ", name);
            return { value: "", label: "No vendors available" };
        }
    };
    const createVendorsCategories = (id, title) => {
        console.log("Category id: ", id);
        console.log("Category name: ", title);

        return { value: id, label: title };
    };
    useEffect(() => {
        if (allVenueServices.length > 0) {
            if (selectedVenueServices.length === allVenueServices.length) {
                setChecked(true);
            } else {
                setChecked(false);
            }
        } else {
            setChecked(false);
        }
    }, [selectedVenueServices]);

    let navigate = useNavigate();
    const [getVendorsData, setVendorsData] = useState([{
        label
            :
            "Ahsan Malik",
        value
            :
            "63aaf4f47dd7aafe3a380e42"
    }]);
    console.log("getVendorsData", getVendorsData);
    const [getVendorCategories, setVendorsCategories] = useState([]);
    const form2 = useForm({
        validateInputOnChange: true,
        initialValues: {
            contactPhone: "",
            contactWhatsApp: "",
            infoEmail: "",

            feedbackEmail: "",
            websiteURL: "",
            facebookURL: "",
            instagramURL: "",
            coverImage: "",
        },
        validate: {
            feedbackEmail: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value.trim())
                    ? // /^\S+@[a-zA-Z]+\.[a-zA-Z]+$/.test(value.trim())
                    null
                    : "Invalid Email",
            infoEmail: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value.trim())
                    ? // /^\S+@[a-zA-Z]+\.[a-zA-Z]+$/.test(value.trim())
                    null
                    : "Invalid Email",

            contactPhone: (value) =>
                /^(03)(\d{9})$/.test(value)
                    ? null
                    : "11 digits Phone Number must start with 03",
            contactWhatsApp: (value) =>
                /^(03)(\d{9})$/.test(value)
                    ? null
                    : "11 digits Phone Number must start with 03",

            websiteURL: (value) =>
                value.trim().length > 1 || value === "" ? null : "invalid link",

            facebookURL: (value) =>
                value.trim().length > 1 || value === "" ? null : "invalid link",
            instagramURL: (value) =>
                value.trim().length > 1 || value === "" ? null : "invalid link",
        },
    });
    const handleServicesSelect = () => {
        if (selectedVenueServices.length > 0) {
            nextStep();
        } else {
            setError2("Please Select atleast one Service");
        }
    };
    const form1 = useForm({
        validateInputOnChange: [
            "vendorCategoryId",
            "vendorId",
            "address",
            "vendorServiceTitle",
            "city",
        ],
        initialValues: {
            vendorCategoryId: "",
            vendorId: "",
            address: "",
            city: "",
            vendorServiceDescription: "",
            vendorServiceTitle: "",
        },

        validate: {
            vendorServiceTitle: (value) =>
                value.trim().length > 1 ? null : "Name with 2 or more characters",

            vendorServiceDescription: (value) =>
                value.trim().length > 20
                    ? null
                    : "Description with 20 or more characters",
        },
    });

    const handleCheckImages = () => {
        nextStep()
        // if (images.length > 0) {
        //     setDisabled(false);
        //     nextStep();
        // } else {
        //     setDisabled(true);
        //     setError("Please upload atleast one image");
        // }
    };
    const handleSubmitForm1 = async (event) => {
        var {
            vendorId,
            vendorCategoryId,
            vendorServiceTitle,
            city,
            address,
            vendorServiceDescription,
        } = event;

        setvendorId(vendorId);
        setvendorCategoryId(vendorCategoryId);
        setvendorServiceTitle(vendorServiceTitle);
        setcity(city);
        setaddress(address);
        setVendorBusinessDescription(vendorServiceDescription);

        // if (pinLocation === null) {
        //     setError3("PLEASE SELECT A PIN ON THE MAP");
        // } 

        setError3("");

        console.log(event);
        nextStep();

    };

    const handleSubmitForm2 = async (event) => {
        var {
            contactPhone,
            contactWhatsApp,
            feedbackEmail,
            infoEmail,

            websiteURL,
            facebookURL,
            instagramURL,
        } = event;
        console.log(
            "Eventisia",
            contactPhone,
            contactWhatsApp,
            feedbackEmail,
            websiteURL,
            facebookURL,
            instagramURL
        );
        setcontactPhone(contactPhone);
        setcontactWhatsApp(contactWhatsApp);
        setfeedbackEmail(feedbackEmail);
        setwebsiteURL(websiteURL);
        setfacebookURL(facebookURL);
        setinfoEmail(infoEmail);

        setinstagramURL(instagramURL);
        console.log("Event From handleSubmitForm2", event);
        nextStep();
    };
    const handleSubmit = async () => {
        console.log("Handle Submit has been triggered");

        const imageObject = images.map((image) => {
            return {
                name: image.name,
                size: image.size,
            };
        });
        const videoObjects = videos.map((video) => {
            return {
                name: video.name,
                size: video.size,
            };
        });

        const body = {
            coverImage: imageURLS[indexOfCoverImageURL],
            images: imageURLS,
            imageObjects: imageObject,
            videos: urls2,
            videoObjects: videoObjects,
            vendorId: getvendorId,
            // vendorCategoryId: getvendorCategoryId,
            // vendorServiceTitle: getvendorServiceTitle,
            vendorBusinessTitle: getvendorServiceTitle,
            infoEmail: getinfoEmail,
            city: venueCity,
            vendorBusinessDescription: getVendorBusinessDescription,
            // vendorServiceDescription: getVendorBusinessDescription,
            address: getaddress,
            vendorCategories: selectedVenueServices,
            contactPhone: getcontactPhone,
            contactWhatsApp: getcontactWhatsApp,
            feedbackEmail: getfeedbackEmail,
            websiteHandle: getwebsiteURL,
            facebookHandle: getfacebookURL,
            instagramHandle: getinstagramURL,
            pinLocation: pinLocation,
        };
        console.log("service ki body", body);
        const headers = {
            "Content-Type": "application/json",
        };

        setVisible(true);
        try {
            // console.log("???????????????????????????????");
            // console.log("Here in posting form data vendor Service: ", body);
            // console.log("???????????????????????????????");
            // // const response = await axios({
            // //     method: "post",
            // //     url: "https://a-wep.herokuapp.com/superAdmin/addVendorBusiness",
            // //     data: body,
            // //     headers: headers,
            // // });
            // // setLoading(false);

            // console.log(response.data);
            // if (response.data.status === "error") {
            //     console.log(response.data.error);
            //     // setErrorMessages(response.data.error);
            //     let E_msg = response.data.error.message;
            //     showNotification({
            //         color: "red",
            //         title: "Service Add Unsuccessful",
            //         message: `Service Could not be added due to ${E_msg}`,
            //     });
            // } else {
            //     showNotification({
            //         color: "green",
            //         title: `Service Add Successful`,
            //         message: `Service Has Been Added Successfully`,
            //     });

            //     navigate("/vendorServices");
            //     // setid(response.data.data._id);
            //     // setvendorId(vendorId);
            //     // setvendorCategoryId(vendorCategoryId);
            //     // setvendorServiceTitle(vendorServiceTitle);
            //     // setinfoEmail(infoEmail);
            //     // setcity(city);
            //     // setaddress(address);
            //     // setVendorBusinessDescription(vendorServiceDescription);
            //     // setcontactPhone(contactPhone);
            //     // setcontactWhatsApp(contactWhatsApp);
            //     // setfeedbackEmail(feedbackEmail);
            //     // setwebsiteURL(websiteURL);
            //     // setfacebookURL(facebookURL);
            //     // setinstagramURL(instagramURL);
            // }
        } catch (err) {
            console.log(err);
        }

        setVisible(false);
    };
    const [getVisible, setVisible] = useState(true);
    const [active, setActive] = useState(0);
    const nextStep = () =>
        setActive((current) => (current < 4 ? current + 1 : current));
    const prevStep = () =>
        setActive((current) => (current > 0 ? current - 1 : current));
    return (
        <Paper
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
            }}
        >
            {/* <LoadingOverlay
                visible={getVisible}
                loaderProps={{ size: "xl", color: "pink", variant: "bars" }}
                overlayOpacity={0.5}
                overlayColor="#c5c5c5"
            /> */}
            <Center>
                <Paper
                    py="xl"
                    style={{
                        width: "80%",
                        height: "100%",
                    }}
                >
                    <Title order={2} align="center" py="xl">
                        Add Service
                    </Title>

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
                            Are You Sure You Want To Cancel?
                        </Title>
                        <Grid align="center" justify="space-around" p="md">
                            <Grid.Col align="center" xs={3} sm={3} md={4} lg={4}>
                                <Button
                                    align="center"
                                    color="light"
                                    leftIcon={<TrashOff size={14} />}
                                    onClick={() => setOpened(false)}
                                >
                                    No, Don't Cancel
                                </Button>
                            </Grid.Col>
                            <Grid.Col align="center" xs={5} sm={4} md={4} lg={4}>
                                <Button
                                    align="center"
                                    color="red"
                                    leftIcon={<Trash size={14} />}
                                    onClick={() => navigate("/vendorServices")}
                                >
                                    Yes, Cancel
                                </Button>
                            </Grid.Col>
                        </Grid>
                    </Modal>
                    <Stepper
                        color="grape"
                        active={active}
                        onStepClick={setActive}
                        breakpoint="sm"
                        pt="xl"
                    >
                        <Stepper.Step
                            label="Service Details"
                            description="Genral Service Details"
                            allowStepSelect={active > 0}
                        >
                            <Text weight="bold" size="xl" py="md">
                                General Service Details
                            </Text>

                            <form
                                style={{ padding: "0px", margin: "auto" }}
                                onSubmit={form1.onSubmit((values) => {
                                    console.log("The values are: ", values);
                                    handleSubmitForm1(values);
                                })}
                            >
                                <Grid grow>
                                    <Grid.Col lg={6}>
                                        <Select
                                            required
                                            size="md"
                                            label="Select City"
                                            placeholder="Select City"
                                            value={venueCity}
                                            onChange={(e) => setVenueCity(e)}
                                            data={[
                                                {
                                                    value: "kolkata",
                                                    label: "Kolkata",
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
                                            label={
                                                <>
                                                    <span>Service Category</span> (
                                                    <span
                                                        style={{
                                                            color: "gray",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() =>
                                                            navigate("/adduser", {
                                                                state: {
                                                                    UserType: "vendor",
                                                                },
                                                            })
                                                        }
                                                    >
                                                        Add New Category?
                                                    </span>
                                                    )
                                                </>
                                            }
                                            placeholder="Select Category"
                                            // limit={Infinity}
                                            searchable
                                            value={vendor}
                                            onChange={setVendor}
                                            nothingFound="No One Found"
                                            data={getVendorsData}
                                            {...form1.getInputProps("vendorId")}
                                        />
                                    </Grid.Col>
                                    <Grid.Col lg={12}>
                                        <TextInput
                                            required
                                            label="Service Title"
                                            placeholder="Service Title"
                                            maxLength={100}
                                            // mt="sm"
                                            size="md"
                                            error={renderErrorMessage("vendorServiceTitle")}
                                            {...form1.getInputProps("vendorServiceTitle")}
                                        />
                                    </Grid.Col>
                                    <Grid.Col lg={12}>
                                        <Textarea
                                            required
                                            label="Business Description"
                                            maxLength={1500}
                                            size="md"
                                            placeholder="Enter Business Description"
                                            minRows={3}
                                            error={renderErrorMessage("vendorServiceDescription")}
                                            {...form1.getInputProps("vendorServiceDescription")}
                                        />
                                    </Grid.Col>
                                    <Grid.Col lg={12}>
                                        <Textarea
                                            required
                                            label="Address "
                                            maxLength={100}
                                            placeholder="Enter Address"
                                            // mt="sm"
                                            size="md"
                                            {...form1.getInputProps("address")}
                                        />
                                    </Grid.Col>

                                    <Grid.Col lg={12}>
                                        <Input.Wrapper required size="md" error={error3}>
                                            {/* <MapComponent
                                                pinAddress={pinAddress}
                                                setPinAddress={setPinAddress}
                                                pinLocation={pinLocation}
                                                pinGeoLocation={pinGeoLocation}
                                                setPinLocation={setPinLocation}
                                                setPinGeoLocation={setPinGeoLocation}
                                                setFieldValueForm={form1.setFieldValue}
                                                setError3={setError3}
                                            /> */}
                                        </Input.Wrapper>
                                    </Grid.Col>
                                    {/* <Grid.Col lg={6}>
                    <Select
                      size="md"
                      required
                      label="Vendor Category"
                      placeholder="Select Vendor Category"
                      // limit={Infinity}
                      searchable
                      value={vendor}
                      onChange={setVendor}
                      nothingFound="No One Found"
                      data={getVendorCategories}
                      {...form1.getInputProps("vendorCategoryId")}
                    />
                  </Grid.Col> */}
                                </Grid>
                                <Grid justify="flex-end" pt="xl">
                                    <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                                        <Button
                                            fullWidth
                                            leftIcon={<X />}
                                            color="red"
                                            size="md"
                                            onClick={() => {
                                                setOpened(true);
                                            }}
                                        >
                                            CANCEL
                                        </Button>
                                    </Grid.Col>
                                    <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                                        <Button
                                            fullWidth
                                            rightIcon={<ArrowRight />}
                                            type="submit"
                                            size="md"
                                            color="dark"
                                        >
                                            NEXT
                                        </Button>
                                    </Grid.Col>
                                </Grid>
                            </form>
                        </Stepper.Step>
                        {/* <Stepper.Step
                            label="Select Services"
                            description="Select Vendor Services"
                            allowStepSelect={active > 1}
                        >
                            <Input.Wrapper error={error2} size="lg">
                                <Text weight="bold" size="xl" py="md">
                                    Select your Venodor Categories
                                </Text>
                            </Input.Wrapper>
                            <Paper pb="xl">
                                <Checkbox
                                    size="md"
                                    label="Select All"
                                    checked={checked}
                                    onChange={(event) => setChecked(event.currentTarget.checked)}
                                    onClick={() => {
                                        if (!checked) {
                                            setSelectedVenueServices(
                                                allVenueServices?.map((m) => m._id)
                                            );

                                            setSelectedVenueServiceObject(allVenueServices);
                                        } else {
                                            setSelectedVenueServices([]);
                                            setSelectedVenueServiceObject([]);
                                        }
                                    }}
                                />
                                <Checkbox.Group
                                    value={selectedVenueServices}
                                    onChange={(e) => {
                                        // const mapped = e.map((item) => {
                                        //   return {
                                        //     image: allVenueServices.filter(
                                        //       (e) => e.categoryTitle === item
                                        //     )[0].image,

                                        //     categoryTitle: item,
                                        //     categoryDescription: allVenueServices.filter(
                                        //       (e) => e.categoryTitle === item
                                        //     )[0].categoryDescription,
                                        //     servicePrice: 0,
                                        //   };
                                        // });
                                        setSelectedVenueServices(e);
                                        // setSelectedVenueServiceObject(mapped);
                                        setError2("");
                                    }}
                                    // onChange={setSelectedVenueServices}
                                    size="md"
                                    pb="xl"
                                >
                                    <Grid>
                                        {allVenueServices?.map((row, index) => {
                                            return (
                                                <Grid.Col lg={12} key={index}>
                                                    <Checkbox
                                                        key={index}
                                                        value={row._id}
                                                        label={
                                                            <Paper
                                                                style={{
                                                                    display: "flex",
                                                                    // justifyContent:"center"
                                                                    alignItems: "center",
                                                                }}
                                                            >
                                                                <Avatar src={row.image} alt="it's me" />
                                                                <div
                                                                    style={{
                                                                        paddingLeft: "1rem",
                                                                    }}
                                                                >
                                                                    <Text>{row.categoryTitle}</Text>
                                                                    <Text size="xs" color="dimmed">
                                                                        {row.categoryDescription}
                                                                    </Text>
                                                                </div>
                                                            </Paper>
                                                        }
                                                        pr="md"
                                                    />
                                                </Grid.Col>
                                            );
                                        })}
                                    </Grid>
                                </Checkbox.Group>
                                <Grid justify="flex-end" py="md">
                                    <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
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
                                    <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                                        <Button
                                            size="md"
                                            fullWidth
                                            variant="filled"
                                            color="dark"
                                            // disabled={disabled}
                                            // loading={loading}
                                            rightIcon={<ArrowRight />}
                                            onClick={handleServicesSelect}
                                        >
                                            NEXT
                                        </Button>
                                    </Grid.Col>
                                </Grid>
                            </Paper>
                        </Stepper.Step> */}
                        <Stepper.Step
                            label="Service Images"
                            description="Service Media"
                            allowStepSelect={active > 1}
                        >
                            <Text weight="bold" size="xl" py="md">
                                Describe Service With Images
                            </Text>

                            {/* <UploadImages
                                error={error}
                                setError={setError}
                                disabled={disabled}
                                setDisabled={setDisabled}
                                disabled1={disabled1}
                                setDisabled1={setDisabled1}
                                disabled2={disabled2}
                                setDisabled2={setDisabled2}
                                images={images}
                                setImages={setImages}
                                percentages={percentages}
                                setPercentages={setPercentages}
                                urls={urls}
                                setUrls={setUrls}
                                imageURLS={imageURLS}
                                setImageURLS={setImageURLS}
                                indexOfCoverImageURL={indexOfCoverImageURL}
                                setIndexOfCoverImageURL={setIndexOfCoverImageURL}
                                videos={videos}
                                setVideos={setVideos}
                                percentages2={percentages2}
                                setPercentages2={setPercentages2}
                                urls2={urls2}
                                setUrls2={setUrls2}
                                hidden={hidden}
                                setHidden={setHidden}
                                folder="vendor"
                                addImages="Describe Your Business With Images"
                                addVideos="Describe Your Business With Videos"
                            /> */}
                            <Grid justify="flex-end" py="md">
                                <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                                    <Button
                                        fullWidth
                                        leftIcon={<ArrowLeft />}
                                        color="red"
                                        size="md"
                                        onClick={prevStep}
                                        disabled={disabled1 || disabled2}

                                    // disabled={disabled}
                                    >
                                        BACK
                                    </Button>
                                </Grid.Col>

                                <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                                    <Button
                                        fullWidth
                                        rightIcon={<ArrowRight />}
                                        type="submit"
                                        size="md"
                                        color="dark"
                                        onClick={handleCheckImages}
                                        disabled={disabled1 || disabled2}
                                    >
                                        NEXT
                                    </Button>
                                </Grid.Col>
                            </Grid>
                        </Stepper.Step>

                        <Stepper.Step
                            label="Contact Information"
                            description="Service Contact Information"
                            allowStepSelect={active > 2}
                        >
                            <Text weight="bold" size="xl" py="md">
                                Service Contact Information
                            </Text>
                            <form
                                style={{ padding: "0px", margin: "auto" }}
                                onSubmit={form2.onSubmit(() => { nextStep() }
                                    // (values) => handleSubmitForm2(values)
                                )}
                            >
                                <Grid grow>
                                    <Grid.Col lg={6}>
                                        <TextInput
                                            required
                                            label="Information Email"
                                            placeholder="Enter Information Email"
                                            style={{
                                                wordBreak: "break-word",
                                                whiteSpace: "normal",
                                            }}
                                            // mt="sm"
                                            size="md"
                                            error={renderErrorMessage("infoEmail")}
                                            {...form2.getInputProps("infoEmail")}
                                        />
                                    </Grid.Col>
                                    <Grid.Col lg={6}>
                                        <TextInput
                                            style={{
                                                wordBreak: "break-word",
                                                whiteSpace: "normal",
                                            }}
                                            required
                                            label={
                                                <>
                                                    <span>FeedBack Email</span> (
                                                    <span
                                                        style={{
                                                            color: "gray",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() =>
                                                            form2.setFieldValue(
                                                                "feedbackEmail",
                                                                form2.getInputProps("infoEmail").value
                                                            )
                                                        }
                                                    >
                                                        Same As Email?
                                                    </span>
                                                    )
                                                </>
                                            }
                                            placeholder="Enter Feedback Email"
                                            // mt="sm"
                                            size="md"
                                            error={renderErrorMessage("feedbackEmail")}
                                            {...form2.getInputProps("feedbackEmail")}
                                        />
                                    </Grid.Col>
                                    <Grid.Col lg={6}>
                                        <TextInput
                                            type="number"
                                            required
                                            label="Contact Number"
                                            placeholder="Enter Contact Number"
                                            // mt="sm"
                                            size="md"
                                            error={renderErrorMessage("contactPhone")}
                                            {...form2.getInputProps("contactPhone")}
                                        />
                                    </Grid.Col>
                                    <Grid.Col lg={6}>
                                        <TextInput
                                            required
                                            label={
                                                form2.getInputProps("contactPhone").value.length ===
                                                    11 ? (
                                                    <>
                                                        <span>WhatsApp Number</span> (
                                                        <span
                                                            style={{
                                                                color: "gray",
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() =>
                                                                form2.setFieldValue(
                                                                    "contactWhatsApp",
                                                                    form2.getInputProps("contactPhone").value
                                                                )
                                                            }
                                                        >
                                                            Same As Phone?
                                                        </span>
                                                        )
                                                    </>
                                                ) : (
                                                    "WhatsApp Number"
                                                )
                                            }
                                            placeholder="Enter Whatsapp Number"
                                            // mt="sm"
                                            size="md"
                                            error={renderErrorMessage("contactWhatsApp")}
                                            {...form2.getInputProps("contactWhatsApp")}
                                        />
                                    </Grid.Col>
                                    <Grid.Col lg={6}>
                                        <TextInput
                                            label="Service Website Link"
                                            placeholder="Enter Website Link"
                                            maxLength={60}
                                            style={{
                                                wordBreak: "break-word",
                                                whiteSpace: "normal",
                                            }}
                                            // mt="sm"
                                            size="md"
                                            error={renderErrorMessage("websiteURL")}
                                            {...form2.getInputProps("websiteURL")}
                                        />
                                    </Grid.Col>
                                    <Grid.Col lg={6}>
                                        <TextInput
                                            label="Service Facebook Link"
                                            placeholder="Service Facebook Link"
                                            maxLength={60}
                                            // mt="sm"
                                            size="md"
                                            style={{
                                                wordBreak: "break-word",
                                                whiteSpace: "normal",
                                            }}
                                            error={renderErrorMessage("facebookURL")}
                                            {...form2.getInputProps("facebookURL")}
                                        />
                                    </Grid.Col>
                                    <Grid.Col lg={6}>
                                        <TextInput
                                            label="Service Instagram Link"
                                            placeholder="Service Instagram Link"
                                            maxLength={60}
                                            style={{
                                                wordBreak: "break-word",
                                                whiteSpace: "normal",
                                            }}
                                            // mt="sm"
                                            size="md"
                                            error={renderErrorMessage("instagramURL")}
                                            {...form2.getInputProps("instagramURL")}
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
                                            Back
                                        </Button>
                                    </Grid.Col>
                                    <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                                        <Button
                                            fullWidth
                                            rightIcon={<ArrowRight />}
                                            size="md"
                                            color="dark"
                                            type="submit"
                                        >
                                            NEXT
                                        </Button>
                                    </Grid.Col>
                                </Grid>
                            </form>
                        </Stepper.Step>

                        <Stepper.Completed
                            label="Review & Confirm"
                            description="Review & confirm entered details"
                            allowStepSelect={active > 3}
                        >
                            <Paper
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            >
                                <Text weight="bold" size="xl" py="md">
                                    Review And Confirm Your Details
                                </Text>

                                <Card shadow="sm" radius="md">
                                    <Card.Section>
                                        <Carousel
                                            withIndicators
                                            height={300}
                                            slideSize="50%"
                                            slideGap="md"
                                            loop
                                            breakpoints={[
                                                { maxWidth: "md", slideSize: "50%" },
                                                { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
                                            ]}
                                            align="start"
                                        >
                                            {urls.map((image, index) => (
                                                <Carousel.Slide key={index}>
                                                    <Image src={image} height={280} alt="Service Image" />
                                                </Carousel.Slide>
                                            ))}
                                            {urls2.map((image, index) => (
                                                <Carousel.Slide key={index}>
                                                    <video src={image} height={280} controls />
                                                </Carousel.Slide>
                                            ))}
                                        </Carousel>
                                    </Card.Section>
                                    <Grid>
                                        <Grid.Col lg={12}>
                                            <Group positon="left">
                                                <Text weight="bold" size="xl">
                                                    {getvendorServiceTitle}
                                                </Text>
                                            </Group>
                                            {getVendorsData.map((vendor, index) => {
                                                return vendor.value === getvendorId ? (
                                                    <Group key={index}>
                                                        <Text color="dimmed" size="lg">
                                                            {vendor.label}
                                                        </Text>
                                                    </Group>
                                                ) : null;
                                            })}
                                        </Grid.Col>

                                        <Grid>
                                            <Grid.Col>
                                                <Group postion="apart" align="center">
                                                    <Map2 size={20} />
                                                    <Text>{venueCity}</Text>
                                                </Group>
                                                <Group align="center">
                                                    <MapPin size={20} />
                                                    <Text>{getaddress}</Text>
                                                </Group>
                                            </Grid.Col>
                                        </Grid>
                                        <Grid.Col>
                                            {/* <MapComponentView
                                                pinLocation={pinLocation}
                                                pinGeoLocation={pinGeoLocation}
                                                pinAddress={pinAddress}
                                            /> */}
                                        </Grid.Col>
                                        <Grid.Col>
                                            <Text size="xl" weight="bold">
                                                Description:
                                            </Text>
                                            <Text
                                                align="justify"
                                                style={{
                                                    wordBreak: "break-word",
                                                    whiteSpace: "normal",
                                                }}
                                            >
                                                {getVendorBusinessDescription}
                                            </Text>
                                        </Grid.Col>
                                        <Grid.Col lg={6}>
                                            {selectedVenueServices.length > 0 ? (
                                                <Text size="xl">
                                                    <b>Services</b>
                                                </Text>
                                            ) : null}

                                            {allVenueServices
                                                ?.filter((e) => selectedVenueServices.includes(e._id))
                                                .map((service, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            padding: "1px",
                                                        }}
                                                    >
                                                        <Avatar
                                                            src={service.image}
                                                            alt="it's me"
                                                            size="sm"
                                                        />
                                                        <Text size="md" pl="md">
                                                            {service.categoryTitle}
                                                        </Text>
                                                    </div>
                                                ))}
                                        </Grid.Col>
                                        <Grid.Col lg={6}>
                                            <Group>
                                                <Text size="xl" weight="bold">
                                                    Get in touch
                                                </Text>
                                            </Group>
                                            <Group align="center">
                                                <Phone size={20} />
                                                <Text>{getcontactPhone}</Text>
                                            </Group>

                                            <Group align="center">
                                                <Mail size={20} />
                                                <Text>{getinfoEmail}</Text>
                                            </Group>
                                            <Group align="center">
                                                <BrandWhatsapp size={20} />
                                                <Text>{getcontactWhatsApp}</Text>
                                            </Group>

                                            <Group>
                                                <Mailbox />
                                                <Text>{getfeedbackEmail}</Text>
                                            </Group>
                                            {getfacebookURL !== "" ? (
                                                <Group align="center">
                                                    <BrandFacebook size={18} />
                                                    <Text size="lg">{getfacebookURL}</Text>
                                                </Group>
                                            ) : null}
                                            {getinstagramURL !== "" ? (
                                                <Group align="center">
                                                    <BrandInstagram size={18} />
                                                    <Text size="lg">
                                                        {<Text>{getinstagramURL}</Text>}
                                                    </Text>
                                                </Group>
                                            ) : null}
                                            {getwebsiteURL !== "" ? (
                                                <Group align="center">
                                                    <BrandLinktree size={18} />
                                                    <Text size="lg">{getwebsiteURL}</Text>
                                                </Group>
                                            ) : null}
                                        </Grid.Col>
                                    </Grid>
                                </Card>
                            </Paper>
                            <Grid justify="flex-end" py="md">
                                <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                                    <Button
                                        fullWidth
                                        leftIcon={<ArrowLeft />}
                                        color="red"
                                        size="md"
                                        onClick={prevStep}
                                    >
                                        Back
                                    </Button>
                                </Grid.Col>

                                <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                                    <Button
                                        fullWidth
                                        rightIcon={<Check />}
                                        size="md"
                                        color="dark"
                                        onClick={handleSubmit}
                                    >
                                        Confirm
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

export default AddService;
