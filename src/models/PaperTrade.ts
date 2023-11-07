import {AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {Paper} from "./Paper";
import {User} from "./User";

@Table({
    tableName: PaperTrade.VAR_TABLE_NAME
})
export class PaperTrade extends Model {
    public static VAR_TABLE_NAME = "trade" as string;
    public static VAR_ID = "trade_id" as string;

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: PaperTrade.VAR_ID
    })
    id!:number;

    @AllowNull(false)
    @Column
    quantity!: number;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    transactionTimePrice!:number;

    @BelongsTo(() => Paper)
    paper!: Paper;

    @ForeignKey(() => Paper)
    @Column
    paperId!: number;

    @BelongsTo(() => User, 'buyerId')
    buyer!:User;

    @ForeignKey(() => User)
    @Column
    buyerId!: number;

    @BelongsTo(() => User,'sellerId')
    seller!:User;

    @ForeignKey(() => User)
    @Column
    sellerId!: number;


}
