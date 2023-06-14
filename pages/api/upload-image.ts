import middleware from "../../middleware/middleware";
import { createRouter } from "next-connect";
import cloudinary from "cloudinary";

const router = createRouter();

router.use(middleware);

router.post(async (req: any, res: any) => {
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

export default router.handler();
