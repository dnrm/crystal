import type { NextApiRequest, NextApiResponse } from "next";
import {
    Client,
    Map,
    Paginate,
    Documents,
    Collection,
    Lambda,
    Get,
} from "faunadb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = new Client({ secret: process.env.FAUNA || "" });

    const posts = await client.query(
        Map(
            Paginate(Documents(Collection("posts"))),
            Lambda((x) => Get(x))
        )
    );

    console.log(posts)

    res.send(posts)
};
