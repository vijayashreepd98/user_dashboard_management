import { deleteAllUser, deleteUsersByIds } from "../../library/user.lib";
import { RESPONSE } from "../../global/response";
import { Op } from "sequelize";

class UserDeleteByIdsAction {
  async executeMethod(payload: { user_ids: string; is_delete_all: boolean }) {
    try {
      const { user_ids, is_delete_all = false } = payload;

      if (!user_ids && !is_delete_all) {
        return {
          responseCode: RESPONSE["MANDATORY_PARAMETER"].responseCode,
          responseMessage:
            `user_ids ` + RESPONSE["MANDATORY_PARAMETER"].responseMessage,
          responseData: {},
        };
      }

      let deletedUser;
      if (is_delete_all) {
        deletedUser = await deleteAllUser();
      } else {
        deletedUser = await deleteUsersByIds({
          user_id: { [Op.in]: JSON.parse(user_ids) },
        });
      }
      if (deletedUser)
        return {
          responseCode: RESPONSE[`SUCCESS`].responseCode,
          responseMessage: RESPONSE[`SUCCESS`].responseMessage,
          responseData: {},
        };
      return {
        responseCode: RESPONSE["SOMETHING_WENT_WRONG"].responseCode,
        responseMessage: RESPONSE["SOMETHING_WENT_WRONG"].responseMessage,
        responseData: {},
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

export default UserDeleteByIdsAction;
