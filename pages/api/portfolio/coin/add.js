import connectDB from "../../../../databases/connectDB";
import Portfolio from "../../../../databases/models/portfolio";
import Coin from "../../../../databases/models/coin";
import TradeHistory from "../../../../databases/models/tradeHistory";
import { cryptoSymbol } from "crypto-symbol";
const { nameLookup } = cryptoSymbol();

export default async function handler(req, res) {
  //only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }
  const { symbol, amount, price } = req.body;
  connectDB();
  const tradeHistory = await TradeHistory.create({
    from: symbol,
    to: null,
    fromPrice: price,
    toPrice: null,
    fromAmount: amount,
    toAmount: null,
    type: "add",
  });

  await tradeHistory.save();
  const id = tradeHistory._id;

  //search and create if not found
  var coin = await Coin.findOne({ symbol: symbol });
  if (!coin) {
    let newCoin = await Coin.create({
      name: nameLookup(symbol),
      symbol: symbol,
      costPrice: 0,
      amount: 0,
      lastPrice: 0,
      tradeHistories: [],
    });
    await newCoin.save();
    let portfolio = await Portfolio.findOne({ name: "Holder" });
    portfolio.coins.push(newCoin._id);
    await portfolio.save();
    coin = newCoin;
  }

  //update coin
  coin.costPrice =
    (Number.parseFloat(coin.costPrice) * Number.parseFloat(coin.amount) +
      Number.parseFloat(price) * Number.parseFloat(amount)) /
    (Number.parseFloat(coin.amount) + Number.parseFloat(amount));
  coin.amount = Number.parseFloat(coin.amount) + Number.parseFloat(amount);
  coin.lastPrice = 0;
  coin.tradeHistories.push(id);
  await coin.save();
  return res.status(200).json({
    success: true,
    message: "Coin added",
    data: coin,
  });
}
