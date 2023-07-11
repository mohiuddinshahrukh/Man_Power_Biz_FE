import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { failureNotification, successNotification } from "./notificationHelper";
import { storage } from "../firebase/firebaseConfiguration";
import { v4 } from "uuid";

export const uploadFile = async (files, setLoading) => {
  try {
    console.log("This is the files list: ", files);
    if (files.length <= 0) {
      failureNotification(`No images uploaded yet`);
      console.log("No images uploaded yet");
    } else {
      setLoading(true);
      let res = await Object.values(files).forEach((element) => {
        const imageRef = ref(storage, `fileUpload/${element.name + v4()}`);
        uploadBytes(imageRef, element).then((res) => {
          getDownloadURL(res.ref)
            .then((url) => {
              // setFiles((prev) => [...prev, url]);
              successNotification(`Image uploaded successfully`);
              setLoading(false);
              console.log("ref: ", res);
              console.log("url: ", url);
              return url;
            })
            .catch((err) => failureNotification(`${err}`));
        });
      });
      console.log("This is res: ", res);
    }
  } catch (error) {
    console.log(error);
    return "";
  }
};
