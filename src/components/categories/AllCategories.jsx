/*eslint-disable*/
import { Container } from "@mantine/core";
import React from "react";
import CategoryInfoCard from "./CategoryInfoCard";

const AllCategories = () => {
  return (
    <Container size={"xl"} pt={20}>
      <CategoryInfoCard />
    </Container>
  );
};

export default AllCategories;
