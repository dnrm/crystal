import nextConnect from "next-connect";
import parseMultipartForm from "../lib/form-parser";

const middleware = nextConnect();

middleware.use(parseMultipartForm);

export default middleware;
