import {
  createStyles,
  Header,
  Group,
  Button,
  Text,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Anchor,
  Avatar,
  Menu,
  ActionIcon,
} from "@mantine/core";
// import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from "@mantine/hooks";
import {
  IconDeviceMobile,
  IconBrandWhatsapp,
  IconMail,
  IconUser,
  IconSettings,
  IconEdit,
  IconLayoutGrid,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { UserProfileContext } from "../../contexts/userProfileContext";
import { useContext } from "react";
import { ToggleTheme } from "../dashboard/theme/ToggleTheme";
import { customerRoutes } from "../../helpers/routesHelper";
import LoginSignupModal from "../customer-components/LoginSignupModal";
import { useState } from "react";

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

export function MainNavbarComponent() {
  const { loggedInUserDetails, setLoggedInUserDetails } =
    useContext(UserProfileContext);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [loginSignupModalOpened, setLoginSignupModalOpened] = useState(false);
  const { classes, theme } = useStyles();
  const navigate = useNavigate();

  console.log("loggedInUserDetails", loggedInUserDetails);
  return (
    <>
      <LoginSignupModal
        opened={loginSignupModalOpened}
        setOpened={setLoginSignupModalOpened}
      />
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
                to={"/categories"}
                className={classes.link}
              >
                Categories
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
                  <Button
                    variant="default"
                    onClick={() => {
                      setLoginSignupModalOpened(true);
                    }}
                  >
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

            <a href="/" className={classes.link}>
              Home
            </a>

            <a href="/categories" className={classes.link}>
              Home
            </a>

            <Group position="center" grow pb="xl" px="md">
              <Button
                variant="default"
                onClick={() => {
                  setLoginSignupModalOpened(true);
                }}
              >
                Log in
              </Button>
              <Button>Sign up</Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    </>
  );
}
