import { deleteUsersByIds } from "../../library/user.lib";
import { RESPONSE } from "../../global/response";
import { Op } from "sequelize";
import { json } from "body-parser";

class UserDeleteByIdsAction {
  async executeMethod(payload: { user_ids: string }) {
    try {
      const { user_ids } = payload;

      if (!user_ids) {
        return {
          responseCode: RESPONSE["MANDATORY_PARAMETER"].responseCode,
          responseMessage:
            `user_ids ` + RESPONSE["MANDATORY_PARAMETER"].responseMessage,
          responseData: {},
        };
      }
      const deletedUser = await deleteUsersByIds({
        user_id: { [Op.in]: JSON.parse(user_ids) },
      });
      if (deletedUser)
        return {
          responseCode: RESPONSE[`SUCCESS`].responseCode,
          responseMessage: RESPONSE[`SUCCESS`].responseMessage,
          responseData: {},
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

export default UserDeleteByIdsAction;
