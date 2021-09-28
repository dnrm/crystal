import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "bson";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const id: string = req.query.id.toString();

  const post = await db
    .collection("posts")
    .find({ _id: new ObjectId(id) })
    .toArray();

  res.send(post[0]);
};
