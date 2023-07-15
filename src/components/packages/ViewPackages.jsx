import { IconEye, IconPlus } from "@tabler/icons-react"
import TableComponent from "../tableComponenet/TableComponent"
import { data } from "./mockData"
import { routes } from "../../helpers/routesHelper";
let headCells = [
    { id: "SR", numeric: true, disablePadding: true, label: "ID" },
    {
        id: "coverImage",
        numeric: false,
        disablePadding: true,
        label: "Image",
    },
    {
        id: "packageTitle",
        numeric: false,
        disablePadding: true,
        label: "Title",
    },
    {
        id: "packageDescription",
        numeric: false,
        disablePadding: true,
        label: "Desc",
    },

    {
        id: "price",
        date: false,
        numeric: true,
        disablePadding: true,
        label: "Price",
    },
    {
        id: "STATUS",
        date: false,
        numeric: true,
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
const ViewPackages = () => {
    return (
        <TableComponent
            modalObject={{
                title: "Package Details"
            }}
            buttonObject={{
                uppercase: true,
                size: "sm",
                title: "Add Package",
                path: routes.addPackage,
                icon: <IconPlus size={20} />,
                iconPosition: "right"
            }} headCells={headCells} rowData={data} />
    )
}

export default ViewPackages