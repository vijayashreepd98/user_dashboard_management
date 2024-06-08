import { RESPONSE } from "../../global/response";
import { fetchMasterRoles } from "../../library/masterRole.lib";

class MasterRolesAction {
  async executeMethod() {
    try {
      const masterRoles = await fetchMasterRoles();

      return {
        responseCode: RESPONSE[`SUCCESS`].responseCode,
        responseMessage: RESPONSE[`SUCCESS`].responseMessage,
        responseData: {
          master_roles: masterRoles,
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

export default MasterRolesAction;
