import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb-old";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "mongodb";
import { authOptions } from "../auth/[...nextauth]";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const session = await getServerSession(req, res, authOptions);

  if (!req.query.id) {
    return res.status(400).send("No ID provided");
  }

  const id: string = req.query.id.toString();

  if (session && session.user) {
    try {
      const posts = await db
        .collection("posts")
        .deleteOne({ _id: new ObjectId(id) });
      res.status(200).send(posts);
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(403).send({ message: "Not logged in" });
  }
};
