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
      for (const element of Object.values(files)) {
        const imageRef = ref(storage, `fileUpload/${element.name + v4()}`);
        const res = await uploadBytes(imageRef, element);
        const url = await getDownloadURL(res.ref);
        successNotification(`Image uploaded successfully`);
        setLoading(false);
        console.log("ref: ", res);
        console.log("url: ", url);
        return url;
      }
    }
  } catch (error) {
    console.log(error);
    return "";
  }
};
