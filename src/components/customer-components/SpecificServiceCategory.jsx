/*eslint-disable*/
import {
  ActionIcon,
  Anchor,
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  HoverCard,
  Image,
  Loader,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCallSpecificWithoutHeaders } from "../../helpers/apiCallHelpers";
import { useState } from "react";
import { Carousel } from "@mantine/carousel";
import { IconCurrencyRupee, IconDownload } from "@tabler/icons-react";
import PreviewPDFComponent from "./PreviewPDFComponent";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { useContext } from "react";

import shoppingCartLogo from "../../assets/shoppingCart.svg";
import { addToCart, removeFromCart } from "../../helpers/shoppingCartHelper";
import ShoppingCartTable from "./ShoppingCartTable";
import { CategoriesContext } from "../../contexts/categoriesContext";

const SpecificServiceCategory = () => {
  const { shoppingCartItems, setShoppingCartItems } =
    useContext(ShoppingCartContext);

  const { categoriesData, setCategoriesData } = useContext(CategoriesContext);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [pdfLink, setPdfLink] = useState("");
  const [PDFOpened, setPDFOpened] = useState(false);
  const [categoryData, setCategoryData] = useState({});
  const params = useParams();

  const getSpecificService = async () => {
    const apiResponse = await getCallSpecificWithoutHeaders(
      `customer/get-specific-service-category`,
      params.id
    );
    setCategoriesData(apiResponse.data);
    setCategoryData(apiResponse.data);
    setLoading(false);
  };

  useEffect(() => {
    getSpecificService();
  }, []);

  useEffect(() => {}, [refresh]);

  return (
    <>
      {loading ? (
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
      ) : (
        <Container my={"sm"} size={"xl"}>
          <PreviewPDFComponent
            pdfLink={pdfLink}
            setPdfLink={setPdfLink}
            opened={PDFOpened}
            setOpened={setPDFOpened}
          />
          <Grid>
            <Grid.Col lg={3}>
              <Title mb={"xs"}>{categoryData?.categoryTitle}</Title>
              <Card withBorder pos={"sticky"} top={70}>
                <Divider my="xs" label="Select a service" />
                <SimpleGrid cols={3}>
                  {categoryData?.categoryServices?.map((service, index) => {
                    return (
                      <Stack
                        spacing={0}
                        key={index}
                        display={
                          service?.servicePackages?.length > 0
                            ? "block"
                            : "none"
                        }
                      >
                        <HoverCard width={280} shadow="md" withinPortal={true}>
                          <HoverCard.Target>
                            <Avatar
                              src={service.serviceCoverImage}
                              size={"lg"}
                            />
                          </HoverCard.Target>
                          <HoverCard.Dropdown>
                            <Title order={3}>{service.serviceTitle}</Title>
                            <Text size="sm">{service?.serviceDescription}</Text>
                          </HoverCard.Dropdown>
                        </HoverCard>

                        <Text lineClamp={1}>{service.serviceTitle}</Text>
                      </Stack>
                    );
                  })}
                </SimpleGrid>
              </Card>
            </Grid.Col>
            <Grid.Col lg={9}>
              <Carousel withControls={true} withIndicators>
                {categoryData?.image?.map((image, index) => {
                  return (
                    <Carousel.Slide key={index}>
                      <Image
                        height={400}
                        fit="cover"
                        src={image}
                        radius={"md"}
                      />
                    </Carousel.Slide>
                  );
                })}
              </Carousel>
              <Grid my={"xs"}>
                <Grid.Col lg={7}>
                  <Card withBorder p={"xl"}>
                    {categoryData?.categoryServices?.map((service, index) => {
                      return (
                        <React.Fragment key={index}>
                          <Card.Section
                            key={index}
                            display={
                              service?.servicePackages?.length > 0
                                ? "block"
                                : "none"
                            }
                          >
                            <Title>{service.serviceTitle}</Title>
                            <Group spacing={5}>
                              <Text>PDF Guide</Text>
                              <ActionIcon
                                disabled={
                                  service?.servicePDF?.length > 0 ? false : true
                                }
                                size={"sm"}
                                variant="filled"
                                color="blue"
                                component={Anchor}
                                target="_blank"
                                href={service.servicePDF[0]}
                                download={service.serviceTitle}
                              >
                                <IconDownload />
                              </ActionIcon>
                            </Group>
                            {service?.servicePackages?.map((pkg, index) => {
                              return (
                                <Card withBorder my={"sm"} key={index}>
                                  <Tabs
                                    defaultValue={"images"}
                                    variant="default"
                                    my={"sm"}
                                  >
                                    <Tabs.List value="images">
                                      <Tabs.Tab value="images">Images</Tabs.Tab>
                                      <Tabs.Tab value="videos" color="blue">
                                        Videos
                                      </Tabs.Tab>
                                    </Tabs.List>
                                    <Box my={"sm"}></Box>
                                    <Tabs.Panel value="images">
                                      <Carousel>
                                        {pkg?.packageImages?.map(
                                          (image, index) => {
                                            return (
                                              <React.Fragment key={index}>
                                                <Carousel.Slide
                                                  style={{
                                                    borderRadius: "5px",
                                                  }}
                                                >
                                                  <Image
                                                    height={200}
                                                    radius={"md"}
                                                    fit="cover"
                                                    src={image}
                                                  />
                                                </Carousel.Slide>
                                              </React.Fragment>
                                            );
                                          }
                                        )}
                                      </Carousel>
                                    </Tabs.Panel>
                                    <Tabs.Panel value="videos">
                                      <Carousel>
                                        {pkg?.packageVideos?.map(
                                          (video, index) => {
                                            return (
                                              <React.Fragment key={index}>
                                                <Carousel.Slide
                                                  style={{
                                                    borderRadius: "5px",
                                                  }}
                                                >
                                                  <video
                                                    style={{
                                                      objectFit: "cover",
                                                      borderRadius: "5px",
                                                    }}
                                                    height={200}
                                                    width={"100%"}
                                                    controls
                                                    src={video}
                                                  />
                                                </Carousel.Slide>
                                              </React.Fragment>
                                            );
                                          }
                                        )}
                                      </Carousel>
                                    </Tabs.Panel>
                                  </Tabs>

                                  <Group position="apart">
                                    <Group spacing={3}>
                                      <Text weight={"bold"}>
                                        {pkg.packageTitle}
                                      </Text>
                                      <Group spacing={3}>
                                        <IconCurrencyRupee />
                                        <Text>
                                          {pkg.packagePrice?.toLocaleString()}
                                        </Text>
                                      </Group>
                                    </Group>
                                    <Group>
                                      <Button
                                        my={"sm"}
                                        compact
                                        onClick={() => {
                                          addToCart(
                                            shoppingCartItems,
                                            pkg,
                                            setShoppingCartItems,
                                            refresh,
                                            setRefresh
                                          );
                                        }}
                                      >
                                        Book
                                      </Button>
                                      <Button
                                        color="red"
                                        my={"sm"}
                                        compact
                                        onClick={() => {
                                          removeFromCart(
                                            shoppingCartItems,
                                            pkg,
                                            setShoppingCartItems,
                                            refresh,
                                            setRefresh
                                          );
                                        }}
                                      >
                                        Remove
                                      </Button>
                                    </Group>
                                  </Group>

                                  <Divider />
                                  <Text>{pkg.packageDescription}</Text>
                                  {/* <Anchor
                                  onClick={() => {
                                    open();
                                    setSelectedPackage(pkg);
                                  }}
                                >
                                  View Details
                                </Anchor> */}
                                </Card>
                              );
                            })}
                          </Card.Section>
                        </React.Fragment>
                      );
                    })}
                  </Card>
                </Grid.Col>
                <Grid.Col lg={5}>
                  <Box pos={"sticky"} top={70}>
                    <Card withBorder>
                      {shoppingCartItems?.length <= 0 ? (
                        <Stack align="center">
                          <Image
                            height={50}
                            width={50}
                            src={shoppingCartLogo}
                          />
                          <Text> There are no items in the cart!</Text>
                          <Text> Click on Add to start adding!</Text>
                        </Stack>
                      ) : (
                        <ShoppingCartTable />
                      )}
                    </Card>
                    <Card my={"xs"} withBorder>
                      <Text>
                        Avail our coupons to get discounts on your bookings!
                      </Text>
                    </Card>
                  </Box>
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default SpecificServiceCategory;
