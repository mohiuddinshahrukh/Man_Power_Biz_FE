/* eslint-disable react/prop-types */
import { Image, Modal } from '@mantine/core'
const ViewUploadedFileModal = ({
    opened, setOpened, dataType, data
}) => {
    return (
        <Modal size={"xl"} opened={opened} onClose={() => { setOpened(!opened) }} closeOnEscape withCloseButton closeOnClickOutside>
            {
                dataType === "image" ? <Image src={URL.createObjectURL(data)} /> : dataType === "video" ? <video src={URL.createObjectURL(data)} controls style={{ objectFit: "contain" }} /> : null
            }
        </Modal>
    )
}

export default ViewUploadedFileModal