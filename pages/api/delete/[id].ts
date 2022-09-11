import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb-old";
import { getSession } from "next-auth/react";
import { ObjectID } from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const session = await getSession({ req });

  if (!req.query.id) {
    return res.status(400).send("No ID provided");
  }

  const id: string = req.query.id.toString();

  if (session && session.user) {
    try {
      const posts = await db
        .collection("posts")
        .deleteOne({ _id: ObjectID(id) });
      res.status(200).send(posts);
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.send({ message: "Not logged in" });
  }
};
