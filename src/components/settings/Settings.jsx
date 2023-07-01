// import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Grid,
    Paper,
    Title,
    Button,
    PasswordInput,
    TextInput,
    // NativeSelect,
    LoadingOverlay,
    Center,
    Avatar,
    Progress,
    Input,
    // Image,
    Group,
    Accordion,
    Text,
    // Loader,
} from "@mantine/core";
import { Modal } from "@mantine/core";

import { Edit, Key, Trash, TrashOff, X } from "tabler-icons-react";

import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
// import storage from "../FB";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
// import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";

import axios from "axios";

// COMPONNET
const Settings = () => {
    // CURRENT LOCATION
    // setCurrentLocation("Update Profile");
    // NAVIGATE STATE
    let { state } = useLocation();
    const {
        ID,
        NAME,
        EMAIL,
        USERTYPE,
        PROFILEIMAGE,
        PHONE,
        // TOKEN,
        CNIC,
        // ISEMAILVERIFIED,
        // ISPHONEVERIFIED,
    } = state ?? "";
    // HOOKS
    const [errorMessages, setErrorMessages] = useState({});
    const [opened, setOpened] = useState(false);
    // const [id, setID] = useState(ID);
    const [cnic, setCNIC] = useState(CNIC);
    const [type, setType] = useState(USERTYPE);
    const [name, setName] = useState(NAME);
    const [email, setEmail] = useState(EMAIL);
    const [phone, setPhone] = useState(PHONE);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [disabled2, setDisabled2] = useState(false);
    const [percentages, setPercentages] = useState([]);
    // const [refresh2, setRefresh2] = useState(true);
    const [refresh3, setRefresh3] = useState(true);
    const [changed, setChanged] = useState(false);
    const [error, setError] = useState("");
    const [images, setImages] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [visible, setVisible] = useState(false);
    const [changepwdVisible, setChangepwdVisible] = useState(false);
    // const [profileImage, setProfileImage] = useState(PROFILEIMAGE);
    // const [isEnabled, setIsEnabled] = useState(IsEnabled);
    // PASSWORD HOOKS
    // const [getCurrentPassword, setCurrentPassword] = useState("");
    // const [getNewPassword, setNewPassword] = useState("");
    // const [getConfirmPassword, setConfirmPassword] = useState("");
    // const [urls, setUrls] = useState(PROFILEIMAGE);

    const [urls, setUrls] = useState(PROFILEIMAGE);
    const previews = images?.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return (
            <div key={index}>
                <Avatar
                    key={index}
                    src={imageUrl}
                    size={140}
                    radius={120}
                    mx="auto"
                    imageProps={{
                        onLoad: () => URL.revokeObjectURL(imageUrl),
                    }}
                />
                <Progress
                    animate={percentages[index] === 100 ? false : true}
                    value={percentages[index] === 100 ? 100 : 100}
                    label={percentages[index] === 100 && "100% Completed"}
                    size="xl"
                    radius="xl"
                    color={percentages[index] === 100 ? "green" : "gray"}
                />
            </div>
        );
    });

    // NAVIGATE
    let navigate = useNavigate();

    // UPLOAD IMAGES METHOD
    const handleUpload = (images) => {
        setError("");
        setPercentages([]);
        setDisabled(true);
        setDisabled2(true);

        if (images.length <= 0) {
            alert("Please choose a file first!");
        }
        var percent = 0;
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            // alert("IN2");
            const storageRef = ref(
                storage,
                `/users/${image.name}+${Math.random(999999)}`
            );
            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    console.log(snapshot);
                    percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                },
                (err) => console.log(err),
                () => {
                    // download url
                    let Percentages = percentages;
                    Percentages[i] = percent;
                    // alert(i);
                    console.log(Percentages);
                    //   alert(Percentages)
                    setPercentages(Percentages);
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setUrls(url);
                        setRefresh(!refresh);
                        setDisabled(false);
                        setDisabled2(false);
                        setError("");
                    });
                }
            );
        }
        // alert("OUT");
    };

    // FORM
    const form = useForm({

        initialValues: {
            name: name,
            email: email,
            password: "",
            cpassword: "",
            cnic: CNIC,
            profileImage: urls,
            phone: phone,
        },

        validate: {
            password: (value) =>
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
                    value
                ) || value === ""
                    ? null
                    : "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character",
            cpassword: (value, values) =>
                value === values.password ? null : "Passwords do not match",
            name: (value) =>
                value.trim().length > 1 && /^[a-zA-Z\s]*$/.test(value.trim())
                    ? null
                    : "Alphabetic Name with 2 or more characters",
            phone: (value) =>
                /^(03)(\d{9})$/.test(value)
                    ? null
                    : "11 digits Phone Number must start with 03",
            cnic: (value) =>
                /^(\d{13})$/.test(value) ? null : "Please Enter 13 Digit CNIC Number",
        },
    });
    // EDIT PASSWORD FORM
    const form1 = useForm({

        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },

        validate: {
            currentPassword: (value, values) =>
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
                    value
                ) || value === ""
                    ? null
                    : "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character",
            newPassword: (value, values) =>
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
                    value
                ) || value === ""
                    ? values.currentPassword !== value
                        ? null
                        : "The current password and new password cant be the same"
                    : "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character",
            confirmPassword: (value, values) =>
                value === values.newPassword ? null : "Passwords do not match",
        },
    });
    // FORM SUBMIT
    const handleSubmit = async (event) => {
        setVisible(true);
        setLoading(true);
        var { name, phone, cnic } = event;
        // console.log(event);
        if (
            NAME === name &&
            EMAIL === email &&
            PHONE === phone &&
            CNIC === cnic &&
            USERTYPE === type &&
            PROFILEIMAGE === urls
        ) {
            setVisible(false);
            setChanged(false);
            console.log("No Changes");
            showNotification({
                title: `NO CHANGES SEEN`,
                color: "blue",

                message: "NOTHING WAS UPDATED",
            });
            navigate("/users");

            setLoading(false);
            return;
        }

        const body = {
            name,
            phone,
            profileImage: urls,
            CNIC: cnic,
        };
        console.log("BODY INSIDE PATCH: ", body);

        const headers = {
            "Content-Type": "application/json",
        };
        try {
            const response = await axios({
                method: "patch",
                url: `https://a-wep.herokuapp.com/auth/user/updateProfile`,
                data: body,
                headers: headers,
            });

            console.log("RESPONSE OBJECT: ", response);
            setLoading(false);

            if (response.data.status === "error") {
                setVisible(false);
                showNotification({
                    title: `${response.data.error}`,
                    color: "red",
                    message: `${response.data.message}`,
                });
                setVisible(false);
            } else if (response.data.status === "success") {
                showNotification({
                    title: `SUCCESS`,
                    color: "green",
                    message: `DETAILS UPDATED SUCCESSFULLY!!`,
                });
                let responses = response.data.data;
                let localStorageData = {
                    CNIC: responses.CNIC,
                    email: responses.email,
                    id: responses._id,
                    isEmailVerified: responses.isEmailVerified,
                    isPhoneVerified: responses.isPhoneVerified,
                    name: responses.name,
                    phone: responses.phone,
                    profileImage: responses.profileImage,
                };

                localStorage.setItem(
                    "superAdminData",
                    JSON.stringify(localStorageData)
                );
                setVisible(false);
                navigate("/");
            } else {
                showNotification({
                    title: "THIS ERROR SHOULD NOT HAVE OCCURRED",
                    color: "red",
                    message: "DONT KNOW WHAT WENT WRONG!",
                });
                setVisible(false);
            }
        } catch (err) {
            console.log("TRY CATCH ERROR: ", err);
        }
    };

    const renderErrorMessage = (name) => {
        if (errorMessages[name]) {
            return errorMessages[name];
        }
    };

    const updatePasswordMethod = async (values) => {
        setChangepwdVisible(true);
        try {
            let url = "https://a-wep.herokuapp.com/auth/user/updatePassword";
            let response = await axios.patch(url, {
                oldPassword: values.currentPassword,
                newPassword: values.newPassword,
            });
            console.log(response);
            if (response.data.status === "success") {
                showNotification({
                    title: "SUCCESS",
                    color: "green",
                    message: "PASSWORD UPDATED SUCCESSFULLY",
                });
                form1.reset();
                setChangepwdVisible(false);
                setRefresh3(!refresh3);
            } else if (response.data.status === "error") {
                showNotification({
                    title: "INVALID PASSWORD",
                    color: "yellow",
                    message:
                        "PASSWORD COULD NOT BE UPDATED BECAUSE YOU HAVE ENTERED AN INVALID PASSWORD",
                });
                form1.setFieldError(
                    "currentPassword",
                    "The entered password is incorrect"
                );
                setChangepwdVisible(false);
            } else {
                showNotification({
                    title: "ERROR",
                    color: "red",
                    message: "SOME INTERNAL ERROR",
                });
                setChangepwdVisible(false);
            }
        } catch (e) {
            console.error(e);
            setChangepwdVisible(false);
        }
        setChangepwdVisible(false);
    };
    return (
        <Paper
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <Center>
                <Paper
                    style={{
                        width: "80%",
                        height: "100%",
                    }}
                >
                    <LoadingOverlay
                        visible={visible}
                        loaderProps={{ size: "xl", color: "pink", variant: "bars" }}
                        overlayOpacity={0.5}
                        overlayColor="#c5c5c5"
                        zIndex={1}
                    />
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
                            Are you sure you want to cancel?
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
                                    onClick={() => navigate("/users")}
                                >
                                    Yes, Cancel
                                </Button>
                            </Grid.Col>
                        </Grid>
                    </Modal>
                    <Title order={1} p="md" align="center">
                        Settings
                    </Title>
                    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                        <Grid justify="space-around">
                            <Grid.Col lg={6}>
                                <TextInput
                                    error={renderErrorMessage("name")}
                                    size="md"
                                    required
                                    label="Full Name"
                                    placeholder="Enter User's Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onInput={(e) => {
                                        setDisabled(false);
                                        setName(e.target.value);
                                    }}
                                    {...form.getInputProps("name")}
                                />
                            </Grid.Col>
                            <Grid.Col lg={6} p="md">
                                <TextInput
                                    error={renderErrorMessage("email")}
                                    size="md"
                                    placeholder="Enter User's Email"
                                    value={email}
                                    required
                                    disabled={true}
                                    label="Email Address"
                                    onChange={(e) => setEmail(e.target.value)}
                                    onInput={(e) => setDisabled(false)}

                                // {...form.getInputProps("email")}
                                />
                            </Grid.Col>
                            <Grid.Col lg={6} p="md">
                                <TextInput
                                    error={renderErrorMessage("cnic")}
                                    size="md"
                                    required
                                    type="number"
                                    label="CNIC"
                                    min="0"
                                    onScroll={() => { }}
                                    placeholder="Enter 13 Digit CNIC"
                                    value={cnic}
                                    onChange={(e) => setCNIC(e.target.value)}
                                    onInput={(e) => {
                                        setDisabled(false);
                                        setCNIC(e.target.value);
                                    }}
                                    {...form.getInputProps("cnic")}
                                />
                            </Grid.Col>
                            <Grid.Col lg={6} p="md">
                                <TextInput
                                    error={renderErrorMessage("phone")}
                                    size="md"
                                    required
                                    type="number"
                                    label="Contact Number"
                                    placeholder="Enter 11 Digit Phone Number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    onInput={(e) => {
                                        setDisabled(false);
                                        setPhone(e.target.value);
                                    }}
                                    {...form.getInputProps("phone")}
                                />
                            </Grid.Col>
                        </Grid>
                        <Grid justify="flex-start">
                            <Grid.Col lg={12} p="md">
                                <Input.Wrapper size="md" label="Profile Picture" error={error}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            // alignItems: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Dropzone
                                            style={{
                                                height: "180px",
                                                width: "200px",
                                                backgroundColor: "#E0E0E0",
                                            }}
                                            // radius={120}
                                            onDrop={(e) => {
                                                setImages(e);
                                                handleUpload(e);
                                            }}
                                            maxSize={3 * 1024 ** 2}
                                            maxFiles={1}
                                            multiple={false}
                                            disabled={disabled}
                                            accept={[
                                                MIME_TYPES.jpeg,
                                                MIME_TYPES.jpg,
                                                MIME_TYPES.png,
                                                MIME_TYPES.svg,
                                                MIME_TYPES.gif,
                                            ]}
                                        >
                                            {images.length < 1 && (
                                                <Avatar
                                                    // key={index}
                                                    src={urls}
                                                    size={150}
                                                    radius={120}
                                                    mx="auto"
                                                />
                                            )}
                                            {previews}
                                        </Dropzone>
                                        <Button
                                            size="sm"
                                            mt="sm"
                                            compact
                                            style={{
                                                width: "200px",
                                            }}
                                            color="red"
                                            hidden={disabled2}
                                            onClick={() => {
                                                setImages([]);
                                                setUrls(
                                                    "https://firebasestorage.googleapis.com/v0/b/awep-dummy.appspot.com/o/defaultAvatar%2FDefaultAvatarForAllUsersWith%20No%20Profile%20Image.jpg%2B0.4989565837086003?alt=media&token=86eb4791-707e-4409-b6e8-dcc47caa2461"
                                                );
                                                setDisabled(false);
                                                setDisabled2(true);
                                                // setRemove(false);
                                            }}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </Input.Wrapper>
                            </Grid.Col>
                        </Grid>

                        <Grid justify="flex-end">
                            <Grid.Col xs={6} sm={6} md={6} lg={6} xl={3} p="md">
                                <Button
                                    size="md"
                                    fullWidth
                                    variant="filled"
                                    color="red"
                                    disabled={disabled}
                                    rightIcon={<X />}
                                    uppercase
                                    onClick={() => {
                                        setOpened(true);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Grid.Col>
                            <Grid.Col xs={6} sm={6} md={6} lg={6} xl={3} p="md">
                                <Button
                                    type="submit"
                                    size="md"
                                    fullWidth
                                    variant="filled"
                                    color="dark"
                                    disabled={disabled}
                                    loading={loading}
                                    rightIcon={<Edit />}
                                    uppercase
                                >
                                    update profile
                                </Button>
                            </Grid.Col>
                        </Grid>
                    </form>

                    <Grid pt={0} mt={0}>
                        <Grid.Col lg={12} style={{ position: "relative" }}>
                            <LoadingOverlay
                                loaderProps={{ color: "grape", variant: "bars" }}
                                visible={changepwdVisible}
                            />
                            <Accordion variant="contained" radius="xs" color="ffffff">
                                <Accordion.Item value="customization">
                                    <Accordion.Control icon={<Key />}>
                                        <Text> Change Password</Text>
                                        <Text size="sm" color="dimmed" weight={400}>
                                            It's a good idea to use a strong password that you don't
                                            use elsewhere
                                        </Text>
                                    </Accordion.Control>

                                    <Accordion.Panel>
                                        <form
                                            onSubmit={form1.onSubmit((values) =>
                                                updatePasswordMethod(values)
                                            )}
                                        >
                                            <PasswordInput
                                                size="md"
                                                placeholder="Current Password"
                                                label="Current Password"
                                                required
                                                onInput={(event) => {
                                                    if (event.target.value === form1.values.newPassword) {
                                                        form1.setFieldError(
                                                            "newPassword",
                                                            "CURRENT PASSWORD AND NEW PASSWORD CANT BE THE SAME"
                                                        );
                                                    } else {
                                                        form1.setFieldError("newPassword", "");
                                                    }
                                                }}
                                                {...form1.getInputProps("currentPassword")}
                                            />
                                            <PasswordInput
                                                size="md"
                                                placeholder="New Password"
                                                label="New Password"
                                                required
                                                onInput={(event) => {
                                                    if (
                                                        event.target.value !== form1.values.confirmPassword
                                                    ) {
                                                        form1.setFieldError(
                                                            "confirmPassword",
                                                            "New password and confrim password don't match"
                                                        );
                                                    } else {
                                                        form1.setFieldError("confirmPassword", "");
                                                    }
                                                }}
                                                {...form1.getInputProps("newPassword")}
                                            />
                                            <PasswordInput
                                                size="md"
                                                placeholder="Confirm Password"
                                                label="Confirm Password"
                                                required
                                                onInput={(event) => { }}
                                                {...form1.getInputProps("confirmPassword")}
                                            />
                                            <Group position="right">
                                                <Button
                                                    my="md"
                                                    size="md"
                                                    color="dark"
                                                    type="submit"
                                                    uppercase
                                                    disabled={
                                                        form1.values.confirmPassword &&
                                                            form1.values.newPassword &&
                                                            form1.values.currentPassword &&
                                                            form1.values.currentPassword !==
                                                            form1.values.newPassword &&
                                                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
                                                                form1.values.currentPassword
                                                            ) &&
                                                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
                                                                form1.values.newPassword
                                                            ) &&
                                                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
                                                                form1.values.confirmPassword
                                                            ) &&
                                                            form1.values.newPassword ===
                                                            form1.values.confirmPassword
                                                            ? false
                                                            : true
                                                    }
                                                    rightIcon={<Edit />}
                                                >
                                                    Update Password
                                                </Button>
                                            </Group>
                                        </form>
                                    </Accordion.Panel>
                                </Accordion.Item>
                            </Accordion>
                        </Grid.Col>
                    </Grid>
                </Paper>
            </Center>
        </Paper>
    );
};

export default Settings;
