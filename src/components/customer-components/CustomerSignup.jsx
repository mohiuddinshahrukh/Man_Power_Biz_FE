/* eslint-disable react/prop-types */
import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { postCallWithoutHeaders } from "../../helpers/apiCallHelpers";
import {
  failureNotification,
  successNotification,
} from "../../helpers/notificationHelper";

const CustomerSignup = ({ customerSwitch, setCustomerSwitch }) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const signUpForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      fullName: "",
      contactNumber: "",
      whatsappNumber: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) =>
        /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(
          value.trim()
        )
          ? null
          : "Invalid Email",
      password: (value, values) =>
        !/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/.test(value.trim())
          ? "Password Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character"
          : value == values.confirmPassword
          ? signUpForm.setFieldError("confirmPassword", "Passwords don't match")
          : null,
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
      fullName: (value) =>
        value.trim().length > 1 && /^[a-zA-Z\s]*$/.test(value.trim())
          ? null
          : "Alphabetic Name with 2 or more characters",
      contactNumber: (value) =>
        /^[1-9]\d{9}$/.test(value) ? null : "10 digit Phone Number",
      whatsappNumber: (value) =>
        /^[1-9]\d{9}$/.test(value) ? null : "10 digit WhatsApp Number",
    },
  });

  const handleSignUp = async (values) => {
    const apiResponse = await postCallWithoutHeaders(
      `customer/signup-customer`,
      values
    );
    if (!apiResponse.data.error) {
      successNotification(`Sign up successful`);
      setCustomerSwitch(!customerSwitch);
    } else {
      failureNotification(apiResponse.data.msg);
    }
    console.log(apiResponse);
  };
  useEffect(() => {
    signUpForm.reset();
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
        Welcome to Neha Services!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{" "}
        <Anchor
          size="sm"
          component="button"
          onClick={() => {
            setCustomerSwitch(!customerSwitch);
          }}
        >
          Login
        </Anchor>
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={signUpForm.onSubmit((values) => {
            handleSignUp(values);
          })}
        >
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            {...signUpForm.getInputProps("email")}
          />
          <TextInput
            label="Full Name"
            placeholder="John Doe"
            required
            {...signUpForm.getInputProps("fullName")}
          />
          <TextInput
            label="Contact Number"
            placeholder="1234567891"
            required
            {...signUpForm.getInputProps("contactNumber")}
          />
          <TextInput
            label="WhatsApp Number"
            placeholder="1234567891"
            required
            {...signUpForm.getInputProps("whatsappNumber")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            value={password}
            onInput={(e) => {
              if (e.target.value !== signUpForm.values.confirmPassword) {
                signUpForm.setFieldError(
                  "confirmPassword",
                  "Passwords Do Not Match"
                );
              } else {
                signUpForm.setFieldError("confirmPassword", "");
              }
            }}
            onChange={(e) => setPassword(e.target.value)}
            {...signUpForm.getInputProps("password")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            value={confirmPassword}
            errorProps={(v) => {
              return v !== password;
            }}
            onChange={(e) => setConfirmPassword(e.target.value)}
            {...signUpForm.getInputProps("confirmPassword")}
          />
          <Button type="submit" fullWidth mt="xl">
            Sign Up
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CustomerSignup;
