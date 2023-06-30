
import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
    rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { failureNotification, successNotification } from '../../helpers/notificationHelper';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import { Link } from 'react-router-dom';
const backendURI = import.meta.env.REACT_APP_BACKEND_URI || "http://localhost:8080/api/v1";
const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: rem(900),
        backgroundSize: 'cover',
        backgroundImage:
            'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
    },

    form: {
        borderRight: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
            }`,
        minHeight: rem(900),
        maxWidth: rem(450),
        paddingTop: rem(80),

        [theme.fn.smallerThan('sm')]: {
            maxWidth: '100%',
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
}));



export default function LoginSignUp() {
    const [loadingState, setLoading] = useState(false)
    const navigate = useNavigate();

    // const getTest = async () => {
    //     let res = await axios.get("http://localhost:8080/api/v1/urbanservices");
    //     console.log("res", res)
    // }
    const loginFunction = async (credentials) => {
        setLoading(true);
        console.log("User creds: ", credentials);
        try {
            let apiResponse = await axios({
                method: "post",
                url: `${backendURI}/users/login`,
                data: credentials
            })
            console.log(apiResponse)
            if (!apiResponse.data.error) {
                if (apiResponse.data.data.userType === "admin") {
                    successNotification(apiResponse.data.msg)
                    localStorage.setItem("adminData", JSON.stringify(apiResponse.data.data))
                    localStorage.setItem("adminDataToken", apiResponse.data.token);
                    navigate("/")

                }
                else {
                    failureNotification(`${credentials.email} is not an admin`)
                }

            }
            else {
                failureNotification(apiResponse.data.msg)
            }
            // if (apiResponse) { }
        } catch (err) {
            console.log(err)
            failureNotification(err.message);
        }
        finally {
            setLoading(false);
        }
    }
    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },

        validate: {
            email: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
                    ? null
                    : "Invalid email",
            password: (value) =>
                /^(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
                    value
                )
                    ? null
                    : "Password must contain 1 upper case letter, 1 special & 1 digit",
        },

    });

    const { classes } = useStyles();
    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
                    Welcome back to Urban Services!
                </Title>

                <form onSubmit={form.onSubmit((values) => { loginFunction(values) })}>
                    <TextInput label="Email address" placeholder="hello@gmail.com" size="md" name='email'  {...form.getInputProps('email')} />
                    <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" name='password'  {...form.getInputProps('password')} />
                    <Checkbox label="Keep me logged in" mt="xl" size="md" />
                    <Button type='submit' fullWidth mt="xl" size="md"
                        loading={loadingState}
                    // component={Link} 
                    // to={"/"}
                    >
                        Login
                    </Button>
                </form>

                <Text ta="center" mt="md">
                    Don&apos;t have an account?{' '}
                    <Anchor href="#" weight={700} onClick={(event) => event.preventDefault()}>
                        Register
                    </Anchor>
                </Text>
            </Paper>
        </div >
    );
}