import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "bson";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  console.log(req.query.id);

  const post = await db
    .collection("posts")
    .find({ "_id": new ObjectId(req.query.id)})
    .toArray()

  res.send(post[0]);
};
