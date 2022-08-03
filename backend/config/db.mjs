import mongoose from 'mongoose';

const connection = async () => {
  const DB = process.env.DATABASE;
  try {
    await mongoose.connect(DB);

    console.log('mongo db connection successfull and run');
  } catch (error) {
    console.log('mongo db connection fail', error);
  }
};
export default connection;
