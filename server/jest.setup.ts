import mongoose from 'mongoose';
// @ts-ignore
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoServer = new MongoMemoryServer();

module.exports = async () => {
  const uri = await mongoServer.getUri();
  await mongoose.connect(uri, {
  });
};
