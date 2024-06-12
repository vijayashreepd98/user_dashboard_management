import { DataTypes, Model } from "sequelize";

const { sequelize } = require(`../../dbConnect/connect`);

interface MasterRoleAttributes {
  master_role_id: number;
  role_name: string;
}

class MasterRoleModel extends Model<MasterRoleAttributes> {
  [x: string]: any;
}

let masterRoleModel: typeof MasterRoleModel;

const initMasterRoleModel = async () => {
  if (masterRoleModel) return masterRoleModel;

  masterRoleModel = sequelize.define(
    `master_roles`,
    {
      master_role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      role_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
  await masterRoleModel.sync({ alter: true });
  return masterRoleModel;
};

export { initMasterRoleModel };
