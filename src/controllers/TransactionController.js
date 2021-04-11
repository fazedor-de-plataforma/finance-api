const Transaction = require("../models/Transaction");

class TransactionController {
    async create(req, res) {
        const { description, amount, evaluateDate } = req.body;
        const { userid: userId } = req.headers;

        try {
            const newTransaction = await Transaction.create({ 
                description,
                amount,
                evaluateDate,
                user: userId 
            });
            
            await newTransaction.save();
    
            return res.json({ transaction: newTransaction })
            
        } catch (error) {
            res.status(503)
            return res.json({ error })
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            await Transaction.findByIdAndRemove(id).exec();
            return res.sendStatus(200);
            
        } catch (error) {
            res.status(503);
            return res.json({ error }); 
        }
    }

    async get(req, res) {
        const { userid: userId } = req.headers;

        try {
            const transactions = await Transaction.find({ user: userId }).exec();
    
            const summaryData = {
                gains: 0,
                loses: 0,
                total: 0
            };

            transactions.forEach((transaction) => {
                if(transaction.amount) {                    
                    if(transaction.amount > 0) summaryData.gains += transaction.amount;
                    else summaryData.loses += Math.abs(transaction.amount);
                }
            });

            summaryData.total = summaryData.gains - summaryData.loses;
            return res.json({ transactions, summaryData })
            
        } catch (error) {
            res.status(503);
            return res.json({ error });
        }
    }
}

module.exports = new TransactionController();