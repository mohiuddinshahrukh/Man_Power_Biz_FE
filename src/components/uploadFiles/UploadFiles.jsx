/* eslint-disable react/prop-types */
import { Button, Group, Image, SimpleGrid, Text, rem, useMantineTheme } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const UploadFiles = ({ fileUpload, multiple, loading, setFileUpload }) => {
    const theme = useMantineTheme();
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (Array.isArray(fileUpload)) {
            setFiles(fileUpload);
        }
    }, [fileUpload]);

    const handleRemove = (index) => {
        const updatedFileUpload = files.filter((_, i) => i !== index);
        setFileUpload(updatedFileUpload);
    };

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);

        return (
            <div key={index} style={{ width: "200px" }}>
                <Image
                    styles={{ imageWrapper: { border: "1px solid #eaeaea" } }}
                    withPlaceholder
                    p={0}
                    m={0}
                    height={200}
                    width={200}
                    fit="contain"
                    src={imageUrl}
                    imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
                />
                <Button compact fullWidth onClick={() => handleRemove(index)}>
                    Remove
                </Button>
            </div>
        );
    });

    return (
        <div>
            <Dropzone
                multiple={multiple}
                accept={IMAGE_MIME_TYPE}
                onDrop={(files) => {
                    setFileUpload([...files]);
                }}
            >
                <Text align="center">Drop images here</Text>
            </Dropzone>

            <SimpleGrid
                cols={4}
                breakpoints={[{ maxWidth: "sm", cols: 1 }]}
                mt={previews.length > 0 ? "xl" : 0}
            >
                {previews}
            </SimpleGrid>
        </div>
    );
};

export default UploadFiles;
