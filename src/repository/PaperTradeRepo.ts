import {PaperTrade} from "../models/PaperTrade";
import {Paper} from "../models/Paper";
import {User} from "../models/User";


interface IPaperTradeRepo {
    save(trade:PaperTrade):Promise<void>
    update(trade:PaperTrade):Promise<void>
    delete(tradeId:number):Promise<void>
    getById(tradeId:number):Promise<PaperTrade | null>
    getAll():Promise<PaperTrade[]>
    findAllBySeller(sellerId:number): Promise<PaperTrade[] | null>
    findAllByBuyer(buyerId:number): Promise<PaperTrade[] | null>
    findAllByPaperId(paperId:number): Promise<PaperTrade[] | null>
}

export class PaperTradeRepo implements IPaperTradeRepo {
    async delete(tradeId: number): Promise<void> {
        return Promise.resolve(undefined);
    }

    async findAllByBuyer(buyerId: number): Promise<PaperTrade[] | null> {
        try {
            return await PaperTrade.findAll({where: {buyer_id: buyerId}});
        } catch (e) {
            throw new Error("Failed to fetch all trades");
        }
    }

    async findAllByPaperId(paperId: number): Promise<PaperTrade[] | null> {
        try {
            return await PaperTrade.findAll({where: {paper_id: paperId}});
        } catch (e) {
            throw new Error("Failed to fetch all trades");
        }
    }

    async findAllBySeller(sellerId: number): Promise<PaperTrade[] | null> {
        try {
            return await PaperTrade.findAll({where: {seller_id: sellerId}});
        } catch (e) {
            throw new Error("Failed to fetch all trades");
        }
    }

    async getAll(): Promise<PaperTrade[]> {
        try {
            return await PaperTrade.findAll();
        } catch (e) {
            throw new Error("Failed to fetch all user");
        }
    }

    async getById(tradeId: number): Promise<PaperTrade | null> {
        try {
            return await PaperTrade.findByPk(tradeId,
                {
                    include: [
                        { all: true , nested: true}
                    ]
                }
            );
        } catch (e) {
            throw new Error("Failed to fetch all user");
        }
    }

    async save(trade: PaperTrade): Promise<void> {
        return Promise.resolve(undefined);
    }

    async update(trade: PaperTrade): Promise<void> {
        return Promise.resolve(undefined);
    }


}
