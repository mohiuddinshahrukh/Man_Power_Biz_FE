import {
  createStyles,
  Group,
  Paper,
  SimpleGrid,
  Text,
  rem,
  Stack,
} from "@mantine/core";
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
} from "@tabler/icons-react";
import CustomerDashboardChart from "./CustomerDashboardChart";

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
  },

  value: {
    fontSize: rem(24),
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

const data = [
  {
    title: "Total Spent",
    icon: "receipt",
    value: "13,456",
  },
  {
    title: "Total Bookings",
    icon: "coin",
    value: "15",
  },
  {
    title: "Total Completed Bookings",
    icon: "discount",
    value: "10",
  },
  {
    title: "Total Cancelled Bookings",
    icon: "user",
    value: "5",
  },
];
export function CustomerDashboard() {
  const { classes } = useStyles();
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" spacing="xs" mt={15}>
          <Text className={classes.value}>{stat.value}</Text>
        </Group>
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      <Stack h={"100%"} w={"100%"} spacing={"xl"}>
        <SimpleGrid
          cols={4}
          breakpoints={[
            { maxWidth: "md", cols: 2 },
            { maxWidth: "xs", cols: 1 },
          ]}
        >
          {stats}
        </SimpleGrid>
        <CustomerDashboardChart />
      </Stack>
    </div>
  );
}
