import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri) throw new Error('Missing MONGODB_URI in environment variables');
if (!dbName) throw new Error('Missing DB_NAME in environment variables');

// Reuse the client across hot-reloads in dev
let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
  clientPromise = client.connect();
}

export const collection = {
  PRODUCTS: 'products',
  USERS: 'users',
};

export const dbConnect = async () => {
  const c = await clientPromise;
  return c.db(dbName);
};
