import { deleteRequest, getRequest, putRequest } from "./core";

const fetchUserList = async (payload?:any ) => {
  const userList = await getRequest("members", payload);
  return userList;
};

const getUserDetail = async (userId: number) => {
  const userDetail = await getRequest(`members/${userId}`);
  return userDetail;
};

const deleteUser = async (userId: number | string) => {
  return await deleteRequest(`members/delete/${userId}`);
};

const deleteUsersById = async (payload: any) => {
  return await deleteRequest(`members/delete`, payload);
};
const updateUser = async (updateData: { [key: string]: any }) => {
  return await putRequest(`members/update`, updateData);
};

export {
  fetchUserList,
  getUserDetail,
  deleteUser,
  deleteUsersById,
  updateUser,
};
