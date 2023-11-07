import {User} from "../models/User";
import {PaperTrade} from "../models/PaperTrade";
import {Paper} from "../models/Paper";
import {PaperRepo} from "./PaperRepo";
import {INTEGER, Op, Transaction} from "sequelize";
import {sequelize} from "../config/database";
import {PaperTradeRepo} from "./PaperTradeRepo";


interface IUsersRepo {
    save(users: User): Promise<void>

    update(user: User): Promise<void>

    delete(userId: number): Promise<void>

    getById(usersId: number): Promise<User | null>

    getAll(): Promise<User[]>

    findByEmail(email: string): Promise<User | null>
}

export class UserRepo implements IUsersRepo {
    async delete(userId: number): Promise<void> {
        try {
            const user = await User.findOne({
                where: {
                    id: userId
                }
            });

            if (!user) {
                throw new Error("Bad Request!");
            }

            await user.destroy();
        } catch (e) {
            throw new Error("Failed to deleting user");
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            return await User.findOne({
                where: {
                    email: email
                }
            });
        } catch (e) {
            throw new Error("Failed to finding user");
        }
    }

    async getAll(): Promise<User[]> {
        try {
            return await User.findAll();
        } catch (e) {
            throw new Error("Failed to fetch all user");
        }
    }

    async getById(usersId: number): Promise<User | null> {
        try {
            const user = await User.findOne({
                where: {
                    id: usersId
                },
                include: [{all: true, nested: true}]
            });

            return user;
        } catch (e) {
            throw new Error("Failed to deleting user");
        }
    }

    async sellableQuantity(usersId: number, paperId: number): Promise<number> {
        try {
            const user = await User.findOne({
                where: {
                    id: usersId
                },
                include: [{all: true, nested: true}]
            });
            const bought = user?.bought?.filter((paperTrade) => {
                return paperTrade.paperId == paperId;
            });
            const sold = user?.sold?.filter((paperTrade) => {
                return paperTrade.paperId == paperId;
            });

            let owned: number = bought ? bought?.map(a => a.quantity).reduce((a, b) => {
                return a + b;
            }) : 0;

            let soldSum: number = sold && sold.length > 0 ? sold?.map(a => a.quantity).reduce((a, b) => {
                return a + b;
            }) : 0;


            return owned - soldSum > 0 ? owned - soldSum : 0;
        } catch (e) {
            throw new Error("Failed to calculating paper amount");
        }
    }

    async sellPaper(userId: number, paperId: number, quantity: number) {
        const user = await this.getById(userId);
        const paper = await new PaperRepo().getById(paperId);
        if (!paper || !user) {
            throw new Error("Bad Request");
        }
        const sellableQuantity = await this.sellableQuantity(userId, paperId);
        if (sellableQuantity <= 0) {
            throw new Error("You don't have enough paper");
        }
        const t = await sequelize?.transaction();
        try {
            const paperTrade = await new PaperTrade({
                paperId: paperId,
                buyerId: paper.ownerId,
                sellerId: user.id,
                quantity: quantity,
                transactionTimePrice: paper.price
            }).save();
            user.balance += paperTrade.transactionTimePrice * paperTrade.quantity;
            await user.save({transaction: t});
            await t?.commit();
            return {paperTrade: paperTrade, userUpdated: user};
        } catch (e) {
            throw e;
        }
    }

    async buyPaper(userId: number, paperId: number, quantity: number) {
        const user = await this.getById(userId);
        const paper = await new PaperRepo().getById(paperId);
        if (!paper || !user) {
            throw new Error("Bad Request");
        }
        if (paper.price * quantity > user.balance) {
            throw new Error("You balance is not enough");
        }

        const t = await sequelize?.transaction();
        try {
            const paperTrade = await new PaperTrade({
                paperId: paperId,
                buyerId: user.id,
                sellerId: paper.ownerId,
                quantity: quantity,
                transactionTimePrice: paper.price
            }).save({transaction: t});
            user.balance -= paperTrade.transactionTimePrice * paperTrade.quantity;
            await user.save({transaction: t});
            await t?.commit();
            return {paperTrade: paperTrade, userUpdated: user};
        } catch (e) {
            await t?.rollback();
            throw e;
        }
    }

    async portfolio(userId: number){
        try {
            const userPaperList = await PaperTrade.findAll({
                attributes: ['paperId'],
                where: {
                    [Op.or]: [
                        {buyerId: userId},
                        {sellerId: userId}
                    ]
                },
                group: ['paperId']
            });
            const userPapers = await Promise.all(userPaperList.map(async (paperElement: PaperTrade) => {
                const sellable = await this.sellableQuantity(userId, paperElement.paperId);
                if (sellable > 0) {
                    const paper = await Paper.findByPk(paperElement.paperId)
                    paper?.setDataValue('quantity', sellable);
                    return paper;
                }
                return null;
            }));

            const filteredUserPapers = userPapers.filter(paper => paper !== null);

            return {
                basket: filteredUserPapers,
                user: await this.getById(userId)
            }
        } catch (e) {
            throw e;
        }
    }

    async save(users: User): Promise<void> {
        try {
            await User.create({
                name: users.name,
                username: users.username,
                password: users.password,
                email: users.email,
                balance: users.balance
            });
        } catch (e) {
            throw new Error("Failed to create user! ⚠️");
        }
    }

    async update(user: User): Promise<void> {
        try {
            const newUser = await User.findOne({
                where: {
                    id: user.id
                }
            });

            if (!newUser) {
                throw new Error("User not found.");
            }

            newUser.name = user.name;
            newUser.username = user.username;
            newUser.email = user.email;
            newUser.password = user.password;
            newUser.role = user.role;

            await newUser.save();
        } catch (e) {
            throw new Error("Failed to updating user");
        }
    }
}
