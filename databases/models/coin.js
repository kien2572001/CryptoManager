import mongoose from "mongoose";


const coinSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  costPrice: Number,
  amount: Number,
  lastPrice: Number,
  tradeHistories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TradeHistory",
    },
  ],
}, { timestamps: true });

const Coin = mongoose.models.Coin || mongoose.model("Coin", coinSchema);

export default Coin;
