import {
  Center,
  Grid,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

const CustomerSettings = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const renderErrorMessage = (name) => {
    if (errorMessages[name]) {
      return errorMessages[name];
    }
  };

  const [loading, setLoading] = useState(false);
  const updateCustomerProfile = useForm({
    validateInputOnChange: true,
    initialValues: {},
    validate: {},
  });
  return (
    <Paper
      pos={"relative"}
      style={{
        width: "100%",
        height: "100%",
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
          style={{
            width: "80%",
            height: "100%",
          }}
        >
          <Title order={1} p="md" align="center">
            Edit Profile
          </Title>

          <form
            onSubmit={updateCustomerProfile.onSubmit((values) => {
              console.log("values", values);
            })}
          >
            <Grid justify="space-around">
              <Grid.Col md={12} lg={6} p="md">
                <TextInput
                  readOnly
                  size="md"
                  placeholder="Enter User's Email"
                  required
                  label="Email Address"
                  {...updateCustomerProfile.getInputProps("email")}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6} p="md">
                <TextInput
                  size="md"
                  required
                  label="Full Name"
                  placeholder="Enter User's Full Name"
                  {...updateCustomerProfile.getInputProps("fullName")}
                />
              </Grid.Col>

              <Grid.Col md={12} lg={6} p="md">
                <TextInput
                  size="md"
                  required
                  label="Contact Number"
                  placeholder="Enter 10 Digit Phone Number"
                  // disabled={disabled}
                  {...updateCustomerProfile.getInputProps("contactNumber")}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6} p="md">
                <TextInput
                  size="md"
                  required
                  label={
                    updateCustomerProfile.getInputProps("contactNumber").value
                      ?.length === 11 ? (
                      <>
                        <span>WhatsApp Number</span> (
                        <span
                          style={{
                            color: "gray",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            updateCustomerProfile.setFieldValue(
                              "whatsappNumber",
                              updateCustomerProfile.getInputProps(
                                "contactNumber"
                              ).value
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
                  {...updateCustomerProfile.getInputProps("whatsappNumber")}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6} p="md">
                <PasswordInput
                  error={renderErrorMessage("password")}
                  size="md"
                  placeholder="Enter Password"
                  label="Password"
                  // disabled={disabled}
                  value={password}
                  onInput={(e) => {
                    if (
                      e.target.value !== updateCustomerProfile.values.cpassword
                    ) {
                      updateCustomerProfile.setFieldError(
                        "cpassword",
                        "Passwords Do Not Match"
                      );
                    } else {
                      updateCustomerProfile.setFieldError("cpassword", "");
                    }
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                  {...updateCustomerProfile.getInputProps("password")}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={6} p="md">
                <PasswordInput
                  // error={renderErrorMessage("cpassword")}
                  size="md"
                  label="Confirm Password"
                  // disabled={disabled}
                  placeholder="Re-Enter Password"
                  value={cpassword}
                  errorProps={(v) => {
                    return v !== password;
                  }}
                  onChange={(e) => setCPassword(e.target.value)}
                  {...updateCustomerProfile.getInputProps("cpassword")}
                />
              </Grid.Col>
            </Grid>
          </form>
        </Paper>
      </Center>
    </Paper>
  );
};

export default CustomerSettings;
