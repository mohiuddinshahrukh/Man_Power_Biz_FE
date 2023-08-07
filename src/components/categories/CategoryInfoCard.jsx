/*eslint-disable*/
import {
  createStyles,
  SimpleGrid,
  Card,
  Image,
  Text,
  AspectRatio,
  Menu,
  Button,
  Loader,
} from "@mantine/core";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",
    border: "1px solid #ebebeb",

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
}));

const CategoryInfoCard = ({ categories, loading }) => {
  const { classes } = useStyles();

  console.log(categories);

  const cards = categories?.map((category) => (
    <Card
      key={category._id}
      p="md"
      radius="md"
      component="a"
      href="#"
      className={classes.card}
    >
      <AspectRatio ratio={1920 / 1080}>
        <Image src={category.image} />
      </AspectRatio>
      <Text className={classes.title} mt={"xs"} size={"lg"} mb={"xs"}>
        {category.categoryTitle}
      </Text>

      <Menu
        shadow="md"
        width={200}
        transitionProps={{
          duration: 300,
          timingFunction: "ease",
          delay: 0,
        }}
        position="right-end"
        withArrow
      >
        <Menu.Target>
          <Button>Services</Button>
        </Menu.Target>

        {category.categoryServices.map((service) => (
          <Menu.Dropdown key={service._id}>
            <Menu.Label>{service.serviceTitle}</Menu.Label>
          </Menu.Dropdown>
        ))}
      </Menu>
    </Card>
  ));

  return (
    <>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Loader size={"xl"} />
        </div>
      )}
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: "md", cols: 2 },
          { maxWidth: "sm", cols: 1 },
        ]}
      >
        {cards}
      </SimpleGrid>
    </>
  );
};
export default CategoryInfoCard;
