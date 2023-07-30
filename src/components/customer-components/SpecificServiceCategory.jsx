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
  Image,
  NumberInput,
  SimpleGrid,
  Stack,
  Table,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getCallSpecificWithoutHeaders } from "../../helpers/apiCallHelpers";
import { useState } from "react";
import { Carousel } from "@mantine/carousel";
import { IconCurrencyRupee, IconDownload, IconEye } from "@tabler/icons-react";
import PreviewPDFComponent from "./PreviewPDFComponent";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { useContext } from "react";
import { addToCart, removeFromCart } from "../../helpers/addToCartHelper";
import shoppingCartLogo from "../../assets/shoppingCart.svg";
const SpecificServiceCategory = () => {
  const { shoppingCartItems, setShoppingCartItems } =
    useContext(ShoppingCartContext);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  console.log("Refresh: ", refresh);
  const [pdfLink, setPdfLink] = useState("");
  const [PDFOpened, setPDFOpened] = useState(false);
  const [categoryData, setCategoryData] = useState({});
  const location = useLocation();
  const params = useParams();

  const getSpecificService = async () => {
    const apiResponse = await getCallSpecificWithoutHeaders(
      `customer/get-specific-service-category`,
      params.id
    );
    console.log("api Respoonse inside useEffect: ", apiResponse.data);
    setCategoryData(apiResponse.data);
  };
  useEffect(() => {
    getSpecificService();
  }, []);
  useEffect(() => {}, [refresh]);
  return (
    <Container my={"sm"} size={"xl"}>
      <PreviewPDFComponent
        pdfLink={pdfLink}
        setPdfLink={setPdfLink}
        opened={PDFOpened}
        setOpened={setPDFOpened}
      />
      <Grid>
        <Grid.Col lg={3}>
          <Title>{categoryData?.categoryTitle}</Title>
          <Card withBorder>
            <Divider my="xs" label="Select a service" />
            <SimpleGrid cols={3}>
              {categoryData?.categoryServices?.map((service, index) => {
                console.log("Service: ", service);
                return (
                  <Stack spacing={0} key={index}>
                    <Avatar
                      src={service.serviceCoverImage}
                      size={"lg"}
                    ></Avatar>
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
                  ></Image>
                </Carousel.Slide>
              );
            })}
          </Carousel>
          <Grid my={"xs"}>
            <Grid.Col lg={7}>
              <Card withBorder p={"xl"}>
                {categoryData?.categoryServices?.map((service, index) => {
                  return (
                    <Card.Section key={index}>
                      <Title>{service.serviceTitle}</Title>
                      <Group spacing={5}>
                        <Text>PDF Guide</Text>

                        {/* <Button
                          hidden={true}
                          rightIcon={<IconEye />}
                          onClick={() => {
                            setPdfLink(service.servicePDF[0]);
                            setPDFOpened(true);
                          }}
                        >
                          View
                        </Button> */}
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
                        console.log("Package", pkg);
                        return (
                          <React.Fragment key={index}>
                            <Tabs variant="outline" my={"sm"}>
                              <Tabs.List value="images">
                                <Tabs.Tab value="images">Images</Tabs.Tab>
                                <Tabs.Tab value="videos" color="blue">
                                  Videos
                                </Tabs.Tab>
                              </Tabs.List>
                              <Box my={"sm"}></Box>
                              <Tabs.Panel value="images">
                                <Carousel>
                                  {pkg?.packageImages?.map((image, index) => {
                                    return (
                                      <React.Fragment key={index}>
                                        <Carousel.Slide
                                          style={{ borderRadius: "5px" }}
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
                                  })}
                                </Carousel>
                              </Tabs.Panel>
                              <Tabs.Panel value="videos">
                                <Carousel>
                                  {pkg?.packageVideos?.map((video, index) => {
                                    return (
                                      <React.Fragment key={index}>
                                        <Carousel.Slide
                                          style={{ borderRadius: "5px" }}
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
                                  })}
                                </Carousel>
                              </Tabs.Panel>
                            </Tabs>

                            <Group position="apart">
                              <Group spacing={3}>
                                <Text weight={"bold"}>{pkg.packageTitle}</Text>
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
                                    console.log(pkg);
                                    addToCart(
                                      shoppingCartItems,
                                      pkg,
                                      setShoppingCartItems,
                                      refresh,
                                      setRefresh
                                    );
                                  }}
                                >
                                  Add
                                </Button>
                                <Button
                                  color="red"
                                  my={"sm"}
                                  compact
                                  onClick={() => {
                                    console.log(pkg);
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
                            <Anchor>View Details</Anchor>
                          </React.Fragment>
                        );
                      })}
                    </Card.Section>
                  );
                })}
              </Card>
            </Grid.Col>
            <Grid.Col lg={5}>
              <Card withBorder>
                {shoppingCartItems?.length <= 0 ? (
                  <Stack align="center">
                    <Image height={50} width={50} src={shoppingCartLogo} />
                    <Text> There are no items in the cart!</Text>
                    <Text> Click on Add to start adding!</Text>
                  </Stack>
                ) : (
                  <>
                    <Table>
                      <thead>
                        <tr>
                          <th>
                            <Text align="left">Item</Text>
                          </th>
                          <th align="right">
                            <Text align="right">Quantity</Text>
                          </th>
                          <th align="right">
                            <Group position="right" spacing={3}>
                              <IconCurrencyRupee />
                              <Text align="right">Price</Text>
                            </Group>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {shoppingCartItems?.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{item.packageTitle}</td>
                              <td align="right">
                                <NumberInput
                                  value={item.quantity}
                                  min={0}
                                  max={3}
                                />
                              </td>
                              <td align="right">
                                <Text>{item.price?.toLocaleString()}</Text>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                    <Button
                      styles={{
                        leftIcon: {
                          width: "50%",
                        },
                        rightIcon: {
                          width: "50%",
                          display: "flex",
                          justifyContent: "flex-end",
                        },
                      }}
                      leftIcon={
                        <Group spacing={3}>
                          <IconCurrencyRupee />
                          <Text>
                            {shoppingCartItems?.map((item) => {
                              console.log("Shopping cart items: ", item);
                            })}
                          </Text>
                        </Group>
                      }
                      rightIcon={<Text align="right">View Cart</Text>}
                      my={"xs"}
                      fullWidth
                    ></Button>
                  </>
                )}
              </Card>
              <Card my={"xs"} withBorder>
                <Text>
                  Avail our coupons to get discounts on your bookings!
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default SpecificServiceCategory;
