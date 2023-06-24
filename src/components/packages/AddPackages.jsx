// IMPORTS
import {
    Button,
    Center,
    Group,
    LoadingOverlay,
    Modal,
    NumberInput,
    Select,
    Text,
    Textarea,
    TextInput,
    Title,
    Paper,
    Grid,
    Image,
    Input,
    Avatar,
    Chip,
    Stack,
    HoverCard,
    Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
// import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash, TrashOff, X } from "tabler-icons-react";
// import UploadImages from "../UploadImages/UploadImages";
import { cleanNotifications } from "@mantine/notifications";
// import CustomNotificationFunction from "../CustomNotification/CustomNotification";
// import UploadCoverImage from "../UploadCoverImage/UploadCoverImage";
// import DefaultAvatar from "../../Images/default-placeholder.png";

// HOOKS

// FUNTIONS
// GLOBAL VARIABLES
// LOCAL VARIABLES

// COMPONENT
const AddPackages = () => {
    // setCurrentLocation("Add  Package");
    const [vendorBusiness, setVendorBusiness] = useState("");
    const [getVisible, setVisible] = useState(true);
    const [selectedVendorCategory, setSelectedVendorCategory] = useState("");
    console.log("serviceCategoryTitle", selectedVendorCategory);
    const [selectedVendorServices, setSelectedVendorServices] = useState([]);
    console.log("selectedVendorServices", selectedVendorServices);
    const [totalPrice, setTotalPrice] = useState(0);
    const [hideFields, setHideFields] = useState(false);
    console.log("hideFields", hideFields);
    const [showServices, setShowServices] = useState(false);
    console.log("totalPrice", totalPrice);
    const [numberOfBookings, setNumberOfBookings] = useState(0);

    const [error2, setError2] = useState("");
    // const [error, setError] = useState("");
    // const [disabled, setDisabled] = useState(false);
    const [disabled1, setDisabled1] = useState(false);
    // const [images, setImages] = useState([]);
    const [hidden, setHidden] = useState(true);

    // const [percentages, setPercentages] = useState([]);
    // const [urls, setUrls] = useState([]); // for useEffect only.... else not needed
    const [imageURLS, setImageURLS] = useState([]);
    const [indexOfCoverImageURL, setIndexOfCoverImageURL] = useState();

    // const [disabled2, setDisabled2] = useState(false);

    const [videos, setVideos] = useState([]);
    const [percentages2, setPercentages2] = useState([]);
    const [urls2, setUrls2] = useState([]);

    const [images, setImages] = useState([]);
    const [percentages, setPercentages] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [urls, setUrls] = useState();
    const [disabled, setDisabled] = useState(false);
    const [disabled2, setDisabled2] = useState(true);
    const [disabled3, setDisabled3] = useState(false);
    const [loading, setLoading] = useState(false);
    const [radio, setRadio] = useState("Per Event");
    const [error, setError] = useState("");

    const [opened, setOpened] = useState(false);

    const handleSubmit = async (event) => {
        console.log("Handle Submit has been triggered");

        // const imageObject = images.map((image) => {
        //   return {
        //     name: image.name,
        //     size: image.size,
        //   };
        // });
        // const videoObjects = videos.map((video) => {
        //   return {
        //     name: video.name,
        //     size: video.size,
        //   };
        // });

        if (checkedServices.length === 0) {
            setError2("Please select at least one service");
            cleanNotifications();
            CustomNotificationFunction({
                color: "yellow",
                title: "Missing Service",
                message: "A Package Must Contain At Least One Service",
            });
            return;
        }
        // else if (images.length <= 0) {
        //   setError("Cover Image Is Required");
        //   setDisabled(false);
        //   setDisabled3(true);
        //   setVisible(false);
        //   setLoading(false);
        //   cleanNotifications();
        //   CustomNotificationFunction({
        //     color: "yellow",
        //     title: "Missing Cover Image",
        //     message: "Please Select A Cover Image To Proceed",
        //   });
        // }
        else {
            const servicesObject = servicesData
                .filter((e) => checkedServices.includes(e._id))
                .map((service) => {
                    return {
                        serviceId: service._id,
                        serviceTitle: service.serviceTitle,
                    };
                });
            console.log("servicesObject", servicesObject);

            var { vendorPackageTitle, price, packageDuration, packageDescription } =
                event;
            const body = {
                vendorBusinessId: vendorBusiness,
                vendorPackageTitle,
                price,
                packageDuration,
                // coverImage: imageURLS[indexOfCoverImageURL],
                coverImage: urls ? urls : "",
                // images: imageURLS,
                // imageObjects: imageObject,
                // videos: urls2,
                // videoObjects: videoObjects,
                packageDescription,
                providedServices: checkedServices,
                noOfBookingsPerDay: numberOfBookings,
                serviceCategories: [...checkedCategories],
            };
            console.log("body", body);
            const headers = {
                "Content-Type": "application/json",
            };

            setVisible(true);
            try {
                console.log("Here in posting form data add Package: ", body);
                const response = await axios({
                    method: "post",
                    url: "https://a-wep.herokuapp.com/superAdmin/addVendorServicePackage",
                    data: body,
                    headers: headers,
                });
                // setLoading(false);

                console.log(response.data);
                if (response.data.status === "error") {
                    console.log(response.data.error);
                    showNotification({
                        color: "red",
                        title: `${response.data.error}`,
                        message: `${response.data.message}`,
                    });
                    setVisible(false);
                } else {
                    showNotification({
                        color: "green",
                        title: `Package Add Successful`,
                        message: `Package Has Been Added Successfully`,
                    });

                    navigate("/viewVendorPackage");
                    console.log("navigating");
                    setVisible(false);
                    console.log("navigated");
                }
            } catch (err) {
                console.log(err);
                setVisible(false);
            }
            setVisible(false);
        }
    };

    let navigate = useNavigate();
    useEffect(() => {
        fetchVendorBusiness();
        fetchVendorServices();
        setVisible(false);
    }, []);
    const [getAllVendorBusiness, setAllVendorBusiness] = useState([]);
    const [getVendorServices, setVendorServices] = useState([]);
    const [packageSuggestedPrice, setPackageSuggestedPrice] = useState(0);
    console.log("packagePrice", packageSuggestedPrice);

    const [categoriesData, setCategoriesData] = useState([]);
    const [checkedCategories, setCheckedCategories] = useState([]);
    console.log("checkedCategories", checkedCategories);
    const [servicesData, setServicesData] = useState([]);
    const [checkedServices, setCheckedServices] = useState([]);
    console.log("checkedServices", checkedServices);
    const data = getAllVendorBusiness?.map((item) => ({
        value: item._id,
        label: item.vendorBusinessTitle,
    }));

    const divert = () => {
        navigate("/addVendorSubService");
    };

    const fetchVendorBusiness = () => {
        let url = "https://a-wep.herokuapp.com/superAdmin/getVendorBusiness";
        axios.get(url).then((res) => {
            console.log(res.data);
            if (res.data.status === "success") {
                // let data = res.data.data.map((service) =>
                //   createVendorsServices(service._id, service.vendorBusinessTitle, )
                // );
                setAllVendorBusiness(res.data.data);
            } else {
                // alert("Error");
            }
        });
    };
    const fetchVendorServices = () => {
        let url =
            "https://a-wep.herokuapp.com/superAdmin/getProvidedVendorServices";
        axios.get(url).then((res) => {
            console.log(res.data);
            if (res.data.status === "success") {
                let data = res.data.data;
                // .map((service) =>
                //   createVendorsServices(service._id, service.vendorBusinessTitle)
                // );
                setVendorServices(res.data.data);
                const selectedCategories = {};
                let categories = data.map((service) => {
                    if (!selectedCategories[service.serviceCategoryTitle]) {
                        selectedCategories[service.serviceCategoryTitle] = {
                            title: service.serviceCategoryTitle,
                            vendorBusinesses: [service.vendorBusinessId._id],
                            _id: service.serviceCategory._id,
                        };
                    } else {
                        selectedCategories[
                            service.serviceCategoryTitle
                        ].vendorBusinesses.push(service.vendorBusinessId._id);
                    }
                });

                categories = Object.values(selectedCategories);

                console.log("@1", categories);
                console.log("@2", data);

                setCategoriesData(categories);
                setServicesData(data);
            } else {
                // alert("Error");
            }
        });
    };

    const checkAvailibiltyOfServices = () => {
        console.log("",);
        if (
            servicesData
                .map((service) => service.vendorBusinessId._id)
                .includes()
        ) {
            setHideFields(false);
            return true;
        } else {
            setHideFields(true);
        }
    };

    // FORM
    const form = useForm({
        validateInputOnChange: [
            "vendorBusinessId",
            "vendorPackageTitle",
            "price",
            "packageDuration",
            "coverImage",
        ],
        initialValues: {
            vendorBusinessId: "",
            vendorPackageTitle: "",
            price: "",
            packageDescription: "",
            packageDuration: "",
            coverImage: "",
        },

        validate: {
            vendorPackageTitle: (value) =>
                value.trim().length > 1 ? null : " Name with 2 or more characters",

            packageDescription: (value) =>
                value.trim().length > 20
                    ? null
                    : "Alphabetic Name with 20 or more characters",
        },
    });
    return (
        <Paper
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
            }}
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
                            onClick={() => {
                                setOpened(false);
                                navigate("/viewVendorPackage");
                            }}
                        >
                            Yes, Cancel
                        </Button>
                    </Grid.Col>
                </Grid>
            </Modal>
            <LoadingOverlay
                visible={getVisible}
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
                        Add Package
                    </Title>

                    <Text weight="bold" size="xl" py="md">
                        Package Details
                    </Text>

                    <form
                        style={{ padding: "0px", margin: "auto" }}
                        onSubmit={form.onSubmit((values) => {
                            handleSubmit(values);
                            console.log(values);
                        })}
                    >
                        <Grid grow>
                            <Grid.Col lg={12}>
                                <Select
                                    {...form.getInputProps("vendorBusinessId")}
                                    required
                                    // limit={Infinity}
                                    searchable
                                    value={vendorBusiness}
                                    onChange={(e) => {
                                        setVendorBusiness(e);

                                        setCheckedCategories([]);
                                        setCheckedServices([]);
                                        checkAvailibiltyOfServices(e);
                                    }}
                                    label="Select Service"
                                    placeholder="Select Service"
                                    size="md"
                                    data={[{
                                        label
                                            :
                                            "Service 1",
                                        value
                                            :
                                            "63aaf4f47dd7aafe3a380e42"
                                    }]}
                                />
                            </Grid.Col>

                            <Grid.Col>
                                {categoriesData.map((globaldata, globalIndex) => {
                                    console.log("globaldata", globaldata);
                                    return (
                                        <Chip.Group
                                            grow
                                            multiple
                                            key={globalIndex}
                                            // my="xl"
                                            value={checkedServices}
                                            onChange={(checkedServices) => {
                                                let filteredServices = servicesData.filter((service) =>
                                                    checkedServices.includes(service._id)
                                                );
                                                console.log("filteredServices", filteredServices);
                                                let packagePrice = filteredServices.reduce(
                                                    (previousVal, currentVal) => {
                                                        return previousVal + currentVal.servicePrice;
                                                    },
                                                    0
                                                );
                                                let serviceCategories = {};
                                                filteredServices.map((service) => {
                                                    serviceCategories[service.serviceCategory?._id] =
                                                        service.serviceCategory?._id;
                                                });
                                                serviceCategories = Object.values(serviceCategories);

                                                // let serviceCategories = new Set(
                                                //   filteredServices.map((service) => service._id)
                                                // );
                                                console.log("@packagePrice", packagePrice);

                                                setCheckedCategories(serviceCategories);
                                                setPackageSuggestedPrice(packagePrice);
                                                setCheckedServices(checkedServices);
                                                form.setFieldValue(
                                                    "price",
                                                    packagePrice * 0.2 + packagePrice
                                                );
                                            }}
                                            color="green"
                                            orientation="horizontal"
                                            label={globaldata?.title}
                                            size="md"
                                        >
                                            {globaldata?.vendorBusinesses.includes(
                                                vendorBusiness
                                            ) && (
                                                    <Stack align="stretch">
                                                        <Text size={16}>{globaldata.title}</Text>
                                                        <Group>
                                                            {servicesData
                                                                ?.filter(
                                                                    (e) =>
                                                                        e.vendorBusinessId?._id === vendorBusiness
                                                                )
                                                                ?.map((localData, localIndex) => {
                                                                    console.log("LCOAL DATA:", localData);
                                                                    if (
                                                                        localData.serviceCategoryTitle ===
                                                                        globaldata.title
                                                                    ) {
                                                                        return (
                                                                            <HoverCard width={200} openDelay={750} key={localIndex}>
                                                                                <HoverCard.Target>
                                                                                    <div
                                                                                        style={{
                                                                                            display: "flex",
                                                                                            alignItems: "center",
                                                                                            backgroundColor: "#F1F3F5",
                                                                                            borderTopRightRadius: 40,
                                                                                            borderBottomRightRadius: 40,
                                                                                            borderTopLeftRadius: 40,
                                                                                            borderBottomLeftRadius: 40,
                                                                                        }}
                                                                                    >
                                                                                        <Chip
                                                                                            p={0}
                                                                                            m={0}
                                                                                            color="grape"
                                                                                            variant="filled"
                                                                                            size="md"
                                                                                            key={localIndex}
                                                                                            value={localData._id}
                                                                                            label={localData.serviceTitle}
                                                                                        >
                                                                                            {localData.serviceTitle}
                                                                                        </Chip>
                                                                                        <Avatar
                                                                                            radius="xl"
                                                                                            p={0}
                                                                                            m={0}
                                                                                            src={localData.coverImage}
                                                                                        />
                                                                                    </div>
                                                                                </HoverCard.Target>
                                                                                <HoverCard.Dropdown>
                                                                                    <Image
                                                                                        height={150}
                                                                                        src={localData.coverImage}
                                                                                    />
                                                                                    <Text align="justify">
                                                                                        {localData.serviceDescription.length >
                                                                                            80
                                                                                            ? localData.serviceDescription.substr(
                                                                                                0,
                                                                                                80
                                                                                            ) + "..."
                                                                                            : localData.serviceDescription}
                                                                                    </Text>
                                                                                </HoverCard.Dropdown>
                                                                            </HoverCard>
                                                                        );
                                                                    } else {
                                                                        return "";
                                                                    }
                                                                })}
                                                        </Group>
                                                        <Divider />
                                                    </Stack>
                                                )}
                                        </Chip.Group>
                                    );
                                })}
                            </Grid.Col>

                            {/* <Grid.Col lg={12}>
                  <Select
                    size="md"
                    required
                    label="Service Category"
                    placeholder="Select Service Category"
                    // limit={Infinity}
                    searchable
                    value={selectedVendorCategory}
                    onChange={setSelectedVendorCategory}
                    nothingFound="None Found"
                    data={CategoryData ? CategoryData : []}
                    //   {...form.getInputProps("vendorServiceId")}
                  />
                </Grid.Col>
                <Grid.Col lg={12}>
                  <Input.Wrapper error={error2} size="lg">
                    <Text weight="bold" size="xl" py="md">
                      Select Services To Include in Package
                    </Text>
                  </Input.Wrapper>
                  <Checkbox.Group
                    value={selectedVendorServices}
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
                      setSelectedVendorServices(e);
                      // setSelectedVenueServiceObject(mapped);
                      setError2("");
                    }}
                    // onChange={setSelectedVendorServices}
                    size="md"
                    pb="xl"
                  >
                    <Grid>
                      {getVendorServices
                        ?.filter(
                          (e) =>
                            e.vendorBusinessId._id === vendorBusiness &&
                            e.serviceCategory._id === selectedVendorCategory
                        )
                        ?.map((row, index) => {
                          return (
                            <Grid.Col lg={12}>
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
                                    <Avatar
                                      src={row.coverImage}
                                      alt="it's me"
                                    />
                                    <div
                                      style={{
                                        paddingLeft: "1rem",
                                      }}
                                    >
                                      <Text>
                                        {row.serviceTitle} ({row.servicePrice})
                                      </Text>
                                      <Text size="xs" color="dimmed">
                                        {row.serviceDescription}
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
                </Grid.Col> */}
                        </Grid>
                        <Grid hidden={hideFields}>
                            <Grid.Col lg={6}>
                                <TextInput
                                    required
                                    // disabled
                                    label="Package Title"
                                    placeholder="Package Title"
                                    // mt="sm"
                                    size="md"
                                    {...form.getInputProps("vendorPackageTitle")}
                                />
                            </Grid.Col>
                            <Grid.Col lg={6}>
                                <NumberInput
                                    min={0}
                                    max={1000000}
                                    required
                                    hideControls
                                    label="Package Price"
                                    placeholder="500"
                                    size="md"
                                    {...form.getInputProps("price")}
                                />
                            </Grid.Col>
                            <Grid.Col lg={6}>
                                <TextInput
                                    required
                                    label="Package Duration"
                                    placeholder="30 Mins"
                                    size="md"
                                    {...form.getInputProps("packageDuration")}
                                />
                            </Grid.Col>
                            <Grid.Col lg={6}>
                                <Select
                                    required
                                    defaultValue={numberOfBookings}
                                    label="Number of Bookings per Day"
                                    placeholder="Select Number of Bookings per Day"
                                    onChange={setNumberOfBookings}
                                    data={[
                                        {
                                            label: "1 Booking",
                                            value: 1,
                                        },
                                        {
                                            label: "2 Bookings",
                                            value: 2,
                                        },
                                        {
                                            label: "3 Bookings",
                                            value: 3,
                                        },
                                        {
                                            label: "4 Bookings",
                                            value: 4,
                                        },
                                    ]}
                                    size="md"
                                />
                            </Grid.Col>

                            <Grid.Col lg={12}>
                                <Textarea
                                    required
                                    label="Package Description"
                                    size="md"
                                    maxLength={500}
                                    placeholder="Enter Package Description"
                                    minRows={5}
                                    {...form.getInputProps("packageDescription")}
                                />
                            </Grid.Col>
                        </Grid>
                        <Grid hidden={hideFields}>
                            <Grid.Col lg={12} p="md">
                                <Input.Wrapper size="md" label="Package Image" error={error}>
                                    {/* <UploadCoverImage
                                        error={error}
                                        setError={setError}
                                        disabled={disabled}
                                        setDisabled={setDisabled}
                                        disabled3={disabled3}
                                        setDisabled3={setDisabled3}
                                        disabled2={disabled2}
                                        setDisabled2={setDisabled2}
                                        images={images}
                                        setImages={setImages}
                                        percentages={percentages}
                                        setPercentages={setPercentages}
                                        urls={urls}
                                        setUrls={setUrls}
                                        folderName="packageImages"
                                    /> */}
                                </Input.Wrapper>
                            </Grid.Col>
                        </Grid>
                        {/* <Text weight="bold" size="xl" py="md">
                  Describe Service With Images
                </Text> */}
                        {/* 
              <UploadImages
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
              /> */}
                        <Grid justify="flex-end" hidden={hideFields}>
                            <Grid.Col lg={3}>
                                <Button
                                    fullWidth
                                    leftIcon={<X />}
                                    color="red"
                                    onClick={() => setOpened(true)}
                                    size="md"
                                >
                                    CANCEL
                                </Button>
                            </Grid.Col>
                            <Grid.Col lg={3}>
                                <Button
                                    fullWidth
                                    rightIcon={<Plus />}
                                    type="submit"
                                    disabled={disabled3}
                                    size="md"
                                    color="dark"
                                >
                                    ADD PACKAGE
                                </Button>
                            </Grid.Col>
                        </Grid>
                    </form>
                    {/* <Grid justify="flex-end" hidden={!hideFields}>
                        <Grid.Col lg={12}>
                            <Text color="red">
                                This  Does Not Have Any Services Register. Please Click On{" "}
                                <b>"ADD SERVICE"</b> Button Below To Add Service
                            </Text>
                        </Grid.Col>
                        <Grid.Col lg={3}>
                            <Button
                                fullWidth
                                leftIcon={<X />}
                                color="red"
                                onClick={() => setOpened(true)}
                                size="md"
                            >
                                CANCEL
                            </Button>
                        </Grid.Col>
                        <Grid.Col lg={3}>
                            <Button
                                fullWidth
                                rightIcon={<Plus />}
                                disabled={disabled3}
                                size="md"
                                color="dark"
                                onClick={divert}
                            >
                                ADD SERVICE
                            </Button>
                        </Grid.Col>
                    </Grid> */}
                </Paper>
            </Center>
        </Paper>
    );
};

export default AddPackages;
