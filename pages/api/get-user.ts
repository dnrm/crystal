import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { MongoClient } from "mongodb";

const client = new MongoClient(
    process.env.DATABASE_URL || ""
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (!session) {
        return res.status(404).send({
            message: "Not logged in",
        });
    }

    const email = session?.user?.email;
    await client.connect();
    let db = await client.db("auth");
    let doc = await db.collection("users").findOne({ email });
    return res.status(200).send(doc);
};
