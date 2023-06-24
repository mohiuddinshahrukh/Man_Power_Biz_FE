import React, { useState } from 'react';
import {
    AppShell,
    Navbar,
    Header,
    Footer,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
    Group,
    Menu,
    ActionIcon,
    Avatar,
} from '@mantine/core';
import { Outlet, useNavigate } from 'react-router-dom';
import SidebarComponent from '../sidebar/SidebarComponent';
import { ToggleTheme } from './theme/ToggleTheme';
import { IconLogout } from '@tabler/icons-react';



const Appshell = () => {
    const navigate = useNavigate()
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (
        <AppShell
            styles={{
                main: {

                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ lg: 320 }} >
                    <SidebarComponent />
                </Navbar>
            }

            footer={
                <Footer height={60} p="md">
                    Urban Services 	&copy; 2023
                </Footer>
            }
            header={
                <Header height={{ base: 50, md: 70 }} p="md">
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>

                        <Group position='apart' w={"100%"}>
                            <Text>Urban Services Logo</Text>
                            <Group>
                                <Menu shadow="md" withArrow>
                                    <Menu.Target>
                                        <ActionIcon>
                                            <Avatar variant="gradient" size={"sm"} radius={"sm"} src={""} />
                                        </ActionIcon>
                                    </Menu.Target>

                                    <Menu.Dropdown>
                                        {[
                                            {
                                                label: "Profile",
                                                items: [
                                                    {
                                                        icon: <IconLogout />,
                                                        item: "Logout",
                                                        onClick: () => {
                                                            navigate("/auth");
                                                        },
                                                    },
                                                ],
                                            },
                                        ].map((element, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <Menu.Label>{element.label}</Menu.Label>
                                                    {element.items.map((item, index) => {
                                                        return (
                                                            <Menu.Item
                                                                onClick={item.onClick}
                                                                key={index}
                                                                icon={item.icon}
                                                            >
                                                                {item.item}
                                                            </Menu.Item>
                                                        );
                                                    })}
                                                </React.Fragment>
                                            );
                                        })}
                                    </Menu.Dropdown>
                                </Menu>
                                <ToggleTheme />
                            </Group>
                        </Group>
                    </div>
                </Header>
            }
        >
            <Outlet />
        </AppShell>
    );
}

export default Appshell;