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
} from "@mantine/core";

import cooking from "../../assets/map_cooking.svg";
import dry_cleaning from "../../assets/map_dry_cleaning.svg";
import electrician from "../../assets/map_electrician.svg";
import electronics from "../../assets/map_electronics.svg";
import mechanic from "../../assets/map_mechanic.svg";
import men_therapy from "../../assets/map_men_therapy.svg";
import plumber from "../../assets/map_plumber.svg";
import plus from "../../assets/map_plus.svg";
import { useMediaQuery } from "@mantine/hooks";

const mockdata = [
  { title: "Electricians", icon: electrician, color: "violet" },
  { title: "Plumbers", icon: plumber, color: "indigo" },
  { title: "Electronics", icon: electronics, color: "blue" },
  { title: "Mechanics", icon: mechanic, color: "green" },
  { title: "Men's Therapy", icon: men_therapy, color: "teal" },
  { title: "Dry Cleaning", icon: dry_cleaning, color: "cyan" },
  { title: "Cooking", icon: cooking, color: "pink" },
  { title: "More", icon: plus, color: "red" },
];

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    width: "60vw",
    border: "2px solid #eaeaea",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: theme.radius.md,
    height: rem(120),
    width: "auto",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease, transform 100ms ease",
    border: "1px solid #eaeaea",

    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.05)",
    },
  },
}));

const FilterCards = () => {
  const { classes } = useStyles();
  const match1200 = useMediaQuery("(max-width: 1200px)");

  const items = mockdata.map((item) => (
    <UnstyledButton key={item.title} className={classes.item} p={"xl"}>
      <Image src={item.icon} height={50} width={50} />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card withBorder radius="md" className={classes.card} p={"xl"}>
        <Group position="apart">
          <Text className={classes.title}>Services</Text>
          <Anchor size="xs" color="dimmed" sx={{ lineHeight: 1 }}>
            + 21 other services
          </Anchor>
        </Group>
        <SimpleGrid
          cols={4}
          spacing="md"
          breakpoints={[
            { maxWidth: "lg", cols: 3 },
            { maxWidth: "md", cols: 2 },
            { maxWidth: "sm", cols: 1 },
          ]}
          style={{
            marginTop: match1200 ? "2rem" : "3rem",
            marginBottom: match1200 ? "2rem" : "3rem",
          }}
        >
          {items}
        </SimpleGrid>
      </Card>
    </div>
  );
};

export default FilterCards;
