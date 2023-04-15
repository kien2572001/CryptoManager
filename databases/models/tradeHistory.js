import mongoose from "mongoose";

const tradeHistorySchema = new mongoose.Schema(
  {
    from: String,
    to: String,
    fromPrice: Number,
    toPrice: Number,
    fromAmount: Number,
    toAmount: Number,
    type: String, // add or swap
  },
  { timestamps: true }
);

const TradeHistory =
  mongoose.models.TradeHistory ||
  mongoose.model("TradeHistory", tradeHistorySchema);

export default TradeHistory;
