import {Column, Model, Table, DataType, BelongsToMany, HasMany, HasOne, Default} from "sequelize-typescript";
import {PaperTrade} from "./PaperTrade";
import {Paper} from "./Paper";


@Table({
    tableName: User.VAR_TABLE_NAME,
})
export class User extends Model {
    public  static  VAR_TABLE_NAME = "users" as string;
    public  static  VAR_ID = "id" as string;
    public  static  VAR_NAME = "name" as string;
    public  static  VAR_PASSWORD = "password" as string;
    public  static  VAR_EMAIL = "email" as string;
    public  static  VAR_USERNAME = "username" as string;
    public  static  VAR_ROLE = "role" as string;
    public  static  VAR_BALANCE = "balance" as string;

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: User.VAR_ID,
    })
    id!:number;

    @Column({
        type: DataType.STRING(100),
        field: User.VAR_NAME
    })
    name!:string;

    @Column({
        type: DataType.STRING(100),
        field: User.VAR_PASSWORD
    })
    password!:string;

    @Column({
        type: DataType.STRING(100),
        field: User.VAR_EMAIL
    })
    email!:string;

    @Column({
        type: DataType.STRING(100),
        field: User.VAR_USERNAME
    })
    username!:string;

    @Column({
        type: DataType.INTEGER,
        field: User.VAR_ROLE,
        defaultValue: 1
    })
    role!:number;

    @Column({
        type: DataType.FLOAT,
        field: User.VAR_BALANCE,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0,
            isDecimal: true
        }
    })
    balance!:number;

    @HasMany(() => PaperTrade,{foreignKey:'buyerId'} )
    bought?: PaperTrade[] | null;

    @HasMany(() => PaperTrade,{foreignKey:'sellerId'} )
    sold?: PaperTrade[] | null;

    @HasOne(() => Paper, {foreignKey:'ownerId'})
    paper?: Paper;

}
