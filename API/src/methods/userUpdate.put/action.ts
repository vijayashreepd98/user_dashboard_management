import { getUserDetail, updateUser } from "../../library/user.lib";
import { RESPONSE } from "../../global/response";

class UserUpdateAction {
  async executeMethod(payload: {user_id:number, user_name:string,email:string,master_role_id:number}) {
    try {
      const { user_id, user_name, email, master_role_id } = payload;
      if (!user_id) {
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

      let updateData: any = {};
      if (user_name) updateData.user_name = user_name;
      if (email) updateData.email = email;
      if (master_role_id) updateData.master_role_id = master_role_id;
      const updatedUser = await updateUser({ user_id: user_id }, updateData);
      console.log(updatedUser);
      return {
        responseCode: RESPONSE[`SUCCESS`].responseCode,
        responseMessage: RESPONSE[`SUCCESS`].responseMessage,
        responseData: {
          user_id: updatedUser.user_id,
          user_name:updatedUser.user_name,
          role: updatedUser.role,
          email: updatedUser.email,
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

export default UserUpdateAction;
