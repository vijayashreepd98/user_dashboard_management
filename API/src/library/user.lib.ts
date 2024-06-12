import { DEFAULT_PAGE_LIMIT } from "../global/constant";

const { initUserModel } = require(`./models/user`);

export async function createUser(userData: {
  [key: string]: string | Array<string>;
}) {
  try {
    const user = await initUserModel();
    const userDetail = await user.create(userData);
    return userDetail;
  } catch (e) {
    throw new Error((e as Error).message);
  }
}

export async function fetchUserList(
  queryData = {},
  page = 1,
  limit = DEFAULT_PAGE_LIMIT,
  attributes = [
    "user_id",
    "name",
    "user_name",
    "avatar",
    "is_active",
    "master_role_id",
    "email",
    "teams",
  ]
) {
  try {
    const user = await initUserModel();
    const { rows: userList, count: userCount } = await user.findAndCountAll({
      where: queryData,
      attributes,
      limit,
      raw: true,
      offset: (page - 1) * limit,
      order: [["user_id", "asc"]],
    });
    const totalUsers = await user.count();
    return { userList, userCount, totalUsers };
  } catch (e) {
    throw new Error((e as Error).message);
  }
}

export async function getUserDetail(
  userId: number,
  attributes = [
    "user_id",
    "name",
    "user_name",
    "avatar",
    "is_active",
    "master_role_id",
    "email",
    "teams",
  ]
) {
  try {
    const user = await initUserModel();
    const userDetail = await user.findOne({
      where: { user_id: userId },
      attributes,
    });
    return userDetail;
  } catch (e) {
    throw new Error((e as Error).message);
  }
}

export async function updateUser(
  queryData: { [key: string | number]: string | Array<string> | number },
  updatedData: { [key: string]: string | number }
) {
  try {
    const User = await initUserModel();
    const [numberOfAffectedRows, updatedRows] = await User.update(updatedData, {
      where: queryData,
      returning: true,
    });

    // Extract only the dataValues from the updated rows
    const [updatedDataValues] = updatedRows.map(
      (row: { [key: string]: string | Array<string> }) => row.dataValues
    );

    return updatedDataValues;
  } catch (e) {
    throw new Error((e as Error).message);
  }
}

export async function deleteUser(queryData: {
  [key: string]: string | Array<string> | number;
}) {
  try {
    const User = await initUserModel();
    return await User.destroy({
      where: queryData,
      returning: true,
      // This option makes Sequelize return the updated rows
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
}

export async function deleteAllUser() {
  try {
    const User = await initUserModel();
    return await User.destroy({
      truncate: true,
      returning: true,
      // This option makes Sequelize return the updated rows
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
}
export async function deleteUsersByIds(queryData: {
  user_id: { [key: string]: Array<number> };
}) {
  try {
    const User = await initUserModel();
    return await User.destroy({
      where: queryData,
      returning: true,
      // This option makes Sequelize return the updated rows
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
}
