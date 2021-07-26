import { NextApiRequest, NextApiResponse } from "next";
import { S3 } from "aws-sdk";
import { randomUUID } from 'crypto'

export const config = {
    api: {
        bodyParser: false,
    },
};

const s3 = new S3();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const post = await s3.createPresignedPost(
        {
            Bucket: process.env.S3_BUCKET,
            Fields: {
                // @ts-ignore
                key: `${randomUUID()}.${req?.query?.file?.split('.')[1]}`,
            },
            Expires: 60,
            Conditions: [["Content-Length-Range", 0, 5242880]],
        },
        function (err, data) {
            if (err) {
                console.error("Presigning post data encountered an error", err);
            } else {
                console.log("The post data is", data);
            }
        }
    );

    console.log(post);
    res.status(200).send(post);
};
