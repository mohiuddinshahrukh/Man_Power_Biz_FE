/* eslint-disable react/prop-types */
import { Modal, Title } from "@mantine/core";
import ServiceCategoryViewCard from "../cards/ServiceCategoryViewCard";
import ServicesViewCard from "../cards/ServicesViewCard";
import { useLocation } from "react-router-dom";
import PackageViewCard from "../cards/PackageViewCard";
import InvoiceViewCard from "../cards/InvoiceViewCard";

const SpecificViewModal = ({ opened, close, title, data }) => {
  const location = useLocation();
  const pathname = location.pathname;
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
      {pathname.includes("viewservicecategories") ? (
        <ServiceCategoryViewCard data={data} />
      ) : pathname.includes("viewservices") ? (
        <ServicesViewCard data={data} />
      ) : pathname.includes("viewPackages") ? (
        <PackageViewCard data={data} />
      ) : pathname.includes("viewBookings") ||
        pathname.includes("viewPayments") ||
        pathname.includes("viewCustomerBookings") ? (
        <InvoiceViewCard data={data} />
      ) : null}
      {/* <UserProfileCard data={data} /> */}
      {/* <ServiceCategoryViewCard data={data} /> */}
    </Modal>
  );
};

export default SpecificViewModal;
