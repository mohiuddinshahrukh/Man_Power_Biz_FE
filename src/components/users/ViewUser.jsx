import { IconEye } from "@tabler/icons-react";
import TableComponent from "../tableComponenet/TableComponent"
import { rowData } from "./mockdata"
let headCells = [
    { id: "SR", numeric: true, disablePadding: true, label: "ID" },
    {
        id: "profileImage",
        numeric: false,
        disablePadding: true,
        label: "Image",
    },
    {
        id: "userType",
        numeric: false,
        disablePadding: true,
        label: "Type",
    },
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Name",
    },
    {
        id: "email",
        numeric: false,
        disablePadding: true,
        label: "Email",
    },
    {
        id: "phone",
        date: false,
        numeric: false,
        disablePadding: true,
        label: "Phone",
    },
    {
        id: "CNIC",
        date: false,
        numeric: false,
        disablePadding: true,
        label: "NIC",
    },
    {
        id: "STATUS",
        date: false,
        numeric: false,
        disablePadding: true,
        label: "Status",
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



const ViewUser = () => {
    return (
        <div>
            <TableComponent headCells={headCells} rowData={rowData} />
        </div>
    )
}

export default ViewUser