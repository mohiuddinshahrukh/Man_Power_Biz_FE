import { Container, Paper } from "@mantine/core"
import { MainNavbarComponent } from "../navbar/MainNavbarComponent"
import MainSearchArea from "./MainSearchArea"
import FilterCards from "./FilterCards"

const LandingPage = () => {
    return (
        <Paper radius={0} p={0} m={0}>
            <MainNavbarComponent />
            <MainSearchArea />
            <Container size={"xl"} pos={"relative"}>
                <FilterCards />
            </Container>
        </Paper>)
}

export default LandingPage