import { fetchUserList } from "../../library/user.lib";
import { RESPONSE } from "../../global/response";
import { Op } from "sequelize";
import { fetchMasterRoles } from "../../library/masterRole.lib";

class UserListAction {
  async executeMethod(payload: {
    limit?: number;
    page?: number;
    search_text?: string;
  }) {
    try {
      const { limit, page, search_text } = payload;

      let queryData = {};

      if (search_text) {
        let masterRoleIds = (
          await fetchMasterRoles(
            { role_name: { [Op.iLike]: `%${search_text}%` } },
            ["master_role_id"]
          )
        ).map((role: { master_role_id: any; }) => Number(role.master_role_id));

        queryData = {
          [Op.or]: [
            { name: { [Op.iLike]: `%${search_text}%` } },
            { user_name: { [Op.iLike]: `%${search_text}%` } },
            { email: { [Op.iLike]: `%${search_text}%` } },
            { master_role_id: { [Op.in]: masterRoleIds } },
            { teams: { [Op.contains]: [search_text] } },
          ],
        };
      }

      let { userList, userCount, totalUsers } = await fetchUserList(
        queryData,
        page,
        limit
      );

      return {
        responseCode: RESPONSE[`SUCCESS`].responseCode,
        responseMessage: RESPONSE[`SUCCESS`].responseMessage,
        responseData: {
          user_list: userList,
          user_count: userCount,
          total_user_count: totalUsers,
        },
      };
    } catch (e) {
      return {
        responseCode: 500,
        responseMessage: (e as Error).message,
        responseData: {},
      };
    }
  }
}

export default UserListAction;
