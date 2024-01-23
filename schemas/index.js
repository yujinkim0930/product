import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect = () => {
  // mongoose.connect는 MongoDB 서버에 연결하는 메서드입니다.
  mongoose
    .connect(process.env.DB_URL, {
      dbName: process.env.DB_NAME,
    })
    .then(() => console.log("MongoDB 연결에 성공하였습니다."))
    .catch((err) => console.log(`MongoDB 연결에 실패하였습니다. ${err}`));
};

mongoose.connection.on("error", (err) => {
  console.error("MongoDB 연결 에러", err);
});

export default connect;
