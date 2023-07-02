import {
    createStyles,
    Card,
    Text,
    SimpleGrid,
    UnstyledButton,
    Anchor,
    Group,
    rem,
    Image,
} from '@mantine/core';

import cooking from "../../../public/assets/map_cooking.svg"
import dry_cleaning from "../../../public/assets/map_dry_cleaning.svg"
import electrician from "../../../public/assets/map_electrician.svg"
import electronics from "../../../public/assets/map_electronics.svg"
import mechanic from "../../../public/assets/map_mechanic.svg"
import men_therapy from "../../../public/assets/map_men_therapy.svg"
import plumber from "../../../public/assets/map_plumber.svg"
import plus from "../../../public/assets/map_plus.svg"
const mockdata = [
    { title: 'Electricians', icon: electrician, color: 'violet' },
    { title: 'Plumbers', icon: plumber, color: 'indigo' },
    { title: 'Electronics', icon: electronics, color: 'blue' },
    { title: 'Mechanics', icon: mechanic, color: 'green' },
    { title: "Men's Therapy", icon: men_therapy, color: 'teal' },
    { title: 'Dry Cleaning', icon: dry_cleaning, color: 'cyan' },
    { title: 'Cooking', icon: cooking, color: 'pink' },
    { title: 'More', icon: plus, color: 'red' },
];

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        width: "50vw",
        border: "1px solid #eaeaea"
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
    },

    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: theme.radius.md,
        height: rem(120),
        width: rem(170),
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'box-shadow 150ms ease, transform 100ms ease',
        border: "1px solid #eaeaea",


        '&:hover': {
            boxShadow: theme.shadows.md,
            transform: 'scale(1.05)',
        },
    },
}));

export function FilterCards() {
    const { classes } = useStyles();

    const items = mockdata.map((item) => (
        <UnstyledButton key={item.title} className={classes.item} p={"xl"}>
            <Image src={item.icon} height={50} width={50} />
            <Text size="xs" mt={7}>
                {item.title}
            </Text>
        </UnstyledButton>
    ));

    return (
        <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center" }}><Card withBorder radius="md" className={classes.card} p={"xl"}>
            <Group position="apart">
                <Text className={classes.title}>Services</Text>
                <Anchor size="xs" color="dimmed" sx={{ lineHeight: 1 }}>
                    + 21 other services
                </Anchor>
            </Group>
            <SimpleGrid cols={4} mt="md">
                {items}
            </SimpleGrid>
        </Card></div>
    );
}