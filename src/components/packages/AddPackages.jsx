import {
    Button,
    Center,
    LoadingOverlay,
    NumberInput,
    Select,
    Text,
    Textarea,
    TextInput,
    Title,
    Paper,
    Grid,
    Input,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { Plus, X } from "tabler-icons-react";
import { getCallWithHeaders, postCallWithHeaders } from "../../helpers/apiCallHelpers";
import { IMAGE_MIME_TYPE, MIME_TYPES } from "@mantine/dropzone";
import UploadFiles from "../uploadFiles/UploadFiles";
import { IconCurrencyRupee } from "@tabler/icons-react";
import { uploadFile } from "../../helpers/uploadFileHelper";
import { failureNotification, successNotification } from "../../helpers/notificationHelper";
import { useNavigate } from "react-router-dom";
import CancelScreenModal from "../modals/CancelScreenModal";


const AddPackages = () => {
    const navigate = useNavigate()
    const [imageLoading, setImageLoading] = useState(location.pathname.includes("edit") ? true : false);
    const [imageUpload, setImageUpload] = useState([])
    const [videoLoading, setVideoLoading] = useState(location.pathname.includes("edit") ? true : false);
    const [videoUpload, setVideoUpload] = useState([])
    const [getServices, setServices] = useState([])
    const [loading, setLoading] = useState(true);

    const getServicesFunction = async () => {
        const apiResponse = await getCallWithHeaders(`admin/getAllServices`)
        console.log("apiResponse: ", apiResponse)
        apiResponse.forEach(element => {
            element.value = element._id
            element.label = element.serviceTitle
        });
        setLoading(false)
        return apiResponse
    }

    const addPackageFunction = async (values) => {
        setLoading(true)

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

    useEffect(() => {
        getServicesFunction().then(setServices)
    }, [])

    const [opened, setOpened] = useState(false);


    // FORM
    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            pacakgeTitle: "",
            packagePrice: 0,
            packageDescription: "",
        },

        validate: {
            pacakgeTitle: (value) =>
                (/^[\w\s.,!?'-]{1,100}$/.test(value?.trim()) ? null : " Invalid title"),

            packageDescription: (value) => (/^[\s\S]{1,500}$/.test(value.trim()) ? null : "Description can't exceed 500 characters"),
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
            <LoadingOverlay
                visible={loading}
                loaderProps={{ size: "xl", color: "pink", variant: "bars" }}
                overlayOpacity={0.5}
                overlayColor="#c5c5c5"
            />
            <CancelScreenModal opened={opened} setOpened={setOpened} path={"/adminDashboard/viewPackages"} />
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

                            console.log(values);
                            addPackageFunction(values)
                        })}
                    >
                        <Grid grow>
                            <Grid.Col lg={12}>
                                <Select
                                    required
                                    searchable
                                    label="Service"
                                    placeholder="Select Service"
                                    size="md"
                                    data={getServices}
                                />
                            </Grid.Col>
                        </Grid>
                        <Grid >
                            <Grid.Col lg={6}>
                                <TextInput
                                    required
                                    label="Title"
                                    placeholder="Package Title"
                                    size="md"
                                    {...form.getInputProps("pacakgeTitle")}
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
                                    {...form.getInputProps("packagePrice")}
                                    rightSection={<IconCurrencyRupee />}
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
                        <Grid >
                            <Grid.Col lg={12} p="md">
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
                            </Grid.Col>
                        </Grid>

                        <Grid justify="flex-end" >
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
                                    size="md"
                                    color="dark"
                                >
                                    ADD PACKAGE
                                </Button>
                            </Grid.Col>
                        </Grid>
                    </form>
                </Paper>
            </Center>
        </Paper>
    );
};

export default AddPackages;
