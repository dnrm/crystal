import middleware from "../../middleware/middleware";
import nextConnect from "next-connect";
import cloudinary from "cloudinary";

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req: any, res: any) => {
  console.log(req.files);
  console.log(req.files.image[0].path);

  cloudinary.v2.uploader.upload(
    req.files.image[0].path,
    function (error: any, result: any) {
      if (error) {
        return res.statusCode(500);
      }
      return res.send(result);
    }
  );
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
