import { uploadImageToCloudinary } from "../services/cloudinaryService.js";

export const uploadImage = async (req, res) => {
  try {
    const uploadResult = await uploadImageToCloudinary(req.file);
    // console.log(uploadResult);
    return await res.status(200).json({
      cloudinaryId: uploadResult.public_id,
      url: uploadResult.secure_url,
    });
  } catch (err) {
    res.status(500).json({ msg: "Error while uplaiding file" });
  }
};
