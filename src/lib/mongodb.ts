import { MongoClient } from "mongodb";

const uri = process.env.DB_URL || process.env.MONGODB_URI || "";
const options = {};

let clientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (uri) {
  if (process.env.NODE_ENV === "development") {
    // In development mode, reuse cached client promise across HMR reloads
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production mode, standard connection
    const client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export default clientPromise;

export async function getLeadsCollection() {
  if (!clientPromise) {
    return null;
  }
  const client = await clientPromise;
  // Use "jamspace" as database name or from env
  const dbName = process.env.DB_NAME || "jamspace";
  return client.db(dbName).collection("leads");
}

