const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
    {
        description: String,
        amount: Number,
        evaluateDate: Date,
        user: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }
  },
  { timestamps: true });

module.exports = mongoose.model("Transaction", TransactionSchema);