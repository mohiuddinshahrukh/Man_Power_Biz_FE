import {
    ArrowLeft,
    ArrowRight,
    BrandWhatsapp,
    Check,
    ChevronDown,
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
} from "@mantine/core";
import { useEffect, useState } from "react";
import { X } from "tabler-icons-react";
import { Carousel } from "@mantine/carousel";
import CancelScreenModal from "../modals/CancelScreenModal";
import { getCallWithHeaders } from "../../helpers/apiCallHelpers";



const AddService = () => {
    const [generalDetails, setGeneralDetails] = useState({})
    console.log("These are the general details: ", generalDetails)
    const [serviceMedia, setServiceMedia] = useState({})
    const [contactInformation, setContactInformation] = useState({})

    const [serviceCategories, setServiceCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const getAllCategories = async () => {
        const apiResponse = await getCallWithHeaders(`admin/getAllServicesCategories`)
        console.log("apiResponse: ", apiResponse)
        apiResponse.forEach(element => {
            element.value = element._id
            element.label = element.categoryTitle
        });
        return apiResponse
    }
    useEffect(() => {
        try {
            getAllCategories().then(setServiceCategories).then(setLoading(false))
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
            serviceAddress: ""
        },
        validate: {
            serviceTitle: (value) => (/^[\w\s.,!?'-]{1,100}$/.test(value.trim()) ? null : "Invalid title"),
            serviceCategory: (value) => (/^\S+$/.test(value.trim()) ? null : "Select a category"),
            serviceCity: (value) => (/^[A-Za-z\s.-]{2,100}$/.test(value.trim()) ? null : "Select a city"),
            serviceZipCode: (value) => (/^700\d{2}$/.test(value.trim()) ? null : "Select a pin"),
            serviceDescription: (value) => (/^[\s\S]{1,500}$/.test(value.trim()) ? null : "Description can't exceed 500 characters"),
            serviceAddress: (value) => (/^[\w\s.,#-]{1,100}$/.test(value.trim()) ? null : "Address can only contain alphabets and #"),

        }
    })

    const addServiceStep1Function = (values) => {
        setGeneralDetails(values);
    }


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

                    <CancelScreenModal opened={opened} setOpened={setOpened} />
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
                                            label="Category"
                                            placeholder="Select Service Category"
                                            // limit={Infinity}
                                            nothingFound="No One Found"
                                            data={serviceCategories}
                                            {...addServiceStep1Form.getInputProps("serviceCategory")}
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
                                    <Grid.Col lg={12}>
                                        <Textarea
                                            required
                                            label="Address "
                                            maxLength={100}
                                            placeholder="Enter Service Address"
                                            // mt="sm"
                                            size="md"
                                            {...addServiceStep1Form.getInputProps("serviceAddress")}
                                        />
                                    </Grid.Col>

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
                                        type="submit"
                                        size="md"
                                        color="dark"

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
                                onSubmit={(values) => { console.log(values) }

                                }
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

                                        />
                                    </Grid.Col>
                                    <Grid.Col lg={6}>
                                        <TextInput
                                            required
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

                                        </Carousel>
                                    </Card.Section>
                                    <Grid>
                                        <Grid.Col lg={12}>
                                            <Group positon="left">
                                                <Text weight="bold" size="xl">

                                                </Text>
                                            </Group>

                                        </Grid.Col>

                                        <Grid>
                                            <Grid.Col>
                                                <Group postion="apart" align="center">
                                                    <Map2 size={20} />

                                                </Group>
                                                <Group align="center">
                                                    <MapPin size={20} />

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

                                            </Text>
                                        </Grid.Col>
                                        <Grid.Col lg={6}>

                                        </Grid.Col>
                                        <Grid.Col lg={6}>
                                            <Group>
                                                <Text size="xl" weight="bold">
                                                    Get in touch
                                                </Text>
                                            </Group>
                                            <Group align="center">
                                                <Phone size={20} />

                                            </Group>

                                            <Group align="center">
                                                <Mail size={20} />

                                            </Group>
                                            <Group align="center">
                                                <BrandWhatsapp size={20} />

                                            </Group>

                                            <Group>
                                                <Mailbox />

                                            </Group>

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
