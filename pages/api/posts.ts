import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from '../../lib/mongodb-old' 
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase()
  const session = await getSession({ req });

  session ? console.log(session) : null

  if (session && session.user) {
    const posts = await db.collection('posts').find({  }).toArray()
    res.send(posts);
  } else {
    res.send({ message: 'Not logged in' })
  }
};
