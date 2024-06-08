import { fetchUserList } from "../../library/user.lib";
import { RESPONSE } from "../../global/response";
import { Op } from "sequelize";
import { fetchMasterRoles } from "../../library/masterRole.lib";

class UserListAction {
  async executeMethod(payload: {
    limit: number;
    page: number;
    search_text: string;
  }) {
    try {
      const { limit, page, search_text } = payload;
      let queryData = {};
      if (search_text) {
        var masterRoleIds = (
          await fetchMasterRoles(
            { role_name: { [Op.like]: `%${search_text}%` } },
            ["master_role_id"]
          )
        ).map((role: any) => Number(role.master_role_id));
        queryData = {
          [Op.or]: [
            { name: { [Op.like]: `%${search_text}%` } },
            { user_name: { [Op.like]: `%${search_text}%` } },
            { email: { [Op.like]: `%${search_text}%` } },
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
        responseCode: 200,
        responseMessage: (e as Error).message,
        responseData: {},
      };
    }
  }
}

export default UserListAction;
