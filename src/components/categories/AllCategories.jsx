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

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zip, setZip] = useState("");
  const [search, setSearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get("search");
    const zipParam = params.get("zip");
    if (searchParam) {
      setSearch(searchParam);
    }
    if (zipParam) {
      setZip(zipParam);
    }
  }, []);

  useEffect(() => {
    const filtered = categories?.filter((category) => {
      const searchMatch = category.categoryTitle
        .toLowerCase()
        .includes(search?.toLowerCase());

      const zipMatch = category.categoryServices.some((service) => {
        return service.serviceZipCode?.includes(zip); // Updated field name to serviceZipCode
      });

      return searchMatch && (zip === "" || zipMatch); // Updated the condition here
    });
    setFilteredCategories(filtered);
  }, [categories, search, zip]);

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
            {search ? `Search results for "${search}"` : "All Services"}
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
                { value: "70024", label: "70024" },
                { value: "70025", label: "70025" },
                { value: "70026", label: "70026" },
                { value: "70027", label: "70027" },
                { value: "70028", label: "70028" },
                { value: "70029", label: "70029" },
              ]}
              value={zip}
              onChange={setZip}
              clearable
            />
            <TextInput
              rightSectionWidth={"100px"}
              styles={{
                label: {
                  color: "white",
                },
              }}
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.currentTarget.value);
              }}
            />
            <Button
              color="blue"
              onClick={() => {
                setSearch("");
                setZip("");
                window.history.replaceState({}, "", window.location.pathname);
              }}
              disabled={search === "" && zip === ""}
            >
              Clear
            </Button>
          </Group>
        </Box>
      )}
      <CategoryInfoCard categories={filteredCategories} loading={loading} />
    </Container>
  );
};

export default AllCategories;
