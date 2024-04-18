import { v2 as cloudinary } from "cloudinary";
import { convertBufToStr } from "../utils/convertBufToStr.js"

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadImageToCloudinary = async (file) => {
  const dataURI = convertBufToStr(file.buffer, file.mimetype);
  try {
    const uploadResult = await cloudinary.uploader.upload(dataURI);
    console.log(uploadResult);
    return uploadResult;
  } catch (err) {
    throw new Error("Error while uploading " + err.message);
  }
};
