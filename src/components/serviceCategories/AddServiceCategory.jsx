import { useEffect, useState } from "react";
import {
    Button,
    Center,
    Grid,
    LoadingOverlay,
    Paper,
    Text,
    Textarea,
    TextInput,
    Title,
} from "@mantine/core";
import { X } from "tabler-icons-react";
import { useForm } from "@mantine/form";
// import axios from "axios";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import CancelScreenModal from "../modals/CancelScreenModal";
import { editCallWithHeaders, getCallSpecificWithHeaders, postCallWithHeaders } from "../../helpers/apiCallHelpers";
import { failureNotification, successNotification } from "../../helpers/notificationHelper";
import { IconEdit, IconPlus } from "@tabler/icons-react";

const AddServiceCategory = () => {
    const [opened, setOpened] = useState(false);
    const location = useLocation();
    const params = useParams();
    const [loading, setLoading] = useState(location.pathname.includes("edit") ? true : false);
    let navigate = useNavigate();

    const addCategory = async (values) => {
        setLoading(true)
        try {
            let res = await postCallWithHeaders("admin/addServicesCategory", values)
            if (!res.error) {
                successNotification(res.msg)
                navigate("/adminDashboard/viewServiceCategories")
            }
            else {
                failureNotification(res.msg)
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    const editCategory = async (values) => {
        setLoading(true)
        try {
            let res = await editCallWithHeaders(`admin/updateServiceCategory`, params.id, values)
            if (!res.error) {
                successNotification(res.msg)
                navigate("/adminDashboard/viewServiceCategories")
            }
            else {
                failureNotification(res.msg)
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }



    const getUserDetails = async () => {
        setLoading(true)

        const apiResponse = await getCallSpecificWithHeaders("admin/getAServicesCategory", params.id)
        setLoading(false)
        return apiResponse.data

    }
    useEffect(() => {
        try {
            if (location.pathname.includes("edit")) {
                getUserDetails().then(form.setValues)
            }
            else {
                form.reset()
            }
        } catch (error) {
            failureNotification(error)
        }


    }, [location.pathname])
    const form = useForm({

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

    return (
        <Paper
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
            }}
        >

            <CancelScreenModal opened={opened} setOpened={setOpened} path={"/adminDashboard/viewServiceCategories"} />
            <LoadingOverlay
                visible={loading}
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
                        Add Service Category
                    </Title>

                    <Text weight="bold" size="xl" py="md">
                        Category Details
                    </Text>

                    <form
                        style={{ padding: "0px", margin: "auto" }}
                        onSubmit={form.onSubmit((values) => {

                            !location.pathname.includes("edit") ? addCategory(values) : editCategory(values)
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

                        </Grid>
                        <Grid justify="flex-end">
                            <Grid.Col lg={3}>
                                <Button
                                    fullWidth
                                    leftIcon={<X />}
                                    color="red"
                                    onClick={() => setOpened(true)}
                                    size="md"
                                    uppercase
                                >
                                    cancel
                                </Button>
                            </Grid.Col>
                            <Grid.Col lg={3}>
                                <Button
                                    fullWidth
                                    loading={loading}
                                    type="submit"
                                    size="md"
                                    color="dark"
                                    rightIcon={location.pathname.includes("edit") ? <IconEdit /> : <IconPlus />}
                                    uppercase
                                >
                                    {location.pathname.includes("edit") ? "Edit" : "Add"} Category
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
