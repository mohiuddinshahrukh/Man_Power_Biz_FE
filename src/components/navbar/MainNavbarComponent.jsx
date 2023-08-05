import {
  createStyles,
  Header,
  Group,
  Button,
  UnstyledButton,
  Text,
  ThemeIcon,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  Anchor,
  Avatar,
  Menu,
  ActionIcon,
  Badge,
} from "@mantine/core";
// import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
  IconDeviceMobile,
  IconBrandWhatsapp,
  IconMail,
  IconUser,
  IconSettings,
  IconEdit,
  IconDashboard,
  IconLayoutGrid,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { UserProfileContext } from "../../contexts/userProfileContext";
import { useContext } from "react";
import { ToggleTheme } from "../dashboard/theme/ToggleTheme";
import UserAvatar from "../dashboard/UserAvatar";
import { customerRoutes } from "../../helpers/routesHelper";
const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

export function MainNavbarComponent() {
  const { loggedInUserDetails, setLoggedInUserDetails } =
    useContext(UserProfileContext);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const navigate = useNavigate();
  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));
  console.log("loggedInUserDetails", loggedInUserDetails);
  return (
    <Box h={60} pos={"sticky"} top={0} style={{ zIndex: 10 }}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Anchor
            component={Link}
            to={"/"}
            underline={false}
            color="black"
            fs={10}
          >
            Logo
          </Anchor>
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Anchor
              underline={false}
              component={Link}
              to={"/"}
              className={classes.link}
            >
              Home
            </Anchor>
            <a href="#" className={classes.link}>
              Help
            </a>

            {loggedInUserDetails &&
            JSON.stringify(loggedInUserDetails) != "{}" ? (
              <Group spacing={3}>
                <Menu>
                  <Menu.Target>
                    <ActionIcon>
                      <Avatar
                        variant="outline"
                        size={28}
                        radius={"sm"}
                        src={""}
                      />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Options</Menu.Label>
                    <Menu.Item
                      onClick={() => {
                        navigate(customerRoutes.customerHome);
                      }}
                    >
                      <Group spacing={3}>
                        <IconLayoutGrid />
                        <Text>Dashboard</Text>
                      </Group>
                    </Menu.Item>
                    <Menu.Divider></Menu.Divider>
                    <Menu.Label>Profile</Menu.Label>

                    <Menu.Item>
                      <Group spacing={3}>
                        <IconUser />
                        <Text>{loggedInUserDetails.fullName} </Text>{" "}
                      </Group>
                    </Menu.Item>
                    <Menu.Item>
                      <Group spacing={3}>
                        <IconMail />
                        <Text>{loggedInUserDetails.email}</Text>
                      </Group>
                    </Menu.Item>
                    <Menu.Item>
                      <Group spacing={3}>
                        <IconDeviceMobile />
                        <Text>{loggedInUserDetails.contactNumber}</Text>
                      </Group>
                    </Menu.Item>
                    <Menu.Item>
                      <Group spacing={3}>
                        <IconBrandWhatsapp />
                        <Text>{loggedInUserDetails.whatsappNumber}</Text>
                      </Group>
                    </Menu.Item>

                    <Menu.Divider></Menu.Divider>
                    <Menu.Label>Settings</Menu.Label>
                    <Menu.Item>
                      <Group spacing={3}>
                        <IconEdit />
                        <Text>Edit Profile</Text>
                      </Group>
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        localStorage.removeItem("customerDetails");
                        setLoggedInUserDetails({});
                      }}
                    >
                      <Group spacing={3}>
                        <IconSettings />
                        <Text>Logout</Text>
                      </Group>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
                <ToggleTheme />
              </Group>
            ) : (
              <Group className={classes.hiddenMobile}>
                <Button variant="default" component={Link} to={"/auth"}>
                  Log in
                </Button>
                <Button>Sign up</Button>
              </Group>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            <Anchor component={Link} to={"/auth"}>
              <Button variant="default">Log in</Button>
            </Anchor>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
