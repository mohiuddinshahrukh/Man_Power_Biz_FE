/* eslint-disable react/prop-types */
import { Button, Divider, Group, Image, Input, Text, rem, useMantineTheme } from "@mantine/core"
import { listAll, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useEffect, useState } from "react"
import { storage } from "../../firebase/firebaseConfiguration"
import { v4 } from "uuid"
import { failureNotification, successNotification } from "../../helpers/notificationHelper"
import { Dropzone, IMAGE_MIME_TYPE, MIME_TYPES } from "@mantine/dropzone"
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react"
import { uploadFile } from "../../helpers/uploadFileHelper"

const UploadFiles = ({ multiple, loading, setFileUpload }) => {
    const theme = useMantineTheme();
    const fileListRef = ref(storage, `fileUpload/`)
    // const [fileUpload, setFileUpload] = useState([]);
    const [files, setFiles] = useState([])
    useEffect(() => {
        listAll(fileListRef).then((res) => {
            console.log(res);
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setFiles((prev) => [...prev, url])
                })
            })
        })
    }, [])
    return (
        <div>

            {/* <Button onClick={() => { uploadFile(fileUpload) }}>Upload File</Button> */}

            {/* {files.length > 0 && files.map((file, index) => <Image key={index} src={file} height={200} width={200} fit="contain" />)} */}

            <Dropzone
                loading={loading}
                onDrop={(files) => {
                    //console.log(...files);
                    setFileUpload(files)
                }}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                multiple={multiple}

            >
                <Group position="center" spacing="xl" style={{ minHeight: rem(220), pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <IconUpload
                            size="3.2rem"
                            stroke={1.5}
                            color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX
                            size="3.2rem"
                            stroke={1.5}
                            color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconPhoto size="3.2rem" stroke={1.5} />
                    </Dropzone.Idle>

                    <div>
                        <Text size="xl" inline>
                            Drag {multiple ? "images" : "an image"} here or click to select {multiple ? "files" : "file"}
                        </Text>
                        <Text size="sm" color="dimmed" inline mt={7}>
                            File should not exceed <b>5mb</b>
                        </Text>
                    </div>
                </Group>
            </Dropzone>
        </div>
    )
}

export default UploadFiles