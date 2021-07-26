import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import * as q from "faunadb";
import { Client } from "faunadb";

const client = new Client({
    secret: process?.env?.FAUNA || "",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method != 'POST') {
        return res.status(400).send({
            message: 'Should be POST request.'
        })
    }

    const session = await getSession({ req });
    console.log(req.body);
    console.log(session);

    if (req.body.content && req.body.title && session) {
        const response = await client.query(
            q.Create(q.Collection("posts"), {
                data: {
                    author: session?.user?.email,
                    title: req?.body?.title,
                    content: req?.body?.content,
                },
            })
        );
        console.log(response)
        return res.status(200).send(response)
    } else {
        return res.status(400).send({
            message: "Make sure all fields were provided (title, content) and that you're logged in."
        })
    }
};
