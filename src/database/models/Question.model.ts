import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";
@Table
export class Question extends Model {
  @PrimaryKey
  @Column({ defaultValue: DataTypes.UUIDV4() })
  id: string
  @Column
  title: string;
  @Column
  userId: string;
  @Column({ defaultValue: JSON.stringify([])})
  answeredUsers: string
}
