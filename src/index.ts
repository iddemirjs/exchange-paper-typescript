import express, {Application, Request, Response} from "express";
import {sequelize} from "./config/database";
import NoteRouter from "./router/NoteRouter";
import AuthenticationRouter from "./router/AuthenticationRouter";
import fileUpload from "express-fileupload";
import UserRouter from "./router/UserRouter";
import TradeRouter from "./router/TradeRouter";
import PaperRouter from "./router/PaperRouter";

class App{
    public app: Application;

    constructor() {
        this.app = express();
        this.databaseSync();
        this.plugins();
        this.routes();
    }

    protected routes(): void {
        this.app.route("/").get((req: Request, res: Response) => {
            res.send("welcome idris");
        });

        this.app.use("/api/v1/note", NoteRouter);
        this.app.use("/api/v1/auth", AuthenticationRouter);
        this.app.use("/api/v1/user", UserRouter);
        this.app.use("/api/v1/trade", TradeRouter);
        this.app.use("/api/v1/paper", PaperRouter);
    }

    protected databaseSync(): void {
        const db = sequelize;
        sequelize?.sync();
    }

    // add plugin
    protected plugins(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(fileUpload({ useTempFiles: true }));
    }
}
const port: number = 8000;
const app: Application = new App().app;

app.listen(port, () => {
   console.log("App is running... 🏃🏻");
});

