import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { storage } from "./firebaseApp";

export const uploadImage = async (image: any) => {
  const storageRef: any = ref(storage, `images/${Date.now()}-${image.name}`);
  try {
    const snapshot = await uploadBytes(storageRef, image);
    const { metadata } = snapshot;

    let data: any = {
      image_name: metadata.name,
      full_path: metadata.fullPath,
      bucket: metadata.bucket,
      size: metadata.size,
      url: "",
    };

    const url = await getDownloadURL(storageRef);
    data.url = url;

    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export const multipleUploadImage = async (images: any) => {
  try {
    const data = await Promise.all(
      [...images].map(async (image: any) => {
        const storageRef: any = ref(
          storage,
          `images/${Date.now()}-${image.name}`
        );
        const snapshot = await uploadBytes(storageRef, image);
        const { metadata } = snapshot;

        let data: any = {
          image_name: metadata.name,
          full_path: metadata.fullPath,
          bucket: metadata.bucket,
          size: metadata.size,
          url: "",
          isCover: false,
        };

        const url = await getDownloadURL(storageRef);
        data.url = url;

        return data;
      })
    );

    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
