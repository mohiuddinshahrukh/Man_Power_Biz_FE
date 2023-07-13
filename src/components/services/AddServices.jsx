import {
    ArrowLeft,
    ArrowRight,
    BrandFacebook,
    BrandInstagram,
    BrandWhatsapp,
    Check,
    ChevronDown,
    Globe,
    Mail,
    Mailbox,
    Map2,
    MapPin,
    Phone,
} from "tabler-icons-react";
import { useForm } from "@mantine/form";
import {
    TextInput,
    Group,
    Title,
    Text,
    Button,
    Textarea,
    Grid,
    Stepper,
    Paper,
    Center,
    Select,
    Card,
    LoadingOverlay,
    Input,
    Image,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { X } from "tabler-icons-react";
import { Carousel } from "@mantine/carousel";
import CancelScreenModal from "../modals/CancelScreenModal";
import { getCallWithHeaders, postCallWithHeaders } from "../../helpers/apiCallHelpers";
import UploadFiles from "../uploadFiles/UploadFiles";
import { IMAGE_MIME_TYPE, MIME_TYPES } from "@mantine/dropzone";
import { failureNotification, successNotification } from "../../helpers/notificationHelper";
import { uploadFile } from "../../helpers/uploadFileHelper";
import ViewUploadedFileModal from "../modals/ViewUploadedFileModal";
import { useNavigate } from "react-router-dom";



const AddService = () => {
    const navigate = useNavigate()
    // const [loading, setLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(location.pathname.includes("edit") ? true : false);
    const [imageUpload, setImageUpload] = useState([])
    const [videoLoading, setVideoLoading] = useState(location.pathname.includes("edit") ? true : false);
    const [videoUpload, setVideoUpload] = useState([])


    // Images & Videos Modal states
    const [mediaModal, setMediaModal] = useState(false);
    const [dataType, setDataType] = useState("");
    const [modalData, setModalData] = useState({})

    const [generalDetails, setGeneralDetails] = useState({})
    const [contactInformation, setContactInformation] = useState({})

    const [serviceCategories, setServiceCategories] = useState([]);
    const getAllCategories = async () => {
        const apiResponse = await getCallWithHeaders(`admin/getAllServicesCategories`)
        console.log("apiResponse: ", apiResponse)
        apiResponse.forEach(element => {
            element.value = element._id
            element.label = element.categoryTitle
        });
        setLoading(false)
        return apiResponse
    }
    useEffect(() => {
        try {
            getAllCategories().then(setServiceCategories)
        } catch (error) {
            console.log(error)
        }
    }, [])
    const [opened, setOpened] = useState(false)
    const [active, setActive] = useState(0);
    const nextStep = () =>
        setActive((current) => (current < 4 ? current + 1 : current));
    const prevStep = () =>
        setActive((current) => (current > 0 ? current - 1 : current));


    const addServiceStep1Form = useForm({
        validateInputOnChange: true,
        initialValues: {
            serviceTitle: "",
            serviceCategory: "",
            serviceCity: "",
            serviceZipCode: "",
            serviceDescription: "",
            // serviceAddress: ""
        },
        validate: {
            serviceTitle: (value) => (/^[\w\s.,!?'-]{1,100}$/.test(value.trim()) ? null : "Invalid title"),
            serviceCategory: (value) => (/^\S+$/.test(value.trim()) ? null : "Select a category"),
            serviceCity: (value) => (/^[A-Za-z\s.-]{2,100}$/.test(value.trim()) ? null : "Select a city"),
            serviceZipCode: (value) => (/^700\d{2}$/.test(value.trim()) ? null : "Select a pin"),
            serviceDescription: (value) => (/^[\s\S]{1,500}$/.test(value.trim()) ? null : "Description can't exceed 500 characters"),
            // serviceAddress: (value) => (/^[\w\s.,#-]{1,100}$/.test(value.trim()) ? null : "Address can only contain alphabets and #"),

        }
    })

    const addServiceStep3Form = useForm({
        validateInputOnChange: true,
        initialValues: {
            serviceContactPhone: "",
            serviceWhatsAppPhone: "",
            serviceInfoEmail: "",
            serviceFeedbackEmail: "",
            serviceWebsiteLink: "",
            serviceFacebookLink: "",
            serviceInstagramLink: "",

        },
        validate: {
            serviceInfoEmail: (value) =>
                /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(value.trim())
                    ? // /^\S+@[a-zA-Z]+\.[a-zA-Z]+$/.test(value.trim())
                    null
                    : "Invalid Email",
            serviceFeedbackEmail: (value) =>
                /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(value.trim())
                    ? // /^\S+@[a-zA-Z]+\.[a-zA-Z]+$/.test(value.trim())
                    null
                    : "Invalid Email",
            serviceContactPhone: (value) =>
                /^[1-9]\d{9}$/.test(value)
                    ? null
                    : "10 digit Phone Number",
            serviceWhatsAppPhone: (value) =>
                /^[1-9]\d{9}$/.test(value)
                    ? null
                    : "10 digit WhatsApp Number",
            serviceWebsiteLink: (value) => value.length == 0 ? null : /^(https?:\/\/)?(www\.)?[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*\.[A-Za-z]{2,}(?::\d{2,5})?(?:\/[^\s]*)?$/.test(value.trim()) ? null : "Invalid Website link",
            serviceFacebookLink: (value) => value.length == 0 ? null : /^(https?:\/\/)?(www\.)?[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*\.[A-Za-z]{2,}(?::\d{2,5})?(?:\/[^\s]*)?$/.test(value.trim()) ? null : "Invalid Facebook link",
            serviceInstagramLink: (value) => value.length == 0 ? null : /^(https?:\/\/)?(www\.)?[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*\.[A-Za-z]{2,}(?::\d{2,5})?(?:\/[^\s]*)?$/.test(value.trim()) ? null : "Invalid Instagram link",
        }
    })

    const addServiceStep1Function = (values) => {
        setGeneralDetails(values);
        nextStep()
    }

    const addServiceStep3Function = (values) => {
        setContactInformation(values);
        nextStep()
    }

    const addServiceFunction = async () => {
        setLoading(true)
        let values = { ...generalDetails, ...contactInformation };
        console.log(values);
        try {
            let imageUploadResult = [];
            if (imageUpload.length > 0) {
                imageUploadResult = await uploadFile(imageUpload, setImageLoading);
                if (imageUploadResult.length === 0) {
                    failureNotification("Failed to upload images");
                    setLoading(false);
                    return;
                } else {
                    successNotification("Images uploaded successfully");
                }
            }

            let videoUploadResult = [];
            if (videoUpload.length > 0) {
                videoUploadResult = await uploadFile(videoUpload, setVideoLoading);
                if (videoUploadResult.length === 0) {
                    failureNotification("Failed to upload videos");
                    setLoading(false);
                    return;
                } else {
                    successNotification("Videos uploaded successfully");
                }
            }

            let res;
            if (videoUpload.length > 0) {
                // Only evaluate the condition if videos are uploaded
                if (imageUploadResult.length > 0 && videoUploadResult.length > 0) {
                    values.serviceImages = imageUploadResult;
                    values.serviceVideos = videoUploadResult;
                    res = await postCallWithHeaders("admin/addService", values);
                    console.log("This is res of the post call with headers", res);
                } else {
                    console.log("here cos both false");
                }
            } else {
                // Upload images or other files when no videos are selected
                if (imageUploadResult.length > 0) {
                    values.serviceImages = imageUploadResult;
                    res = await postCallWithHeaders("admin/addService", values);
                    console.log("This is res of the post call with headers", res);
                }
            }

            if (
                (imageUploadResult.length > 0 && videoUploadResult.length > 0 && !res.error) ||
                (imageUploadResult.length > 0 && videoUpload.length === 0 && !res.error)
            ) {
                successNotification(res.msg);
                navigate("/adminDashboard/viewServices");
            } else if (
                (imageUploadResult.length > 0 && videoUploadResult.length > 0 && res.error) ||
                (imageUploadResult.length > 0 && videoUpload.length === 0 && res.error)
            ) {
                failureNotification(res.msg);
            } else {
                console.log("here cos all 3 failed");
            }
        } catch (error) {
            failureNotification(`${error}`);
        }
        finally {

            setLoading(false)
        }
        setLoading(false)
    };



    return (
        <Paper
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
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
                        Add Service
                    </Title>

                    <CancelScreenModal opened={opened} setOpened={setOpened} path={"/adminDashboard/viewServices"}/>
                    <ViewUploadedFileModal opened={mediaModal} data={modalData} setOpened={setMediaModal} dataType={dataType} />
                    <Stepper
                        color="grape"
                        active={active}
                        onStepClick={setActive}
                        breakpoint="sm"
                        pt="xl"
                    >
                        <Stepper.Step
                            label="Service Details"
                            description="Genral Details"
                            allowStepSelect={active > 0}
                        >
                            <Text weight="bold" size="xl" py="md">
                                General Details
                            </Text>

                            <form
                                onSubmit={addServiceStep1Form.onSubmit((values) => { addServiceStep1Function(values) })}
                                style={{ padding: "0px", margin: "auto" }}
                            >
                                <Grid grow>
                                    <Grid.Col lg={6}>
                                        <Select
                                            searchable
                                            required
                                            size="md"
                                            label="Category"
                                            placeholder="Select Service Category"
                                            // limit={Infinity}
                                            nothingFound="No One Found"
                                            data={serviceCategories}
                                            {...addServiceStep1Form.getInputProps("serviceCategory")}
                                        />

                                    </Grid.Col>
                                    <Grid.Col lg={6}>
                                        <TextInput
                                            required
                                            label="Title"
                                            placeholder="Enter Service Title"
                                            maxLength={100}
                                            // mt="sm"
                                            size="md"
                                            {...addServiceStep1Form.getInputProps("serviceTitle")}
                                        />
                                    </Grid.Col>


                                    <Grid.Col lg={6}>

                                        <Select
                                            searchable
                                            required
                                            size="md"
                                            label="City"
                                            placeholder="Select Service City"
                                            data={[
                                                {
                                                    value: "kolkata",
                                                    label: "Kolkata",
                                                },

                                            ]}
                                            rightSection={<ChevronDown size={14} />}
                                            rightSectionWidth={40}
                                            {...addServiceStep1Form.getInputProps("serviceCity")}
                                        />
                                    </Grid.Col>
                                    <Grid.Col lg={6}>
                                        <Select
                                            searchable
                                            required
                                            size="md"
                                            label="ZIP"
                                            placeholder="Select ZIP"
                                            // value={venueCity}
                                            // onChange={(e) => setVenueCity(e)}
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
                                            {...addServiceStep1Form.getInputProps("serviceZipCode")}
                                        />
                                    </Grid.Col>
                                    <Grid.Col lg={12}>
                                        <Textarea
                                            required
                                            label="Description"
                                            maxLength={1500}
                                            size="md"
                                            placeholder="Enter Service Description"
                                            minRows={3}
                                            {...addServiceStep1Form.getInputProps("serviceDescription")}
                                        />
                                    </Grid.Col>
                                    {/* <Grid.Col lg={12}>
                                        <Textarea
                                            required
                                            label="Address "
                                            maxLength={100}
                                            placeholder="Enter Service Address"
                                            // mt="sm"
                                            size="md"
                                            {...addServiceStep1Form.getInputProps("serviceAddress")}
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
                                            uppercase
                                        >
                                            cancel
                                        </Button>
                                    </Grid.Col>
                                    <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                                        <Button
                                            fullWidth
                                            rightIcon={<ArrowRight />}
                                            type="submit"
                                            size="md"
                                            color="dark"
                                            uppercase
                                        >
                                            next step
                                        </Button>
                                    </Grid.Col>
                                </Grid>
                            </form>
                        </Stepper.Step>

                        <Stepper.Step
                            label="Service Media"
                            description="Images & Videos"
                            allowStepSelect={active > 1}
                        >
                            <Text weight="bold" size="xl" py="md">
                                Describe Service With Images
                            </Text>

                            <Input.Wrapper label={"Upload Images"} >
                                <UploadFiles
                                    multiple={true}
                                    loading={imageLoading}
                                    fileUpload={imageUpload}
                                    setFileUpload={setImageUpload}
                                    mimeType={IMAGE_MIME_TYPE}
                                />
                            </Input.Wrapper>

                            <Input.Wrapper label={"Upload Videos"}>
                                <UploadFiles multiple={true}
                                    loading={videoLoading}
                                    fileUpload={videoUpload}
                                    setFileUpload={setVideoUpload}
                                    mimeType={MIME_TYPES.mp4} />
                            </Input.Wrapper>


                            <Grid justify="flex-end" py="md">
                                <Grid.Col xs={6} sm={6} md={6} lg={3} xl={3}>
                                    <Button
                                        fullWidth
                                        leftIcon={<ArrowLeft />}
                                        color="red"
                                        size="md"
                                        onClick={prevStep}


                                    // disabled={disabled}
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
                                        onClick={() => { nextStep() }}
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
                                onSubmit={addServiceStep3Form.onSubmit((values) => {
                                    console.log(values);
                                    addServiceStep3Function(values)
                                })}
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
                                            {...addServiceStep3Form.getInputProps("serviceInfoEmail")}
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

                                                    >
                                                        Same As Email?
                                                    </span>
                                                    )
                                                </>
                                            }
                                            placeholder="Enter Feedback Email"
                                            // mt="sm"
                                            size="md"
                                            {...addServiceStep3Form.getInputProps("serviceFeedbackEmail")}
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
                                            {...addServiceStep3Form.getInputProps("serviceContactPhone")}
                                        />
                                    </Grid.Col>
                                    <Grid.Col lg={6}>
                                        <TextInput
                                            type="number"
                                            required
                                            label="WhatAapp Number"
                                            placeholder="Enter WhatsApp Number"
                                            // mt="sm"
                                            size="md"
                                            {...addServiceStep3Form.getInputProps("serviceWhatsAppPhone")}
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
                                            {...addServiceStep3Form.getInputProps("serviceWebsiteLink")}
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
                                            {...addServiceStep3Form.getInputProps("serviceFacebookLink")}
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
                                            {...addServiceStep3Form.getInputProps("serviceInstagramLink")}
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
                                            uppercase
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
                                            uppercase
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
                                            {imageUpload?.map((image, index) => {

                                                return <Carousel.Slide key={index}><Image onClick={() => {
                                                    setMediaModal(true)
                                                    setModalData(image)
                                                    setDataType("image")
                                                }} fit="contain" src={URL.createObjectURL(image)} /></Carousel.Slide>
                                            })}
                                        </Carousel>
                                    </Card.Section>
                                    <Grid>
                                        <Grid.Col lg={6}>
                                            <Group>
                                                <Text size="xl" weight="bold">
                                                    Service Details
                                                </Text>
                                            </Group>
                                            <Text>
                                                <b>Title:</b> {generalDetails.serviceTitle}
                                            </Text>
                                            <Text >
                                                <b>Category:</b> {generalDetails.serviceCategory}
                                            </Text>
                                            <Text >
                                                <b>City:</b> {generalDetails.serviceCity}
                                            </Text>
                                            <Text >
                                                <b>Zip Code:</b> {generalDetails.serviceZipCode}
                                            </Text>
                                            <Text >
                                                <b>Description:</b> {generalDetails.serviceDescription}
                                            </Text>
                                            <Text
                                                align="justify"
                                                style={{
                                                    wordBreak: "break-word",
                                                    whiteSpace: "normal",
                                                }}
                                            >

                                            </Text>
                                        </Grid.Col>

                                        <Grid.Col lg={6}>
                                            <Group>
                                                <Text size="xl" weight="bold">
                                                    Get in touch
                                                </Text>
                                            </Group>
                                            {contactInformation.serviceContactPhone !== "" && <Group align="center">
                                                <Phone size={20} />
                                                {contactInformation.serviceContactPhone}
                                            </Group>}

                                            {contactInformation.serviceInfoEmail !== "" && <Group align="center">
                                                <Mail size={20} />
                                                {contactInformation.serviceInfoEmail}

                                            </Group>}
                                            {contactInformation.serviceWhatsAppPhone !== "" && <Group align="center">
                                                <BrandWhatsapp size={20} />
                                                {contactInformation.serviceWhatsAppPhone}

                                            </Group>}

                                            <Group>
                                                <Mail size={20} />
                                                {contactInformation.serviceFeedbackEmail}
                                            </Group>
                                            {contactInformation.serviceWebsiteLink !== "" && <Group>
                                                <Globe size={20} />
                                                {contactInformation.serviceWebsiteLink}
                                            </Group>}
                                            {contactInformation.serviceFacebookLink !== "" && <Group>
                                                <BrandFacebook size={20} />
                                                {contactInformation.serviceFacebookLink}
                                            </Group>}
                                            {contactInformation.serviceInstagramLink !== "" && <Group>
                                                <BrandInstagram size={20} />
                                                {contactInformation.serviceInstagramLink}
                                            </Group>}

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
                                        color="green"
                                        uppercase
                                        onClick={() => {
                                            console.log("Do the api call final one to reg service");
                                            addServiceFunction()
                                        }}
                                    >
                                        Confirm
                                    </Button>
                                </Grid.Col>
                            </Grid>
                        </Stepper.Completed>
                    </Stepper>
                </Paper>
            </Center >
        </Paper >
    );
};

export default AddService;
