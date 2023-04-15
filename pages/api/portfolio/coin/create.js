import Coin from "../../../../databases/models/coin";
import connectDB from "../../../../databases/connectDB";
import { cryptoSymbol } from "crypto-symbol";
const { nameLookup } = cryptoSymbol();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  } else {
    const { symbol } = req.body;
    connectDB();
    const newCoin = await Coin.create({
      name: nameLookup(symbol),
      symbol: symbol,
      costPrice: 0,
      amount: 0,
      lastPrice: 0,
      tradeHistories: [],
    });
    await newCoin.save();
    return res.status(200).json({
      success: true,
      message: "Coin created",
      data: newCoin,
    });
  }
}
