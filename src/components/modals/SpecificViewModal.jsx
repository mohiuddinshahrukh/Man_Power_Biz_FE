/* eslint-disable react/prop-types */
import { Badge, Grid, Image, Modal, Stack, Text, Title } from "@mantine/core";
import { UserProfileCard } from "../cards/UserProfileCard";
import ServiceCategoryViewCard from "../cards/ServiceCategoryViewCard";
import ServicesViewCard from "../cards/ServicesViewCard";
import { useLocation } from "react-router-dom";
import PackageViewCard from "../cards/PackageViewCard";
import InvoiceViewCard from "../cards/InvoiceViewCard";

const SpecificViewModal = ({ opened, close, title, open, data }) => {
  const location = useLocation();
  const pathname = location.pathname;
  console.log(data);
  console.log("location: ", location);
  return (
    <Modal
      closeOnEscape
      closeOnClickOutside
      styles={{
        title: {
          width: "100%",
          textAlign: "center",
        },
      }}
      title={<Title>{title}</Title>}
      opened={opened}
      onClose={close}
      withCloseButton
      size={"xl"}
    >
      {pathname.includes("categories") ? (
        <ServiceCategoryViewCard data={data} />
      ) : pathname.includes("service") ? (
        <ServicesViewCard data={data} />
      ) : pathname.includes("viewPackages") ? (
        <PackageViewCard data={data} />
      ) : pathname.includes("viewBookings") ||
        pathname.includes("viewPayments") ? (
        <InvoiceViewCard data={data} />
      ) : null}
      {/* <UserProfileCard data={data} /> */}
      {/* <ServiceCategoryViewCard data={data} /> */}
    </Modal>
  );
};

export default SpecificViewModal;
