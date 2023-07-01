import { useState } from "react";

import { Box, NavLink, Paper, ScrollArea } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconBrandFeedly, IconCards, IconCategory2, IconChevronRight, IconCurrencyRupee, IconEye, IconFileInfo, IconHome, IconMessage, IconNotebook, IconPackages, IconPlus, IconSettings, IconUserExclamation, IconUserQuestion, IconUsers } from "@tabler/icons-react";

const data = [
    {
        icon: IconHome,
        label: "Dashboard",
        // description: "Item with description",
        path: "/",
    },
    {
        icon: IconUsers,
        label: "Users",
        rightSection: <IconChevronRight size={14} stroke={1.5} />,
        path: "#",
        subNav: [
            {
                icon: IconPlus,
                label: "Add User",
                path: "addUser",
            },
            {
                icon: IconEye,
                label: "View All Users",
                path: "viewUser",
            },
        ],
    },
    {
        icon: IconCategory2,
        label: "Service Categories",
        rightSection: <IconChevronRight size={14} stroke={1.5} />,
        path: "#",
        subNav: [
            {
                icon: IconPlus,
                label: "Add Category",
                path: "addServiceCategory",
            },
            {
                icon: IconEye,
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
        icon: IconPackages,
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
        icon: IconNotebook,
        label: "Bookings",
        rightSection: <IconChevronRight size={14} stroke={1.5} />,
        path: "#",

        subNav: [
            {
                icon: IconPlus,
                label: "Add Booking",
                path: "addBooking",
            },
            {
                icon: IconEye,
                label: "View Bookings",
                path: "viewBookings",
            },
        ],
    },
    {
        icon: IconCurrencyRupee,
        label: "Payments",
        rightSection: <IconChevronRight size={14} stroke={1.5} />,
        path: "#",

        subNav: [
            {
                icon: IconPlus,
                label: "Add Payment",
                path: "addPayment",
            },
            {
                icon: IconEye,
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
                icon: IconPlus,
                label: "Add Compaint",
                path: "addComplaint",
            },
            {
                icon: IconEye,
                label: "View Complaints",
                path: "viewComplaints",
            },
        ],
    },
    { icon: IconFileInfo, label: "Policies", path: "policies" },
    { icon: IconSettings, label: "Settings", path: "settings" },
    { icon: IconBrandFeedly, label: "Reviews & Feedback", path: "reviewsAndFeedbacks" },
    { icon: IconUserQuestion, label: "FAQs", path: "FAQ" },
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
                            setSubActive(i);
                            setActive(index);
                            // setOpened(false);
                        }}
                    />
                ))}
        </NavLink>
    ));

    return (
        <Paper style={{ width: "", height: "80vh" }} component={ScrollArea} type="never" styles={{
        }}>
            <Box sx={{ width: "300px", height: "100%" }}>{items}</Box>
        </Paper>
    );
};

export default SidebarComponent;