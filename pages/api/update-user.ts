import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { MongoClient } from "mongodb";
import { authOptions } from "./auth/[...nextauth]";

const client = new MongoClient(process.env.MONGODB_URI || "");

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !req.body.username) {
    return res.status(400).send({
      error: "You're missing to log in or to provide the username to set.",
    });
  }

  if (!req.body.username.match(/^[a-zA-Z0-9_]+$/)) {
    return res.status(400).send({
      error: "The username use only letters, numbers and underscores.",
    });
  } else if (req.body.username.length > 21) {
    return res.status(400).send({
      error: "The username must be between 1 and 21 characters long.",
    });
  }

  console.log(req.body);

  const email = session?.user?.email;
  await client.connect();
  let db = await client.db("auth");
  let doc = await db
    .collection("users")
    .findOneAndUpdate(
      { email },
      {
        $set: {
          username: req.body.username,
          name: req.body.name,
          bio: req.body.bio,
        },
      }
    );
  return res.status(200).send(doc);
};
