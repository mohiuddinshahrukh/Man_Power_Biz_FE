//IMPORTS
import { useState } from "react";
import {
    Button,
    Center,
    Grid,
    Input,
    LoadingOverlay,
    Modal,
    Paper,
    Text,
    Textarea,
    TextInput,
    Title,
} from "@mantine/core";
import { Plus, Trash, TrashOff, X } from "tabler-icons-react";
import { useForm } from "@mantine/form";
// import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
// import UploadCoverImage from "../UploadCoverImage/UploadCoverImage";

// GLOBAL VARIABLES
// ADD VENDOR CATEGORY
const AddServiceCategory = () => {
    // setCurrentLocation("Add Vendor Category");
    // HOOKS
    // const [files, setFiles] = useState([]);

    const [getVisible, setVisible] = useState(false);

    const [opened, setOpened] = useState(false);

    const [images, setImages] = useState([]);
    const [percentages, setPercentages] = useState([]);
    // const [refresh, setRefresh] = useState(false);
    const [urls, setUrls] = useState();
    const [disabled, setDisabled] = useState(false);
    const [disabled2, setDisabled2] = useState(true);
    const [disabled3, setDisabled3] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [radio, setRadio] = useState("Per Event");
    const [error, setError] = useState("");

    // LOCAL VARIABLES
    let navigate = useNavigate();
    // FORM
    const form = useForm({
        validateInputOnChange: ["categoryTitle"],
        initialValues: {
            categoryTitle: "",
            image: "",
            categoryDescription: "",
        },

        validate: {
            categoryTitle: (value) =>
                value.trim().length > 1
                    ? null
                    : "Name must be at least 2 characters long",

            categoryDescription: (value) =>
                value.trim().length > 20
                    ? null
                    : "Alphabetic Name with 20 or more characters",
        },
    });
    // FUNCTIONS

    const handleSubmit = async (event) => {
        setVisible(true);
        setLoading(true);
        if (images.length <= 0) {
            setError("Category Cover Image Is Required");
            setDisabled(false);
            setDisabled3(true);
            setVisible(false);
            setLoading(false);
        } else {
            var { categoryTitle, image, categoryDescription } = event;
            const body = {
                categoryTitle,
                image: urls,
                categoryDescription,
            };
            const headers = {
                "Content-Type": "application/json",
            };
            try {
                console.log("Here in posting form data add dish: ", body);
                const response = await axios({
                    method: "post",
                    url: "https://a-wep.herokuapp.com/superAdmin/addVendorCategory",
                    data: body,
                    headers: headers,
                });
                // setLoading(false);

                console.log(response.data);
                if (response.data.status === "error") {
                    // setErrorMessages(response.data.error);
                    showNotification({
                        color: "red",
                        title: "ERROR",
                        message: `Category could not be added: ${response.data.error.categoryTitle}`,
                    });
                    setVisible(false);
                } else {
                    setVisible(false);
                    navigate("/vendorCategories");
                    showNotification({
                        color: "green",
                        title: `ADD SUCCESSFUL`,
                        message: `Category Has Been Added Successfully`,
                    });
                }
            } catch (err) {
                console.log(err);
            }
        }
    };
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
                            onClick={() => {
                                setOpened(false);
                                navigate("/vendorCategories");
                            }}
                        >
                            Yes, Discard Changes
                        </Button>
                    </Grid.Col>
                </Grid>
            </Modal>
            <LoadingOverlay
                visible={getVisible}
                loaderProps={{ size: "xl", color: "pink", variant: "bars" }}
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
                        Register Service Category
                    </Title>

                    <Text weight="bold" size="xl" py="md">
                        Category Details
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
                                <TextInput
                                    required
                                    label="Category Title"
                                    placeholder="Category Title"
                                    // mt="sm"
                                    size="md"
                                    {...form.getInputProps("categoryTitle")}
                                />
                            </Grid.Col>
                            <Grid.Col lg={12}>
                                <Textarea
                                    required
                                    label="Category Description"
                                    maxLength={500}
                                    size="md"
                                    placeholder="Enter Category Description"
                                    minRows={5}
                                    {...form.getInputProps("categoryDescription")}
                                />
                            </Grid.Col>
                            <Grid.Col lg={12} p="md">
                                <Input.Wrapper
                                    required
                                    size="md"
                                    label="Catergory Image"
                                    error={error}
                                >
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
                                        folderName="vendorcategory"
                                    /> */}
                                </Input.Wrapper>
                            </Grid.Col>
                        </Grid>
                        <Grid justify="flex-end">
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
                                    loading={loading}
                                    disabled={disabled3}
                                    rightIcon={<Plus />}
                                    type="submit"
                                    size="md"
                                    color="dark"
                                >
                                    Add Category
                                </Button>
                            </Grid.Col>
                        </Grid>
                    </form>
                </Paper>
            </Center>
        </Paper>
    );
};

export default AddServiceCategory;
