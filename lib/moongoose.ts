import mongoose from "mongoose";

declare global {
  // cached mongoose connection for dev hot-reloads
  // eslint-disable-next-line no-var, no-unused-vars
  var _mongoose:
    | { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
    | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGODB_URL;

if (!MONGODB_URI) {
  console.log("mongodb url missing");
}

global._mongoose = global._mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  // avoid buffering commands before connection to fail fast
  mongoose.set("bufferCommands", false);

  if (global._mongoose?.conn) {
    return global._mongoose.conn;
  }

  if (!global._mongoose?.promise) {
    global._mongoose!.promise = mongoose
      .connect(MONGODB_URI as string, { dbName: "devflow" })
      .then((m) => {
        global._mongoose!.conn = m;
        console.log("is connected mongo db");
        return m;
      })
      .catch((err) => {
        global._mongoose!.promise = null;
        console.log("mongo connection error:", err);
        throw err;
      });
  }

  return global._mongoose!.promise;
};
