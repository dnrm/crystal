import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../lib/mongodb-old";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();

  if (req.method != "POST") {
    return res.status(400).send({
      message: "Should be POST request.",
    });
  }

  const session = await getSession({ req });

  if (req.body.content && req.body.title && session) {
    const response = await db.collection("posts").insert({
      author: session?.user?.email,
      title: req?.body?.title,
      content: req?.body?.content,
      src: req?.body?.src,
    });
    return res.status(200).send(response);
  } else {
    return res.status(400).send({
      message:
        "Make sure all fields were provided (title, content) and that you're logged in.",
    });
  }
};
