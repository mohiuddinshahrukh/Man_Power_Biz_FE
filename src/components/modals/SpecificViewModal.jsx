import { Button, Group, Modal, Title } from "@mantine/core"

// eslint-disable-next-line react/prop-types
const SpecificViewModal = ({ opened, close, title, open, data }
) => {
    console.log(data)
    return (
        <Modal title={<Title>{title}</Title>} opened={opened} onClose={close} withCloseButton={false} >
        </Modal>

    )
}

export default SpecificViewModal