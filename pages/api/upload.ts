import nextConnect from "next-connect";
import middleware from '../../middleware/middleware'

export const config = {
    api: {
        bodyParser: false
    }
}

const handler = nextConnect()

handler.use(middleware)

handler.post(async (req: any, res: any) => {
    try {
        const files = req?.files
        const body = req?.body

        console.log(body)
        res.send(body)
    } catch (e) {
        console.log(e)
        res.send(e)
    }
})