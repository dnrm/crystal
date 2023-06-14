import { createRouter } from "next-connect";
import multiparty from "multiparty";

const router = createRouter();

router.use(async (req: any, res: any, next: any) => {
  const form = new multiparty.Form();

  await form.parse(req, function (err: any, fields: any, files: any) {
    req.body = fields;
    req.files = files;
    next();
  });
});

export default router;
