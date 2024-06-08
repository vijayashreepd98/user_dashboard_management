import { getUserDetail } from "../../library/user.lib";
import { RESPONSE } from "../../global/response";

class UserDetailAction {
  async executeMethod(payload: {user_id:number}) {
    try {
      const { user_id } = payload;
      let user = await getUserDetail(user_id);

      return {
        responseCode: RESPONSE[`SUCCESS`].responseCode,
        responseMessage: RESPONSE[`SUCCESS`].responseMessage,
        responseData: {
          user_detail: user,
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

export default UserDetailAction;
