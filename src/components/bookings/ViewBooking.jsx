import { IconEye, IconPlus } from "@tabler/icons-react";
import TableComponent from "../tableComponenet/TableComponent";
import { data } from "./mockData";

let headCells = [
    { id: "SR", numeric: true, disablePadding: true, label: "ID" },
    {
        id: "customerName",
        numeric: false,
        disablePadding: true,
        label: "Customer",
    },
    {
        id: "bookingDescription",
        numeric: false,
        disablePadding: true,
        label: "Desc",
    },

    {
        id: "TOTAL_PRICE",
        date: false,
        numeric: true,
        disablePadding: true,
        label: "Total Price",
    },
    {
        id: "PAID_AMOUNT",
        date: false,
        numeric: true,
        disablePadding: true,
        label: "Total Paid",
    },
    {
        id: "REMAINING_AMOUNT",
        date: false,
        numeric: true,
        disablePadding: true,
        label: "Remaining",
    },
    {
        id: "bookingStatus",
        date: false,
        numeric: true,
        disablePadding: true,
        label: "Status",
    },
    {
        id: "paymentStatus",
        date: false,
        numeric: true,
        disablePadding: true,
        label: "Status",
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
        view: <IconEye />,
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
                path: "/addBooking",
                icon: <IconPlus size={20} />,
                iconPosition: "right"
            }} headCells={headCells} rowData={data} />
    )
}

export default ViewBooking