import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { connectToDatabase } from "../../lib/mongodb-old";
import { ObjectId } from "mongodb";
import { authOptions } from "./auth/[...nextauth]";
import { Session } from "next-auth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();

  if (req.method != "POST") {
    return res.status(400).send({
      message: "Should be POST request.",
    });
  }

  const session: Session = await getServerSession(req, res, authOptions);

  if (req.body.content && req.body.title && session) {
    const response = await db.collection("posts").updateOne(
      { _id: new ObjectId(req.body.id) },
      {
        $set: {
          author: session.user.email,
          title: req?.body?.title,
          content: req?.body?.content,
          src: req?.body?.src,
        },
      }
    );
    return res.status(200).send(response);
  } else {
    return res.status(400).send({
      message:
        "Make sure all fields were provided (title, content) and that you're logged in.",
    });
  }
};

export default handler;
