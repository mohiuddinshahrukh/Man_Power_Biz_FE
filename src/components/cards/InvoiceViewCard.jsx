/* eslint-disable react/prop-types */
import { Button, Grid, Group, Paper, Table, Text, Title } from "@mantine/core";
import { IconMail } from "@tabler/icons-react";
import {
  IconBrandWhatsapp,
  IconMapPin,
  IconPhone,
  IconPrinter,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { useRef } from "react";
import ReactToPrint from "react-to-print";

const InvoiceViewCard = ({ data }) => {
  console.log("Data Received in Invoice View Card: ", data);
  const componentRef = useRef();
  return (
    <Paper>
      <ReactToPrint
        trigger={() => (
          <Button my={"xs"} rightIcon={<IconPrinter />}>
            Print
          </Button>
        )}
        content={() => componentRef.current}
        documentTitle={data.bookingId}
        pageStyle={"margin:auto"}
        copyStyles={true}
        suppressErrors={true}
      />
      <Paper ref={componentRef} withBorder p={"xs"}>
        <Title order={2} p={5} bg={"dark"} color="white" align="center">
          Neha Services
        </Title>
        <Title align="center">{data.serviceTitle}</Title>
        <Group position="center" spacing={3}>
          <IconMapPin />
          <Text align="center" size={"lg"} transform="capitalize">
            {data.bookingCity}
          </Text>
        </Group>
        <Group position="center" spacing={3}>
          <IconMail />
          <Text align="center" size={"md"} transform="none">
            {data.bookingService?.map((booking) => {
              return booking.serviceInfoEmail;
            })}
          </Text>
        </Group>
        <Group position="center" spacing={3}>
          <Group spacing={3}>
            <IconPhone />
            <Text align="center" size={"md"} transform="none">
              {data.bookingService?.map((booking) => {
                return booking.serviceContactPhone;
              })}
            </Text>
          </Group>
          <Group spacing={3}>
            <IconBrandWhatsapp />
            <Text align="center" size={"md"} transform="none">
              {data.bookingService?.map((booking) => {
                return booking.serviceWhatsAppPhone;
              })}
            </Text>
          </Group>
        </Group>
        <Title
          my={"sm"}
          bg={"teal"}
          color="white"
          p={5}
          order={3}
          align="center"
        >
          {"Invoice "}Details
        </Title>
        <Grid>
          <Grid.Col>
            <Text>
              <b>Invoice Date: </b>
              {data.createdAt?.split("T")[0] || dayjs().format("YYYY-MM-DD")}
            </Text>
            <Text>
              <b>Tracking ID: </b>
              {data.bookingId}
            </Text>
            <Text>
              <b>Booking Status: </b>
              {data.bookingStatus}
            </Text>
            <Text>
              <b>Payment Status: </b>
              {data.bookingPaymentStatus} (
              {data.bookingPaidAmount?.toLocaleString()})
            </Text>
            <Text>
              <b>Customer Name: </b>
              {data.bookingCustomer.fullName}
            </Text>
            <Text>
              <b>Customer Email: </b>
              {data.bookingEmailAddress}
            </Text>
          </Grid.Col>
        </Grid>
        <Title
          my={"sm"}
          bg={"teal"}
          color="white"
          p={5}
          order={3}
          align="center"
        >
          Booking Details
        </Title>
        <Table withColumnBorders withBorder striped>
          <thead>
            <tr>
              <th> Package title</th>
              <th> Package Booking Date</th>
              <th>
                <Group position="right">
                  <Text>Package Quantity</Text>
                </Group>{" "}
              </th>
              <th>
                <Group position="right">
                  <Text>Package Price</Text>
                </Group>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.bookingPackage?.map((pkg, index) => {
              console.log("This si the pakacge: ", pkg);
              return (
                <tr key={index}>
                  <td>{pkg?.package?.packageTitle}</td>{" "}
                  {/* Access packageTitle */}
                  <td>
                    <Text>{dayjs(pkg?.bookingDate).format("YYYY-MM-DD")}</Text>
                  </td>
                  <td align="right">{pkg.quantity?.toLocaleString()}</td>
                  <td align="right">
                    {pkg?.package?.packagePrice?.toLocaleString()}
                  </td>{" "}
                  {/* Access packagePrice */}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Group position="right">
          <Text color={"dimmed"}>
            Total:{" "}
            {data.bookingPackage
              ?.reduce(
                (total, pkg) =>
                  total + pkg?.package?.packagePrice * pkg?.quantity,
                0
              )
              ?.toLocaleString()}
          </Text>
        </Group>
        <Text align="justify">
          <b>Customer Request: </b>
          <br />
          {data.bookingDescription}
        </Text>

        <Title
          my={"sm"}
          bg={"teal"}
          color="white"
          p={5}
          order={3}
          align="center"
        >
          Billing Details
        </Title>

        <Table withColumnBorders withBorder striped>
          <thead>
            <tr>
              <th>Item</th>
              <th>
                <Text align="right">Item Cost</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Price</td>
              <td align="right">
                {data.bookingPrice
                  ? data.bookingPrice?.toLocaleString()
                  : data.bookingPrice}
              </td>
            </tr>
            <tr>
              <td>Total Paid</td>
              <td align="right">{data.bookingPaidAmount?.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Remaining</td>
              <td align="right">
                {data.bookingRemainingAmount
                  ? data.bookingRemainingAmount?.toLocaleString()
                  : (
                      data.bookingPrice - data.bookingPaidAmount
                    )?.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </Table>
      </Paper>
    </Paper>
  );
};

export default InvoiceViewCard;
