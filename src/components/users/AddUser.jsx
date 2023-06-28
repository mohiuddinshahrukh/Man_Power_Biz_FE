// import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import DefaultAvatar from "../../Images/DefaultAvatar.png";
import {
    Grid,
    Paper,
    Title,
    Button,
    PasswordInput,
    TextInput,

    LoadingOverlay,
    Center,
    Avatar,
    Input,
    Select,
} from "@mantine/core";
import { Modal } from "@mantine/core";

import { useLocation } from "react-router-dom";

import { Progress } from "@mantine/core";
// import storage from "../FB";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import UploadCoverImage from "../UploadCoverImage/UploadCoverImage";

import { ArrowRight, Trash, TrashOff, Upload, X } from "tabler-icons-react";

import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
// import { IconX } from "@tabler/icons";


const AddUser = () => {
    let { state } = useLocation();
    console.log("STATE", state);
    const { UserType } = state ?? "";
    // setCurrentLocation("Add User");
    // HOOKS
    const [errorMessages, setErrorMessages] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [type, setType] = useState(UserType ? UserType : "");
    const [CNIC, setCNIC] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [disabled2, setDisabled2] = useState(true);
    const [disabled3, setDisabled3] = useState(false);

    const [opened, setOpened] = useState(false);
    const [error, setError] = useState("");

    const [images, setImages] = useState([]);
    const [percentages, setPercentages] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [urls, setUrls] = useState("");
    const previews = images?.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return (
            <div key={index}>
                <Avatar

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

    const [visible, setVisible] = useState(false);

    console.log(type);
    let navigate = useNavigate();
    // const handleUpload = (images) => {
    //     setError("");
    //     setPercentages([]);
    //     setDisabled(true);
    //     setDisabled2(true);
    //     if (images.length <= 0) {
    //         alert("Please choose a file first!");
    //     }
    //     var percent = 0;
    //     for (let i = 0; i < images.length; i++) {
    //         const image = images[i];
    //         // alert("IN2");
    //         const storageRef = ref(
    //             storage,
    //             `/defaultAvatar/${image.name}+${Math.random(999999)}`
    //         );
    //         const uploadTask = uploadBytesResumable(storageRef, image);
    //         uploadTask.on(
    //             "state_changed",
    //             (snapshot) => {
    //                 console.log(snapshot);
    //                 percent = Math.round(
    //                     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //                 );
    //             },
    //             (err) => console.log(err),
    //             () => {
    //                 // download url
    //                 let Percentages = percentages;
    //                 Percentages[i] = percent;
    //                 // alert(i);
    //                 console.log(Percentages);
    //                 //   alert(Percentages)
    //                 setPercentages(Percentages);
    //                 getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //                     setUrls(url);
    //                     setRefresh(!refresh);
    //                     setDisabled(false);
    //                     setDisabled2(false);
    //                     setError("");
    //                 });
    //             }
    //         );
    //     }
    //     // alert("OUT");
    // };

    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            name: "",
            email: "",
            password: "",
            cpassword: "",
            phone: "",
            whatsappNumber: "",
            CNIC: "",
            userType: type,
            isEnabled: true,
            terms: true,
        },

        validate: {
            email: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value.trim())
                    ? // /^\S+@[a-zA-Z]+\.[a-zA-Z]+$/.test(value.trim())
                    null
                    : "Invalid Email",
            password: (value) =>
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
                    value
                )
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
            whatsappNumber: (value) =>
                /^(03)(\d{9})$/.test(value)
                    ? null
                    : "11 digits WhatsApp Number must start with 03",
            CNIC: (value) =>
                /^(\d{13})$/.test(value) ? null : "Please Enter 13 Digit CNIC Number",
        },
    });
    // const handleSubmit = async (event) => {
    //     // handleUpload();

    //     setVisible(true);
    //     setLoading(true);
    //     // if (images.length <= 0) {
    //     //   setError("Profile Picture is Required");
    //     //   setDisabled(false);
    //     //   setVisible(false);
    //     //   setLoading(false);
    //     // } else {
    //     console.log("inside body");
    //     var { email, password, name, phone, whatsappNumber, CNIC } = event;
    //     const body = {
    //         email,
    //         password,
    //         name,
    //         phone,
    //         whatsappNumber,
    //         CNIC,
    //         profileImage: urls ? urls : DefaultAvatar,
    //         userType: type,
    //     };

    //     for (let key in body) {
    //         if (typeof body[key] == "string") {
    //             body[key] = body[key].trim();
    //         }
    //     }
    //     console.log(event);
    //     const headers = {
    //         "Content-Type": "application/json",
    //     };
    //     try {
    //         const response = await axios({
    //             method: "post",
    //             url: "https://a-wep.herokuapp.com/superAdmin/addUser",
    //             data: body,
    //             headers: headers,
    //         });
    //         setLoading(false);
    //         console.log(response.data);

    //         if (response.data.status === "error") {
    //             if (response.data.error.email) {
    //                 showNotification({
    //                     title: `ERROR`,
    //                     color: "red",

    //                     icon: <IconX size={18} />,
    //                     message: `${response.data.error.email.toUpperCase()} !! PLEASE ENTER ANOTHER EMAIL`,
    //                 });
    //                 setVisible(false);
    //             } else {
    //                 showNotification({
    //                     title: `ERROR`,
    //                     color: "red",

    //                     icon: <IconX size={18} />,
    //                     message: `${response.data.error.message}`,
    //                 });
    //                 setVisible(false);
    //             }
    //         } else {
    //             showNotification({
    //                 title: `SUCCESS`,
    //                 color: "green",

    //                 message: `${type.toUpperCase()} REGISTERED SUCCESSFULLY!!`,
    //             });
    //             setVisible(false);
    //             navigate("/users");
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const renderErrorMessage = (name) => {
        if (errorMessages[name]) {
            return errorMessages[name];
        }
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
                            Are You Sure Yo Want To Cancel?
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
                        Enter User's Details
                    </Title>
                    <form
                    // onSubmit={form.onSubmit((values) => handleSubmit(values))}
                    >
                        <Grid justify="space-around">
                            <Grid.Col md={12} lg={6} p="md">
                                <Select
                                    label="User Type"
                                    required
                                    size="md"
                                    placeholder="Select User Type"
                                    value={type}
                                    data={[
                                        { value: "customer", label: "Customer" },
                                        { value: "venueOwner", label: "Venue Owner" },
                                        { value: "vendor", label: "Vendor" },
                                        { value: "superAdmin", label: "Super Admin" },
                                    ]}
                                    onChange={(event) => setType(event)}
                                />
                            </Grid.Col>
                            <Grid.Col md={12} lg={6} p="md">
                                <TextInput
                                    error={renderErrorMessage("email")}
                                    size="md"
                                    placeholder="Enter User's Email"
                                    value={email}
                                    required
                                    // disabled={disabled}
                                    label="Email Address"
                                    onChange={(e) => setEmail(e.target.value)}
                                    {...form.getInputProps("email")}
                                />
                            </Grid.Col>
                            <Grid.Col md={12} lg={6} p="md">
                                <TextInput
                                    error={renderErrorMessage("name")}
                                    size="md"
                                    required
                                    label="Full Name"
                                    placeholder="Enter User's Full Name"
                                    value={name}
                                    // disabled={disabled}
                                    onChange={(e) => setName(e.target.value)}
                                    {...form.getInputProps("name")}
                                />
                            </Grid.Col>

                            <Grid.Col md={12} lg={6} p="md">
                                <TextInput
                                    error={renderErrorMessage("CNIC")}
                                    size="md"
                                    required
                                    type="number"
                                    label="CNIC"
                                    min="0"
                                    onScroll={() => { }}
                                    // disabled={disabled}
                                    placeholder="Enter 13 Digit CNIC"
                                    value={phone}
                                    onChange={(e) => setCNIC(e.target.value)}
                                    {...form.getInputProps("CNIC")}
                                />
                            </Grid.Col>
                            <Grid.Col md={12} lg={6} p="md">
                                <TextInput
                                    error={renderErrorMessage("phone")}
                                    size="md"
                                    required
                                    type="number"
                                    label="Contact Number"
                                    placeholder="Enter 11 Digit Phone Number"
                                    // disabled={disabled}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    {...form.getInputProps("phone")}
                                />
                            </Grid.Col>
                            <Grid.Col md={12} lg={6} p="md">
                                <TextInput
                                    error={renderErrorMessage("phone")}
                                    size="md"
                                    required
                                    type="number"
                                    label={
                                        form.getInputProps("phone").value.length === 11 ? (
                                            <>
                                                <span>WhatsApp Number</span> (
                                                <span
                                                    style={{
                                                        color: "gray",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                        form.setFieldValue(
                                                            "whatsappNumber",
                                                            form.getInputProps("phone").value
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
                                    placeholder="Enter 11 Digit WhatsApp Number"
                                    // disabled={disabled}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    {...form.getInputProps("whatsappNumber")}
                                />
                            </Grid.Col>
                            <Grid.Col md={12} lg={6} p="md">
                                <PasswordInput
                                    error={renderErrorMessage("password")}
                                    size="md"
                                    required
                                    placeholder="Enter Password"
                                    label="Password"
                                    // disabled={disabled}
                                    value={password}
                                    onInput={(e) => {
                                        if (e.target.value !== form.values.cpassword) {
                                            form.setFieldError("cpassword", "Passwords Do Not Match");
                                        } else {
                                            form.setFieldError("cpassword", "");
                                        }
                                    }}
                                    onChange={(e) => setPassword(e.target.value)}
                                    {...form.getInputProps("password")}
                                />
                            </Grid.Col>
                            <Grid.Col md={12} lg={6} p="md">
                                <PasswordInput
                                    // error={renderErrorMessage("cpassword")}
                                    size="md"
                                    required
                                    label="Confirm Password"
                                    // disabled={disabled}
                                    placeholder="Re-Enter Password"
                                    value={cpassword}
                                    errorProps={(v) => {
                                        return v !== password;
                                    }}
                                    onChange={(e) => setCPassword(e.target.value)}
                                    {...form.getInputProps("cpassword")}
                                />
                            </Grid.Col>
                        </Grid>
                        <Grid justify="flex-start">
                            <Grid.Col lg={12} p="md">
                                <Input.Wrapper size="md" label="Profile Image" error={error}>
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
                                        folderName="venueService"
                                    /> */}
                                </Input.Wrapper>
                            </Grid.Col>
                        </Grid>
                        <Grid justify="flex-end">
                            <Grid.Col sm={6} xs={6} md={6} lg={3} p="md">
                                <Button
                                    size="md"
                                    fullWidth
                                    variant="filled"
                                    color="red"
                                    disabled={loading}
                                    rightIcon={<X />}
                                    onClick={() => setOpened(true)}
                                >
                                    CANCEL
                                </Button>
                            </Grid.Col>
                            <Grid.Col sm={6} xs={6} md={6} lg={3} p="md">
                                <Button
                                    type="submit"
                                    size="md"
                                    fullWidth
                                    variant="filled"
                                    color="dark"
                                    disabled={disabled}
                                    loading={loading}
                                    rightIcon={<ArrowRight />}
                                >
                                    REGISTER
                                </Button>
                            </Grid.Col>
                        </Grid>
                    </form>
                </Paper>
            </Center>
        </Paper>
    );
};

export default AddUser;
