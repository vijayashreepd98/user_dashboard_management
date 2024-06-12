import { Dispatch, SetStateAction, createContext } from "react";

const UserContext = createContext<{
  userData: {
    user_list: Array<object>;
    user_count: number;
    total_user_count: number;
  };
  error: {
    is_error: boolean;
    error_message: string;
  };
  isLoading: boolean;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  setSearchText: Dispatch<SetStateAction<string>>;
  checkboxIds: Array<number>;
  setCheckboxIds: Dispatch<SetStateAction<Array<number>>>;
  forceLoad: () => void;
}>({
  userData: { user_list: [], user_count: 0, total_user_count: 0 },
  error: {
    is_error: false,
    error_message: "",
  },
  isLoading: true,
  setCurrentPage: () => {},
  currentPage: 1,
  setSearchText: () => {},
  checkboxIds: [],
  setCheckboxIds: () => {},
  forceLoad: () => {},
});

const ModelContext = createContext<{
  isModelOpen: boolean;
  setIsModelOpen:  Dispatch<SetStateAction<boolean>>;
}>({
  isModelOpen: false,
  setIsModelOpen: () => {},
});

const RoleContext = createContext<{
  roleList: {};
  error: {
    is_error: boolean;
    error_message: string;
  };
  isLoading: boolean;
}>({
  roleList: [],
  error: {
    is_error: false,
    error_message: "",
  },
  isLoading: true,
});

export { UserContext, ModelContext, RoleContext };
