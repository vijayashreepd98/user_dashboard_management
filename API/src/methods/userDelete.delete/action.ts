import { deleteUser, getUserDetail } from "../../library/user.lib";
import { RESPONSE } from "../../global/response";

class UserDeleteAction {
  async executeMethod(payload: { [key: string]: number }) {
    try {
      const { user_id } = payload;

      if (!user_id && user_id != 0) {
        return {
          responseCode: RESPONSE["MANDATORY_PARAMETER"].responseCode,
          responseMessage:
            `user_id ` + RESPONSE["MANDATORY_PARAMETER"].responseMessage,
          responseData: {},
        };
      }
      let user = await getUserDetail(user_id);
      if (!user) {
        return {
          responseCode: RESPONSE["USER_NOT_FOUND"].responseCode,
          responseMessage: RESPONSE["USER_NOT_FOUND"].responseMessage,
          responseData: {},
        };
      }

      const deletedUser = await deleteUser({ user_id: user_id });

      if (deletedUser)
        return {
          responseCode: RESPONSE[`SUCCESS`].responseCode,
          responseMessage: RESPONSE[`SUCCESS`].responseMessage,
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

export default UserDeleteAction;
