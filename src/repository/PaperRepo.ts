import {User} from "../models/User";
import {Paper} from "../models/Paper";
import {ValidationError} from "sequelize";



interface IPaperRepo {
    save(paper:Paper):Promise<Paper|void>
    update(paper:Paper):Promise<void>
    delete(paperId:number):Promise<void>
    getById(paperId:number):Promise<Paper | null>
    getAll():Promise<Paper[]>
    findByCode(code:string): Promise<Paper | null>
}

export class PaperRepo implements IPaperRepo {
    async delete(paperId: number): Promise<void> {
        return Promise.resolve(undefined);
    }

    async findByCode(code: string): Promise<Paper | null> {
        return Promise.resolve(null);
    }

    async getAll(): Promise<Paper[]> {
        try {
            return await Paper.findAll({
                include: [
                    { all: true , nested: true}
                ]
            });
        } catch (e) {
            throw new Error("Failed to getting all note!");
        }
    }

    async getById(paperId: number): Promise<Paper | null> {
        try {
            return await Paper.findByPk(paperId, {include:[{all: true, nested: true}]});
        } catch (e) {
            throw new Error("Failed to fetch a paper");
        }
    }

    async save(paper: Paper): Promise<Paper | void> {
        try {
            const newPaper = await Paper.create({
                name: paper.name,
                code: paper.code,
                price: paper.price
            });
            const paperOwner = new User({
                name: paper.name,
                username: paper.code,
                role: 2
            });
            const newPaperOwner = await paperOwner.save();
            newPaper.ownerId = newPaperOwner.id;
            return await newPaper.save();
        } catch (validationError: ValidationError | any ) {
            throw validationError;
        }
    }

    async update(paper: Paper): Promise<void> {
        return Promise.resolve(undefined);
    }

}
