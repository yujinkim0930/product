import mongoose from 'mongoose';

const connect = () => {
  // mongoose.connect는 MongoDB 서버에 연결하는 메서드입니다.
  mongoose
    .connect(
      'mongodb+srv://sparta-user:aaaa4321@express-mongo.ynhsa9v.mongodb.net/?retryWrites=true&w=majority',
      {
        dbName: 'node_lv1',
      }
    )
    .then(() => console.log('MongoDB 연결에 성공하였습니다.'))
    .catch((err) => console.log(`MongoDB 연결에 실패하였습니다. ${err}`));
};

mongoose.connection.on('error', (err) => {
  console.error('MongoDB 연결 에러', err);
});

export default connect;
