import { getRequest } from "./core";

const fetchRoleList = async () => {
  const userList = await getRequest("roles");
  return userList;
};

export { fetchRoleList };
