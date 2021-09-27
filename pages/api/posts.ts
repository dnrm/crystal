import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from '../../lib/mongodb' 

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase()

  const posts = await db.collection('posts').find({}).toArray()

  res.send(posts);
};
