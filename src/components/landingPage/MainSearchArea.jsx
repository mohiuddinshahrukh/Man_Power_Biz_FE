import {
  BackgroundImage,
  Button,
  Center,
  Chip,
  Group,
  Select,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const MainSearchArea = () => {
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
            ></Select>
            <Select
              styles={{
                label: {
                  color: "white",
                },
              }}
              label="Pin"
              placeholder="Select a pin"
              data={[
                { value: "pin1", label: "Pin 1" },
                { value: "pin2", label: "Pin 2" },
                { value: "pin3", label: "Pin 3" },
                { value: "pin4", label: "Pin 4" },
                { value: "pin5", label: "Pin 5" },
                { value: "pin6", label: "Pin 6" },
              ]}
            ></Select>
            <Stack spacing={3}>
              <TextInput
                rightSectionWidth={"100px"}
                rightSection={
                  <Button rightIcon={<IconSearch />}>{"Search"}</Button>
                }
                styles={{
                  label: {
                    color: "white",
                  },
                }}
                label="Search"
                placeholder="Search"
              />
              <Group spacing={3}>
                {[
                  {
                    value: "mens hair salons",
                    label: "Mens Hair Salons",
                  },
                  {
                    value: "womens hair salons",
                    label: "Womens Hair Salons",
                  },
                  {
                    value: "electrician",
                    label: "Electricians",
                  },
                  {
                    value: "house painters",
                    label: "House Painters",
                  },
                ].map((data, index) => {
                  return <Chip key={index}>{data.label}</Chip>;
                })}
              </Group>
            </Stack>
          </Group>
        </Stack>
      </Center>
    </div>
  );
};

export default MainSearchArea;
