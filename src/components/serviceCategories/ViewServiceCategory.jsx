import { IconEye, IconPlus } from "@tabler/icons-react"
import TableComponent from "../tableComponenet/TableComponent"
import { data } from "./mockData";

let headCells = [
    { id: "SR", numeric: true, disablePadding: true, label: "ID" },
    {
        id: "image",
        numeric: false,
        disablePadding: true,
        label: "Image",
    },
    {
        id: "categoryTitle",
        numeric: false,
        disablePadding: true,
        label: "Title",
    },
    {
        id: "categoryDescription",
        numeric: false,
        disablePadding: true,
        label: "Desc",
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
const ViewServiceCategory = () => {
    return (
        <TableComponent
            modalObject={{
                title: "Category Details"
            }}
            buttonObject={{
                uppercase: true,
                size: "sm",
                title: "Add Category",
                path: "/addServiceCategory",
                icon: <IconPlus size={20} />,
                iconPosition: "right"
            }} headCells={headCells} rowData={data} />

    )
}

export default ViewServiceCategory