import { createStyles, Group, Paper, SimpleGrid, Text, rem, Title } from '@mantine/core';
import {
    IconUserPlus,
    IconDiscount2,
    IconReceipt2,
    IconCoin,
    IconArrowUpRight,
    IconArrowDownRight,
} from '@tabler/icons-react';
import LineChart from './charts/LineChart';
import { SimpleRadialBarChart } from './charts/SimpleRadialBarChart';


const useStyles = createStyles((theme) => ({
    titles: {
        fontSize: "25px",
        margin: "20px 0px",
        padding: 0
    },
    root: {
        height: "100%",
        width: "100%",
    },

    value: {
        fontSize: rem(24),
        fontWeight: 700,
        lineHeight: 1,
    },

    diff: {
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
    },

    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },

    title: {
        fontWeight: 700,
        textTransform: 'uppercase',
    },
}));

const icons = {
    user: IconUserPlus,
    discount: IconDiscount2,
    receipt: IconReceipt2,
    coin: IconCoin,
};






// fill: "#a4de6c"
// fill: "#d0ed57"
// fill: "#ffc658"
const data = [
    {
        title: "Revenue",
        icon: "receipt",
        value: 13456,
        diff: 34,
        fill: "#8884d8"
    },
    {
        title: "Profit",
        icon: "coin",
        value: 4145,
        diff: -13,
        fill: "#83a6ed"
    },
    {
        title: "Coupons usage",
        icon: "discount",
        value: 745,
        diff: 18,
        fill: "#8dd1e1"
    },
    {
        title: "New customers",
        icon: "user",
        value: 188,
        diff: -30,
        fill: "#82ca9d"
    }
]


export function Dashboard() {
    const { classes } = useStyles();
    const stats = data?.map((stat) => {
        const Icon = icons[stat.icon];
        const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

        return (
            <Paper withBorder p={"md"} radius="md" key={stat.title}>
                <Group position="apart">
                    <Text size="xs" color="dimmed" className={classes.title}>
                        {stat.title}
                    </Text>
                    <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
                </Group>

                <Group align="flex-end" spacing="xs" mt={25}>
                    <Text className={classes.value}>{stat.value.toLocaleString()}</Text>
                    <Text color={stat.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
                        <span>{stat.diff}%</span>
                        <DiffIcon size="1rem" stroke={1.5} />
                    </Text>
                </Group>

                <Text fz="xs" c="dimmed" mt={7}>
                    Compared to previous month
                </Text>
            </Paper>
        );
    });
    return (
        <Paper p={"md"} className={classes.root}>
            <Title className={classes.titles} >Cards</Title>
            <SimpleGrid
                cols={4}
                breakpoints={[
                    { maxWidth: 'md', cols: 2 },
                    { maxWidth: 'xs', cols: 1 },
                ]}
            >
                {stats}
            </SimpleGrid>
            <Title className={classes.titles}>Charts</Title>
            <SimpleGrid
                cols={2}
                style={{ height: "50vh", width: "100%" }}>
                <div style={{ height: "50vh", width: "100%" }}><LineChart data={data} /></div>
                <div style={{ height: "50vh", width: "100%" }}><SimpleRadialBarChart data={data} /></div>
            </SimpleGrid>
        </Paper>
    );
}