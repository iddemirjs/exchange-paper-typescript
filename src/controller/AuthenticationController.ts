import {Request, Response} from "express";
import {AuthenticationService} from "../service/Authentication";
import Authentication from "../utils/Authentication";
import {User} from "../models/User";
import {UserRepo} from "../repository/UsersRepo";

class AuthenticationController {
    async login(req: Request, res: Response){
        try{
            const {email, password} = req.body;
            const token = await new AuthenticationService().login(email, password);

            if (token==="") {
                return res.status(400).json({
                    status: "Bad Request : 400DC",
                    message: "Wrong email or password"
                });
            }

            const resToken = {
                type: "Bearer",
                token: token,
                username: "",
                email: ""
            }
            const user : User | null = await new UserRepo().findByEmail(email);

            if (user){
                resToken.username = user.username;
                resToken.email = user.email;
            }
            return res.status(200).json({
                status: "OK",
                message: "Login is successfully.",
                result: resToken
            });
        } catch (e) {
            return res.status(404).json({
                status: "Internal Server Error : 500DC",
                message: e
            });
        }
    }

    async register(req: Request, res: Response) {
        try {
            const {email, password, username, name, balance} = req.body;
            await new AuthenticationService().register(email, password, name, username, balance);
            return res.status(200).json({
                status: "OK",
                message: "Registration is successfully."
            });
        } catch (e) {
            return res.status(400).json({
                status: 400,
                message: "This user already registered with this email"
            });
        }
    }
}

export default new AuthenticationController();
