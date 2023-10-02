/*eslint-disable*/
import {
  ActionIcon,
  BackgroundImage,
  Box,
  Button,
  Center,
  Chip,
  Group,
  Select,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { IconSearch, IconSquareRoundedX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { getCallWithHeaders } from "../../helpers/apiCallHelpers";
import { useNavigate } from "react-router-dom";

const MainSearchArea = () => {
  const [search, setSearch] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("kolkata");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const apiResponse = await getCallWithHeaders(
      "customer/get-all-service-categories"
    );
    setCategories(apiResponse.slice(0, 4));
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = () => {
    navigate(`/categories?search=${search}&zip=${zip}`);
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{ backgroundColor: "black", position: "relative", zIndex: 0 }}
      >
        <BackgroundImage
          pos={"relative"}
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
          h={"70vh"}
          opacity={"70%"}
          style={{}}
          styles={{}}
        />
      </div>
      <Center
        p={"xl"}
        h={"100%"}
        w={"100%"}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <Stack align="center">
          <Title color="white" size={"3vw"} align="center">
            {"20+ Services provided, right at the comfort of you home!"}
          </Title>
          <Group position="center" align="start">
            <Select
              styles={{
                label: {
                  color: "white",
                },
              }}
              label="City"
              placeholder="Select a city"
              data={[{ value: "kolkata", label: "Kolkata" }]}
              value={city}
            />
            <Select
              styles={{
                label: {
                  color: "white",
                },
              }}
              label="Zip"
              placeholder="Select a Zip"
              data={[
                { value: "70024", label: "70024" },
                { value: "70025", label: "70025" },
                { value: "70026", label: "70026" },
                { value: "70027", label: "70027" },
                { value: "70028", label: "70028" },
                { value: "70029", label: "70029" },
              ]}
              onSelect={(e) => {
                setZip(e.target.value);
              }}
              clearable
            />
            <Stack spacing={3}>
              <TextInput
                rightSection={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 5,
                    }}
                  >
                    <ActionIcon onClick={handleSearch}>
                      <IconSearch />
                    </ActionIcon>
                  </div>
                }
                styles={{
                  label: {
                    color: "white",
                  },
                }}
                label="Search"
                placeholder="Search"
                onChange={(event) => {
                  setSearch(event.currentTarget.value);
                }}
                value={search}
              />

              <Group spacing={3} maw={"100%"}>
                <Chip.Group
                  multiple={false}
                  value={search}
                  onChange={setSearch}
                >
                  {categories?.map((data, index) => {
                    return (
                      <Chip
                        key={index}
                        value={data.categoryTitle.toLowerCase()}
                      >
                        {data.categoryTitle}
                      </Chip>
                    );
                  })}
                </Chip.Group>
              </Group>
            </Stack>
          </Group>
        </Stack>
      </Center>
    </div>
  );
};

export default MainSearchArea;
