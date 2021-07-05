import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await fetch("https://api.medina.dev/v1/usernames");
        const usernames = await response.json();
        res.send(usernames);
    } catch (e) {
        res.send({
            error: e
        })
    }
};
