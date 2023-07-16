import { IconEye, IconPlus, IconTrash } from "@tabler/icons-react";
import TableComponent from "../tableComponenet/TableComponent";
import { data } from "./mockData";
import { routes } from "../../helpers/routesHelper";
import { IconEdit } from "@tabler/icons-react";

let headCells = [
    { id: "SR", numeric: true, disablePadding: true, label: "ID" },
    {
        id: "bookingCity",
        numeric: false,
        disablePadding: true,
        label: "City",
    },
    {
        id: "bookingZip",
        numeric: false,
        disablePadding: true,
        label: "ZIP",
    },
    {
        id: "bookingCustomer",
        numeric: false,
        disablePadding: true,
        label: "Customer",
    },
    {
        id: "bookingEmailAddress",
        numeric: false,
        disablePadding: true,
        label: "Email",
    },
    {
        id: "bookingContactNumber",
        numeric: false,
        disablePadding: true,
        label: "Contact",
    },
    {
        id: "bookingPackage",
        numeric: false,
        disablePadding: true,
        label: "Package",
    },
    {
        id: "bookingService",
        numeric: false,
        disablePadding: true,
        label: "Service",
    },
    {
        id: "bookingDescription",
        numeric: false,
        disablePadding: true,
        label: "Desc",
    },

    {
        id: "bookingPrice",
        date: false,
        numeric: true,
        disablePadding: true,
        label: "Total",
    },
    {
        id: "bookingPaidAmount",
        date: false,
        numeric: true,
        disablePadding: true,
        label: "Paid",
    },
    {
        id: "REMAINING_AMOUNT",
        date: false,
        numeric: true,
        disablePadding: true,
        label: "Remaining",
    },
    {
        id: "bookingPaymentStatus",
        date: false,
        numeric: true,
        disablePadding: true,
        label: "Status",
    },
    {
        id: "bookingPaymentStatus",
        date: false,
        numeric: true,
        disablePadding: true,
        label: "Payment Status",
    },
    {
        id: "bookingDate",
        date: true,
        numeric: false,
        disablePadding: true,
        label: "Booking At",
    },
    {
        id: "createdAt",
        date: true,
        numeric: false,
        disablePadding: true,
        label: "Created At",
    },
    {
        id: "actions",
        view: { icon: <IconEye /> },
        edit: { icon: <IconEdit />, editRoute: `${routes.addBooking}/` },
        delete: { icon: <IconTrash />, deleteURI: "admin/deleteBooking" },
        numeric: false,
        label: "Actions",
    },
    // { id: "action", numeric: false, disablePadding: true, label: "Action" },
];
const ViewBooking = () => {
    return (
        <TableComponent
            modalObject={{
                title: "Package Details"
            }}
            buttonObject={{
                uppercase: true,
                size: "sm",
                title: "Add Booking",
                path: routes.addBooking,
                icon: <IconPlus size={20} />,
                iconPosition: "right"
            }} headCells={headCells} getDataApiURI={`admin/getAllBookings`} />
    )
}

export default ViewBooking