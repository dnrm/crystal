import { createContext, useContext } from "react";
import useSwr from "swr";

const UserContext = createContext({});

const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());

export function UserWrapper({ children }: any) {
  let { data, error } = useSwr("/api/get-user", fetcher);

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  return useContext(UserContext);
}
