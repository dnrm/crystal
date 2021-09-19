import { createContext, useContext } from "react";
import useSwr from "swr";

const PostsContext = createContext({});

const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());

export function PostsWrapper({ children }: any) {
  let { data, error } = useSwr("/api/posts", fetcher);

  return <PostsContext.Provider value={data}>{children}</PostsContext.Provider>;
}

export function usePostsContext() {
  return useContext(PostsContext);
}
