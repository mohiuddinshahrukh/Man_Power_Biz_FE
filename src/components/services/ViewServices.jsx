import { IconEye, IconPlus } from "@tabler/icons-react"
import TableComponent from "../tableComponenet/TableComponent"
import { data } from "./mockData"
// import { headCells } from "./headcells"

let headCells = [
    { id: "SR", numeric: true, disablePadding: true, label: "ID" },
    {
        id: "coverImage",
        numeric: false,
        disablePadding: true,
        label: "Image",
    },
    {
        id: "serviceTitle",
        numeric: false,
        disablePadding: true,
        label: "Title",
    },
    {
        id: "serviceDescription",
        numeric: false,
        disablePadding: true,
        label: "Desc",
    },

    {
        id: "servicePrice",
        date: false,
        numeric: true,
        disablePadding: true,
        label: "Price",
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
const ViewServices = () => {
    return (
        <TableComponent
            modalObject={{
                title: "Service Details"
            }}
            buttonObject={{
                uppercase: true,
                size: "sm",
                title: "Add Service",
                path: "/addService",
                icon: <IconPlus size={20} />,
                iconPosition: "right"
            }} headCells={headCells} rowData={data} />
    )
}

export default ViewServices