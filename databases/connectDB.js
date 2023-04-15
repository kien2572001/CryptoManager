import mongoose from "mongoose";
const mongo_url = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
