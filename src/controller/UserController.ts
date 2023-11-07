import { Request, Response} from "express";
import {User} from "../models/User";
import {UserRepo} from "../repository/UsersRepo";
import Authentication from "../utils/Authentication";

class UserController {
    async update(req: Request, res: Response) {
        try {
            const userInstance = new User(req.body);
            const sessionUser = req.app.locals.credential;
            const targetUser = await new UserRepo().getById(sessionUser.userId);
            if (!targetUser){
                return res.status(500).json({
                    success: false,
                    message: "Your session may be expired"
                });
            }

            userInstance.id = sessionUser.userId;
            userInstance.username = userInstance.username ? userInstance.username : targetUser!.username;
            userInstance.name = userInstance.name ? userInstance.name : targetUser!.name;
            userInstance.email = userInstance.email ? userInstance.email :targetUser!.email;
            userInstance.password = userInstance.password ? await Authentication.passwordHash(userInstance.password) : targetUser!.password;
            userInstance.role = userInstance.role && targetUser.role > 1 ? userInstance.role : targetUser!.role;
            await new UserRepo().update(userInstance);

            return res.status(200).json({
                status: "OK",
                message: "Update is successfully.",
                result: {
                    username: userInstance.username,
                    name: userInstance.name,
                    email: userInstance.email
                }
            });
        }catch (e) {
            throw new Error("User not edited.");
        }
    }
    async portfolio(req: Request, res: Response) {
        try {
            const userInstance = new User(req.body);
            const sessionUser = req.app.locals.credential;
            const targetUser = await new UserRepo().getById(sessionUser.userId);
            if (!targetUser){
                return res.status(500).json({
                    success: false,
                    message: "Your session may be expired"
                });
            }

            const userPortfolio = await new UserRepo().portfolio(targetUser.id);

            return res.status(200).json({
                status: true,
                message: "Request is successfully.",
                result: userPortfolio
            });
        }catch (e) {
            throw new Error("User not edited.");
        }
    }
}
export default new UserController();
