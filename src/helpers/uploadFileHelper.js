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
      const uploadedFiles = []; // Initialize an empty array to store uploaded file URLs
      for (const element of Object.values(files)) {
        const imageRef = ref(storage, `fileUpload/${element.name + v4()}`);
        const res = await uploadBytes(imageRef, element);
        const url = await getDownloadURL(res.ref);
        successNotification(`Image uploaded successfully`);
        console.log("ref: ", res);
        console.log("url: ", url);
        uploadedFiles.push(url); // Add the uploaded file URL to the array
      }
      setLoading(false);
      return uploadedFiles; // Return the array of uploaded file URLs
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};
