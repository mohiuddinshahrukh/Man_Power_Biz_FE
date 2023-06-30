import { IconEye, IconUserPlus } from "@tabler/icons-react";
import TableComponent from "../tableComponenet/TableComponent"
// import { rowData } from "./mockdata"
import { useEffect, useState } from "react";
import { getCallWithHeaders } from "../../helpers/apiCallHelpers";


let headCells = [
    { id: "SR", numeric: true, disablePadding: true, label: "ID" },
    {
        id: "image",
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
        id: "fullName",
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
        id: "contactNumber",
        date: false,
        numeric: false,
        disablePadding: true,
        label: "Phone",
    },
    {
        id: "whatsappNumber",
        date: false,
        numeric: false,
        disablePadding: true,
        label: "WhatsApp",
    },
    {
        id: "status",
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
        id: "updatedAt",
        date: true,
        numeric: false,
        disablePadding: true,
        label: "Updated At",
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
    const [usersList, setUserList] = useState([])

    useEffect(() => {
        getCallWithHeaders("admin/getAllUsers").then(setUserList);

    }, [])
    return (
        usersList.length > 0 && <TableComponent
            modalObject={{
                title: "User Details"
            }}
            buttonObject={{
                uppercase: true,
                size: "sm",
                title: "Add User",
                path: "/addUser",
                icon: <IconUserPlus size={20} />,
                iconPosition: "right"
            }} headCells={headCells} rowData={usersList} />

    )
}

export default ViewUser