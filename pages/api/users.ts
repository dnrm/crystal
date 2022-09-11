import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI || "");

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(404).send({
      message: "Not logged in",
    });
  }

  await client.connect();
  let db = await client.db("auth");
  let users = await db.collection("users").find().toArray();
  return res.status(200).send(users);
};
