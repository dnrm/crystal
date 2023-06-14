import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb-old";
import { getSession } from "next-auth/react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const session = await getSession({ req });

  if (session && session.user) {
    const posts = await db
      .collection("posts")
      .find({ author: session.user.email })
      .sort({ _id: -1 })
      .toArray();
    res.send(posts);
  } else {
    res.send({ message: "Not logged in" });
  }
};

export default handler;
