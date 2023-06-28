import { IconEye, IconPlus } from "@tabler/icons-react"
import TableComponent from "../tableComponenet/TableComponent"
import { data } from "./mockData"
let headCells = [
    { id: "SR", numeric: false, disablePadding: false, label: "ID" },

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
        label: "Price",
    },
    {
        id: "paymentStatus",
        date: false,
        numeric: false,
        disablePadding: true,
        label: "Payment Status",
    },
    {
        id: "createdAt",
        date: true,
        numeric: false,
        disablePadding: true,
        label: "Created At",
    },
    {
        id: "bookingDate",
        date: true,
        numeric: false,
        disablePadding: true,
        label: "Booked At",
    },
    {
        id: "actions",
        view: <IconEye />,
        numeric: false,
        label: "Actions",
    },
    // { id: "action", numeric: false, disablePadding: true, label: "Action" },
];
const ViewPayment = () => {
    return (
        <TableComponent
            modalObject={{
                title: "Package Details"
            }}
            buttonObject={{
                uppercase: true,
                size: "sm",
                title: "Add Payment",
                path: "/addPayment",
                icon: <IconPlus size={20} />,
                iconPosition: "right"
            }} headCells={headCells} rowData={data} />
    )
}

export default ViewPayment