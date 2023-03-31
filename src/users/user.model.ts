import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement, Unique } from "sequelize-typescript";

@Table({
  tableName: "users",
  charset: "utf8mb4",
  collate: "utf8mb4_unicode_ci",
  timestamps: true,
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userNo: string;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.password;

    return values;
  }
}
