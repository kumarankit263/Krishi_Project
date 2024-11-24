const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "CropConnect" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error); // Optional for debugging
          return reject(error);
        }
        resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

module.exports = {
  uploadImageToCloudinary,
};
