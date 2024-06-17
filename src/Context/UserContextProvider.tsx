import { useEffect, useState } from "react";
import { UserContext } from "./ContextData";
import { fetchUserList } from "../apis/user";
import { UserProps } from "../components/TableRow";

const UserContextProvider = ({ children }: { children: JSX.Element }) => {
  const [userData, setUserData] = useState<{
    user_list: Array<UserProps>;
    user_count: number;
    total_user_count: number;
  }>({
    user_list: [],
    user_count: 0,
    total_user_count: 0,
  });
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [checkboxIds, setCheckboxIds] = useState<Array<number>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<{
    is_error: boolean;
    error_message: string;
  }>({
    is_error: false,
    error_message: "",
  });

  let timerId: string | number | NodeJS.Timeout | undefined;

  async function loadUserList(searchData?: string) {
    try {
      let payload: { [x: string]: number | string } = {};
      if (searchData) {
        payload["search_text"] = searchText;
      } else {
        payload["page"] = currentPage;
        payload["limit"] = 10;
      }
      const users = await fetchUserList(payload);
      setUserData({...users});
      // if (isLoading)
      // timerId = setTimeout(() => {
      setIsLoading(false);
      // }, 3000);
    } catch (e) {
      setError({ is_error: true, error_message: (e as Error).message });
    }
  }
  useEffect(() => {
    loadUserList(searchText);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchText, currentPage]);

  return (
    <UserContext.Provider
      value={{
        error,
        isLoading,
        userData,
        setCurrentPage,
        currentPage,
        setSearchText,
        checkboxIds,
        setCheckboxIds,
        forceLoad: loadUserList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
