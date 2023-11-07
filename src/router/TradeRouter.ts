import BaseRoutes from "./BaseRouter";
import TradeController from "../controller/TradeController";
import {auth} from "../middleware/AuthMiddleware";

class TradeRoutes extends BaseRoutes {
    routes(): void {
        this.router.post("/buy", auth, TradeController.buy);
        this.router.post("/sell", auth, TradeController.sell);
    }
}

export default new TradeRoutes().router;
