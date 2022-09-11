import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb-old";
import { ObjectId } from "bson";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();

  if (!req.query.id) {
    return res.status(400).send("No ID provided");
  }

  const id: string = req.query.id.toString();

  const post = await db
    .collection("posts")
    .find({ _id: new ObjectId(id) })
    .toArray();

  res.send(post[0]);
};
