import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    // Upload real file from disk
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "luxe-bags",
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });

    // Remove local temp file
    fs.unlinkSync(req.file.path);

    return res.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
