import { Grid, Image, Paper, Title } from "@mantine/core";
import monitorMan from "../../assets/monitor-man.png";
const SecurePaymentsSection = () => {
  return (
    <Paper>
      <Grid align="center" justify="center">
        <Grid.Col lg={2}>
          <Image src={monitorMan} />
        </Grid.Col>
        <Grid.Col lg={8}>
          <Title>Your Payments Made More Secure Than Ever Before</Title>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default SecurePaymentsSection;
