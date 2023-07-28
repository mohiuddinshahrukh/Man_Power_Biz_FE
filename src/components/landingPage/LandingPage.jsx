import { Container, Divider, Paper } from "@mantine/core";
import { MainNavbarComponent } from "../navbar/MainNavbarComponent";
import MainSearchArea from "./MainSearchArea";
import FilterCards from "./FilterCards";
import TopRepairsSection from "./TopRepairsSection";
import CustomerTestimonials from "./CustomerTestimonials";

const LandingPage = () => {
  return (
    <Paper radius={0} p={0} m={0}>
      <MainNavbarComponent />
      <MainSearchArea />
      <Container size={"xl"} pos={"relative"}>
        <FilterCards />
        <Divider my={"xl"} />
        <TopRepairsSection />
        <Divider my={"xl"} />
        <CustomerTestimonials />
      </Container>
    </Paper>
  );
};

export default LandingPage;
