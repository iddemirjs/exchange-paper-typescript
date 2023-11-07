import {
    AllowNull,
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    HasOne,
    Model,
    Table
} from "sequelize-typescript";
import {PaperTrade} from "./PaperTrade";
import {User} from "./User";

@Table({
    tableName: Paper.VAR_TABLE_NAME
})
export class Paper extends Model {
    public  static  VAR_TABLE_NAME = "paper" as string;
    public  static  VAR_ID = "paper_id" as string;
    public  static  VAR_NAME = "paper_name" as string;
    public  static  VAR_CODE = "paper_code" as string;
    public  static  VAR_PRICE = "paper_price" as string;

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Paper.VAR_ID
    })
    id!:number;

    @Column({
        type: DataType.STRING,
        field: Paper.VAR_NAME
    })
    name!:string;

    @Column({
        type: DataType.STRING,
        field: Paper.VAR_CODE,
        unique: true,
        validate: {
            len: {
                args: [3,10],
                msg: "String length is not in this range"
            },
            is: {
                args: ["^[A-Z]+$", 'i'],
                msg: "Only letters allowed"
            }
        }
    })
    code!:string;

    @Column({
        type: DataType.FLOAT,
        field: Paper.VAR_PRICE,
        allowNull: false
    })
    price!:number;

    @HasMany(() => PaperTrade, {foreignKey: "paperId"})
    paperTrades?: PaperTrade[]

    @BelongsTo(() => User,'ownerId')
    owner!:User;

    @ForeignKey(() => User)
    @Column
    ownerId!: number;

}
