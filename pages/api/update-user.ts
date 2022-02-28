import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI || "");

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (!session || !req.body.username) {
        return res.status(400).send({
            message:
                "You're missing to log in or to provide the username to set.",
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
            { $set: { username: req.body.username, name: req.body.name, bio: req.body.bio } }
        );
    return res.status(200).send(doc);
};
