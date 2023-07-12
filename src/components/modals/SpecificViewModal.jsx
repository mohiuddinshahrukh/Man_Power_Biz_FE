/* eslint-disable react/prop-types */
import { Badge, Grid, Image, Modal, Stack, Text, Title } from "@mantine/core"

const SpecificViewModal = ({ opened, close, title, open, data }
) => {
    return (
        <Modal
            closeOnEscape
            closeOnClickOutside
            styles={{
                title: {
                    width: "100%",
                    textAlign: "center"
                }
            }} title={<Title>{title}</Title>} opened={opened} onClose={close} withCloseButton size={"xl"}>
            {/* <Divider /> */}
            <Grid gutter={"xl"} columns={12}>
                <Grid.Col span={4}>
                    <Image style={{ border: "1px solid black" }} fit="cover" height={"25vh"} width={"15vw"} src={data.image != null ? data.image : data.profileImage != null ? data.profileImage : ""} />
                </Grid.Col>
                <Grid.Col span={8}>
                    <Stack >
                        <Text><b>Name:</b> {data.name}</Text>
                        <Text><b>Email:</b> {data.email}</Text>
                        <Text><b>Phone:</b> {data.phone}</Text>
                        <Text><b>User Type:</b> {data.userType}</Text>
                        <Text><b>Status:</b> <Badge variant="filled" size="md" color={data.STATUS === "ACTIVE" ? "green" : "red"}>{data.STATUS}</Badge></Text>
                    </Stack>
                </Grid.Col>
            </Grid>
        </Modal>

    )
}

export default SpecificViewModal