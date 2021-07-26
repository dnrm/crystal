import type { NextApiRequest, NextApiResponse } from "next";
import { S3 } from 'aws-sdk'
const multer = require('multer');

const upload = multer({
    dest: 'images'
})

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '2mb',
        }
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.body)
    try {
        const s3 = new S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        })

        const params = {
            Bucket: 'dnrm-crystal',
            Key: `hi`,
            ACL: 'public-read',
            Body: req.body
        }

        s3.upload(params, (err: any, data: any) => {
            console.log(err)
            console.log(data)
        })

        res.send(200)
    } catch (e) {
        console.log(e)
        res.send(e)
    }
};
