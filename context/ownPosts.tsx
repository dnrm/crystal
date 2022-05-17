import { createContext, useContext } from "react";
import useSwr from "swr";

const PostsContext = createContext({});

const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());

export function OwnPostsWrapper({ children }: any) {
  let { data, error } = useSwr("/api/own-posts", fetcher);

  return <PostsContext.Provider value={data}>{children}</PostsContext.Provider>;
}

export function useOwnPostsContext() {
  return useContext(PostsContext);
}
