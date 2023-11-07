import {Request, Response} from "express";
import {PaperTradeRepo} from "../repository/PaperTradeRepo";
import {UserRepo} from "../repository/UsersRepo";
import {PaperRepo} from "../repository/PaperRepo";

interface IPaperTransactionRequest {
    paperId: number,
    quantity: number
}

class TradeController {
    async buy(req: Request, res: Response){
        try {

            const sessionUser = req.app.locals.credential;
            const targetUser = await new UserRepo().getById(sessionUser.userId);
            if (!targetUser){
                return res.status(500).json({
                    success: false,
                    message: "Your session may be expired or your role does not enough for this request."
                });
            }

            const paperTradeRequest: IPaperTransactionRequest = req.body;
            try {
                const trade = await new UserRepo().buyPaper(targetUser.id, paperTradeRequest.paperId, paperTradeRequest.quantity);
                return res.status(200).json({
                    status: "OK",
                    message: "Update is successfully.",
                    trade: trade
                });
            } catch (e : Error | any) {
                return res.status(500).json({
                    status: false,
                    message: e?.message
                });
            }
        }catch (e : Error | any) {
            return res.status(500).json({
                status: false,
                message: e?.message
            });
        }
    }
    async sell(req: Request, res: Response){
        try {
            const sessionUser = req.app.locals.credential;
            const targetUser = await new UserRepo().getById(sessionUser.userId);
            if (!targetUser){
                return res.status(500).json({
                    success: false,
                    message: "Your session may be expired or your role does not enough for this request."
                });
            }

            const paperTradeRequest: IPaperTransactionRequest = req.body;
            try {
                const trade = await new UserRepo().sellPaper(targetUser.id, paperTradeRequest.paperId, paperTradeRequest.quantity);
                return res.status(200).json({
                    status: "OK",
                    message: "Update is successfully.",
                    trade: trade
                });
            } catch (e: Error | any) {
                return res.status(500).json({
                    status: false,
                    message: e?.message
                });
            }
        }catch (e: Error | any) {
            return res.status(500).json({
                status: false,
                message: e?.message
            });
        }
    }
}
export default new TradeController();
