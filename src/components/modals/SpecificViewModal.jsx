/* eslint-disable react/prop-types */
import { Badge, Grid, Image, Modal, Stack, Text, Title } from "@mantine/core"
import { UserProfileCard } from "../cards/UserProfileCard"
import ServiceCategoryViewCard from "../cards/ServiceCategoryViewCard"
import ServicesViewCard from "../cards/ServicesViewCard"

const SpecificViewModal = ({ opened, close, title, open, data }
) => {
    console.log(data)
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
            {/* <UserProfileCard data={data} /> */}
            {/* <ServiceCategoryViewCard data={data} /> */}
            <ServicesViewCard data={data} />
        </Modal>

    )
}

export default SpecificViewModal