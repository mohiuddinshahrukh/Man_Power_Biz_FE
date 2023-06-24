import { useState } from "react";

import { Box, NavLink, Paper } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconBrandStripe, IconBuildingFortress, IconBuildingStore, IconCards, IconChevronRight, IconCornerUpLeftDouble, IconEye, IconLayoutGrid, IconMessage, IconNotebook, IconPlus, IconSettings, IconUserExclamation } from "@tabler/icons-react";

const data = [
    {
        icon: IconLayoutGrid,
        label: "Dashboard",
        // description: "Item with description",
        path: "/",
    },
    {
        icon: IconNotebook,
        label: "Users",
        rightSection: <IconChevronRight size={14} stroke={1.5} />,
        path: "#",
        subNav: [
            {
                icon: IconBuildingFortress,
                label: "Add User",
                path: "addUser",
            },
            {
                icon: IconBuildingStore,
                label: "View All Users",
                path: "viewUser",
            },
        ],
    },
    {
        icon: IconNotebook,
        label: "Service Categories",
        rightSection: <IconChevronRight size={14} stroke={1.5} />,
        path: "#",
        subNav: [
            {
                icon: IconBuildingFortress,
                label: "Add Category",
                path: "addServiceCategory",
            },
            {
                icon: IconBuildingStore,
                label: "View Categories",
                path: "viewServiceCategories",
            },
        ],
    },
    {
        icon: IconCards,
        label: "Services",
        path: "#",

        subNav: [
            {
                icon: IconPlus,
                label: "Add Service",
                path: "addService",
            },
            {
                icon: IconEye,
                label: "View Services",
                path: "viewServices",
            },
        ],
    },
    {
        icon: IconCards,
        label: "Packages",
        path: "#",

        subNav: [
            {
                icon: IconPlus,
                label: "Add Package",
                path: "addPackage",
            },
            {
                icon: IconEye,
                label: "View Packages",
                path: "viewPackages",
            },
        ],
    },
    {
        icon: IconBrandStripe,
        label: "Bookings",
        rightSection: <IconChevronRight size={14} stroke={1.5} />,
        path: "#",

        subNav: [
            {
                icon: IconBuildingFortress,
                label: "Add Booking",
                path: "addBooking",
            },
            {
                icon: IconBuildingStore,
                label: "View Bookings",
                path: "viewBookings",
            },
        ],
    },
    {
        icon: IconCornerUpLeftDouble,
        label: "Payments",
        rightSection: <IconChevronRight size={14} stroke={1.5} />,
        path: "#",

        subNav: [
            {
                icon: IconBuildingStore,
                label: "Add Payment",
                path: "addPayment",
            },
            {
                icon: IconBuildingFortress,
                label: "View Payments",
                path: "viewPayments",
            },
        ],
    },
    { icon: IconMessage, label: "Chats", path: "chats" },
    {
        icon: IconUserExclamation,
        label: "Complaints",
        rightSection: <IconChevronRight size={14} stroke={1.5} />,
        path: "#",

        subNav: [
            {
                icon: IconBuildingFortress,
                label: "Add Compaint",
                path: "addComplaint",
            },
            {
                icon: IconBuildingStore,
                label: "View Complaints",
                path: "viewComplaints",
            },
        ],
    },
    { icon: IconSettings, label: "Policies", path: "policies" },
    { icon: IconSettings, label: "Settings", path: "settings" },
    { icon: IconSettings, label: "Reviews & Feedback", path: "reviewsAndFeedbacks" },
    { icon: IconSettings, label: "FAQs", path: "FAQ" },
];
const SidebarComponent = () => {

    const [active, setActive] = useState(0);
    const [subActive, setSubActive] = useState(0);

    const items = data?.map((item, index) => (
        <NavLink
            styles={{ label: { fontSize: "1rem" } }}
            color={"red"}
            // className={active === index ? "fgColorF" : ""}
            key={index}
            active={!item.subNav && active === index}
            label={index + 1 + " - " + item.label}
            description={item.description}
            rightSection={item.rightSection}
            icon={<item.icon className="fgColorF" size={25} stroke={1.5} />}
            component={Link}
            to={item.path}
            onClick={() => {
                console.log("item", item)
                setActive(index);
                setSubActive(null);
                if (!item.subNav) {
                    // setOpened(false);
                }
            }}
        >
            {item.subNav &&
                item?.subNav?.map((subItem, i) => (
                    <NavLink
                        color={"red"}
                        styles={{ label: { fontSize: "1rem" } }}
                        active={active === index && subActive === i}
                        key={i}
                        label={index + 1 + "." + (i + 1) + " - " + subItem.label}
                        icon={<subItem.icon className="fgColorF" size={25} stroke={1.5} />}
                        component={Link}
                        to={subItem.path}
                        onClick={() => {
                            console.log("subItem", subItem)
                            setSubActive(i);
                            setActive(index);
                            // setOpened(false);
                        }}
                    />
                ))}
        </NavLink>
    ));

    return (
        <Paper style={{ width: "", height: "80vh" }} withBorder>
            <Box sx={{ width: "300px ", height: "100%" }}>{items}</Box>
        </Paper>
    );
};

export default SidebarComponent;