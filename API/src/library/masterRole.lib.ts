import { initMasterRoleModel } from "./models/masterRole";

export async function fetchMasterRoles(
    queryData = {},
    attributes = [
      "master_role_id",
      "role_name",
    ]
  ) {
    try {
      const masterRole = await initMasterRoleModel();
      const masterRoleList = await masterRole.findAll({
        where: queryData,
        attributes,
        raw:true
      });
      return masterRoleList;
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }