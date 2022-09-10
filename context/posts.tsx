import useSwr from "swr";
import { PostType } from "../types/Post";
import { createContext, useContext } from "react";

interface PostsContextType {
  data: PostType[];
}

const PostsContext = createContext<Array<PostType> | null>(null);

const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());

export function PostsWrapper({ children }: any) {
  let { data, error } = useSwr("/api/posts", fetcher);

  return <PostsContext.Provider value={data}>{children}</PostsContext.Provider>;
}

export function usePostsContext() {
  return useContext(PostsContext);
}
