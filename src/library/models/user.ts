import { DataTypes, Model } from "sequelize";

const { sequelize } = require(`../../dbConnect/connect`);

interface UserModelAttributes {
  user_id: number;
  name: string;
  user_name: string;
  master_role_id: number;
  avatar: string;
  is_active: boolean;
  email: string;
  teams: Array<string>;
  current_time: Date;
}

class UserModel extends Model<UserModelAttributes> {}

let userModel: typeof UserModel;

const initUserModel = async () => {
  if (userModel) return userModel;

  userModel = sequelize.define(
    `users`,
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      master_role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      teams: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      current_time: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
      },
    },
    {
      freezeTableName: true,
    }
  );
  await userModel.sync({ alter: true });
  return userModel;
};

export { initUserModel };
