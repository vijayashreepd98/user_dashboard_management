import { useEffect, useState } from "react";
import { RoleContext } from "./ContextData";
import { fetchRoleList } from "../apis/role";

const RoleContextProvider = ({ children }: { children: JSX.Element }) => {
  const [roleList, setRoleList] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<{
    is_error: boolean;
    error_message: string;
  }>({
    is_error: false,
    error_message: "",
  });

  const loadRoleList = async () => {
    try {
      const roles = await fetchRoleList();
      const updatedRoles = roles.master_roles.reduce(
        (acc: { [x: string]: string }, obj: { [s: string]: string }) => {
          const [key1, key2] = Object.values(obj);
          acc[key1] = key2;
          return acc;
        },
        {}
      );

      console.log(updatedRoles);
      setRoleList(updatedRoles);
      setIsLoading(false);
    } catch (e) {
      setError({ is_error: true, error_message: (e as Error).message });
    }
  };
  useEffect(() => {
    loadRoleList();
  }, []);

  return (
    <RoleContext.Provider value={{ roleList, isLoading, error }}>
      {children}
    </RoleContext.Provider>
  );
};

export default RoleContextProvider;
