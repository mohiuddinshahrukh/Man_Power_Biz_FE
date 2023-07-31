/* eslint-disable react/prop-types */
import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Checkbox } from "tabler-icons-react";

import { useForm } from "@mantine/form";
import { postCallWithoutHeaders } from "../../helpers/apiCallHelpers";
import {
  failureNotification,
  successNotification,
} from "../../helpers/notificationHelper";
import { UserProfileContext } from "../../contexts/userProfileContext";
import { useContext } from "react";
import { useEffect } from "react";
const CustomerLogin = ({ setOpened, setCustomerSwitch, customerSwitch }) => {
  const { loggedInUserDetails, setLoggedInUserDetails } =
    useContext(UserProfileContext);
  const loginForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) =>
        /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(
          value.trim()
        )
          ? null
          : "Invalid Email",
      password: (value) =>
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/.test(value.trim())
          ? null
          : "Password Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character",
    },
  });
  const handleLogin = async (values) => {
    console.log(values);
    const apiResponse = await postCallWithoutHeaders(
      `customer/login-customer`,
      values
    );
    if (apiResponse.error) {
      failureNotification(`Login failed due to : ${apiResponse.msg}`);
    } else {
      if (apiResponse.data.userType != "customer") {
        failureNotification(`This login is only for customers`);
      } else {
        successNotification(`Login successful!`);
        localStorage.setItem(
          "customerDetails",
          JSON.stringify(apiResponse.data)
        );
        setOpened(false);
        setLoggedInUserDetails(apiResponse.data);
      }
    }
    console.log("Login api response: ", apiResponse);
  };
  useEffect(() => {
    loginForm.reset();
  }, [customerSwitch]);
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor
          size="sm"
          component="button"
          onClick={() => {
            setCustomerSwitch(!customerSwitch);
          }}
        >
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={loginForm.onSubmit((values) => {
            handleLogin(values);
          })}
        >
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            {...loginForm.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...loginForm.getInputProps("password")}
          />
          <Group position="right" mt="lg">
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button type="submit" fullWidth mt="xl">
            Sign In
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CustomerLogin;
