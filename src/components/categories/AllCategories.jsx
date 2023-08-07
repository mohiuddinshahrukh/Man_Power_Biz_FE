/*eslint-disable*/
import {
  Box,
  Button,
  Container,
  Group,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useEffect } from "react";
import CategoryInfoCard from "./CategoryInfoCard";
import { useState } from "react";
import { getCallWithHeaders } from "../../helpers/apiCallHelpers";
import { IconSearch } from "@tabler/icons-react";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    const apiResponse = await getCallWithHeaders(
      "customer/get-all-service-categories"
    );
    setCategories(apiResponse);
    setLoading(false);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Container size={"xl"} pt={20} mt={"lg"}>
      {!loading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          mb={"xl"}
        >
          <Text size={"1.4rem"} fw={"bold"}>
            All Categories
          </Text>
          <Group>
            <Select
              styles={{
                label: {
                  color: "white",
                },
              }}
              placeholder="Select a zip"
              data={[
                { value: "zip1", label: "zip 1" },
                { value: "zip2", label: "zip 2" },
              ]}
            />
            <TextInput
              rightSectionWidth={"100px"}
              styles={{
                label: {
                  color: "white",
                },
              }}
              placeholder="Search..."
            />
          </Group>
        </Box>
      )}
      <CategoryInfoCard categories={categories} loading={loading} />
    </Container>
  );
};

export default AllCategories;
