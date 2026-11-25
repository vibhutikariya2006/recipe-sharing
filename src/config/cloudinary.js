const { env } = require("./env");

const cloudinary = require("cloudinary").v2;
console.log("Cloudinary Config Check:", {
    cloudName: !!env.CLOUDINARY_CLOUD_NAME,
    apiKey: !!env.CLOUDINARY_API_KEY,
    apiSecret: !!env.CLOUDINARY_API_SECRET
});
cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;
