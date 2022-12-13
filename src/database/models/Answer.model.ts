import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import { v4 } from "uuid";
import { DataTypes } from "sequelize";

@Table
export class Answer extends Model {
  @PrimaryKey
  @Column({ defaultValue: DataTypes.UUIDV4() })
  id: string
  @Column
  content: string;

  @Column({ defaultValue: false })
  isCorrectAnswer: boolean
  @Column
  questionId: string
}
