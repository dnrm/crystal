import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await fetch('https://api.medina.dev/v1/usernames');
    const usernames = await response.json();
    res.send(usernames);
}