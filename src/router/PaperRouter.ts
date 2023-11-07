import BaseRoutes from "./BaseRouter";
import {auth} from "../middleware/AuthMiddleware";
import PaperController from "../controller/PaperController";

class PaperRoutes extends BaseRoutes {
    routes(): void {
        this.router.post("/create", auth, PaperController.create);
        this.router.get("/list", PaperController.list);
    }
}

export default new PaperRoutes().router;
