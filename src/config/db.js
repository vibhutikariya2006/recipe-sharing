const mongoose = require("mongoose");
const dns = require("dns");
const { env } = require("./env");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

exports.connectDB = async () => {
  try {
    await mongoose.connect(env.MONGOOSE_URL);
    console.log("MongoDB Atlas Connected Successfully!");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};