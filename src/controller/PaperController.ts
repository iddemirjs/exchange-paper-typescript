import {Request, Response} from "express";
import {User} from "../models/User";
import {UserRepo} from "../repository/UsersRepo";
import {Paper} from "../models/Paper";
import {ValidationError} from "sequelize";
import {PaperRepo} from "../repository/PaperRepo";


class PaperController {
    async create(req: Request, res: Response) {
        const sessionUser = req.app.locals.credential;
        const targetUser = await new UserRepo().getById(sessionUser.userId);
        if (!targetUser || targetUser!.role <= 1){
            return res.status(500).json({
                success: false,
                message: "Your session may be expired or your role does not enough for this request."
            });
        }
        const paperExample = new Paper(req.body);
        try {
            const latest = await new PaperRepo().save(paperExample);
            res.status(200).json({success: true, result: latest});
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e instanceof ValidationError ? e.errors: 'Bad request'
            })
        }
    }

    async list(req: Request, res: Response) {
        const papers = await new PaperRepo().getAll();
        return res.status(200).json({
            result : true,
            papers : papers
        });
    }
}

export default new PaperController();
