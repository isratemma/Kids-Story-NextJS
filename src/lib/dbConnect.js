import { MongoClient, ServerApiVersion } from 'mongodb';

export const collection = {
  PRODUCTS: 'products',
  USERS: 'users',
};

// Reuse the client across hot-reloads in dev
let clientPromise;

export const dbConnect = async () => {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME;

  if (!uri) throw new Error('Missing MONGODB_URI in environment variables');
  if (!dbName) throw new Error('Missing DB_NAME in environment variables');

  if (!clientPromise) {
    const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
    if (process.env.NODE_ENV === 'development') {
      // persist across hot-reloads
      if (!global._mongoClientPromise) {
        global._mongoClientPromise = client.connect();
      }
      clientPromise = global._mongoClientPromise;
    } else {
      clientPromise = client.connect();
    }
  }

  const c = await clientPromise;
  return c.db(dbName);
};
