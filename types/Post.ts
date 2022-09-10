import { ObjectId } from "bson";
type viewMode = "feed" | "dashboard";

export interface PostType {
  src?: ObjectId;
  title: string;
  layout: string;
  content: string;
  id: string;
  mode?: viewMode;
}
