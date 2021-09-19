import type { NextApiRequest, NextApiResponse } from "next";
import { Client, Collection, Ref, Get } from "faunadb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = new Client({ secret: process.env.FAUNADB_KEY || "" });

  if (req.query.id == 'undefined') {
    return res.status(404)
  }

  const post = await client.query(
    Get(Ref(Collection("posts"), req?.query?.id))
  );

  res.send(post);
};
