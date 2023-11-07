import {Model, Sequelize} from "sequelize-typescript";
import * as dotenv from "dotenv";
import {User} from "../models/User";
import {Note} from "../models/Note";
import {Paper} from "../models/Paper";
import {PaperTrade} from "../models/PaperTrade";

dotenv.config();

class Database {
    public sequelize: Sequelize | undefined;

    private POSTGRES_DB = process.env.POSTGRES_DB as string;
    private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
    private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
    private POSTGRES_USER = process.env.POSTGRES_USER as string;
    private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;

    constructor() {
        this.connectToPostgreSQL();
    }

    private async connectToPostgreSQL() {
        this.sequelize = new Sequelize(this.POSTGRES_DB, this.POSTGRES_USER, this.POSTGRES_PASSWORD, {
            database: this.POSTGRES_DB,
            dialect: "postgres",
            host: this.POSTGRES_HOST,
            port: this.POSTGRES_PORT,
            username: this.POSTGRES_USER,
            models: [User, Note, Paper, PaperTrade]
        });
        await this.sequelize.authenticate().then(() => {
            console.log("Successfully... 🗄️");
        }).then(() => {
            //this.bulkCreation();
        }).catch((err) => {
            console.log("Database connection failed!!! ❌")
        });
    }

    private async bulkCreation() {
        await User.sync({force: true}).then(async () => {
            return await User.bulkCreate([
                {
                    name: "PaperCreator",
                    password: "$2b$10$K/5eoCD3fLhGD7NI8qTh8eZ8WTZngbRmA/QsXovA3FtT4Zw9IKANa",
                    email: "Brock.Kovacek@yahoo.com",
                    username: "Lauretta.Hilpert26",
                    role: 2
                },
                {
                    name: "Cleve",
                    password: "$2b$10$K/5eoCD3fLhGD7NI8qTh8eZ8WTZngbRmA/QsXovA3FtT4Zw9IKANa",
                    email: "Rex25@gmail.com",
                    username: "Danielle98",
                    role: 1
                },
                {
                    name: "Miller Group",
                    password: "$2b$10$K/5eoCD3fLhGD7NI8qTh8eZ8WTZngbRmA/QsXovA3FtT4Zw9IKANa",
                    email: "Arne84@hotmail.com",
                    username: "Carolyne.Toy45",
                    role: 1
                },
                {
                    name: "Romaguera, Mertz and Weber",
                    password: "$2b$10$K/5eoCD3fLhGD7NI8qTh8eZ8WTZngbRmA/QsXovA3FtT4Zw9IKANa",
                    email: "Bradly.Pfeffer@gmail.com",
                    username: "Carolyne",
                    role: 1
                },
                {
                    name: "Gutmann, Boehm and Runolfsson",
                    password: "$2b$10$K/5eoCD3fLhGD7NI8qTh8eZ8WTZngbRmA/QsXovA3FtT4Zw9IKANa",
                    email: "random@gmail.com",
                    username: "RandomUser12",
                    role: 1
                }
            ]);
        });
        await Paper.sync({force: true}).then(async () => {
            return await Paper.bulkCreate([
                {paper_code: 'JHYK', paper_price: 12.32, owner_id: 1, paper_name: 'Ruecker Group'},
                {paper_code: 'QZFY', paper_price: 3.12, owner_id: 1, paper_name: 'Romaguera, Mertz and Weber'},
                {paper_code: 'IJIZJ', paper_price: 5.02, owner_id: 1, paper_name: 'Gutmann, Boehm and Runolfsson'},
                {paper_code: 'JEYF', paper_price: 1.52, owner_id: 1, paper_name: 'Windler, Adams and Wunsch'},
                {paper_code: 'XVYBQ', paper_price: 23.82, owner_id: 1, paper_name: 'Miller Group'}
            ]);
        });
    }

}

const database = new Database();
export const sequelize = database.sequelize;
