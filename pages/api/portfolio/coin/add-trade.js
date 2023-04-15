import connectDB from "../../../../databases/connectDB";
import Portfolio from "../../../../databases/models/portfolio";
import Coin from "../../../../databases/models/coin";
import TradeHistory from "../../../../databases/models/tradeHistory";
import { cryptoSymbol } from "crypto-symbol";
import bodyParser from "body-parser";
import formidable from "formidable";
//import bodyparser from "body-parser";
const { nameLookup } = cryptoSymbol();

export default async function handler(req, res) {
  //only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const { from, to, fromPrice, toPrice, fromAmount, toAmount } = req.body;
  connectDB();
  const tradeHistory = await TradeHistory.create({
    from,
    to,
    fromPrice,
    toPrice,
    fromAmount,
    toAmount,
  });
  await tradeHistory.save();

  const id = tradeHistory._id;
  var fromCoin = await Coin.findOne({ symbol: from });
  if (!fromCoin) {
    let newCoin = await Coin.create({
      name: nameLookup(from),
      symbol: from,
      costPrice: 0,
      amount: 0,
      lastPrice: 0,
      tradeHistories: [],
    });
    await newCoin.save();
    let portfolio = await Portfolio.findOne({ name: "Holder" });
    portfolio.coins.push(newCoin._id);
    await portfolio.save();
    fromCoin = newCoin;
  }
  var toCoin = await Coin.findOne({ symbol: to });
  if (!toCoin) {
    let newCoin = await Coin.create({
      name: nameLookup(to),
      symbol: to,
      costPrice: 0,
      amount: 0,
      lastPrice: 0,
      tradeHistories: [],
    });
    await newCoin.save();
    let portfolio = await Portfolio.findOne({ name: "Holder" });
    portfolio.coins.push(newCoin._id);
    await portfolio.save();
    toCoin = newCoin;
  }
  fromCoin.tradeHistories.push(id);
  toCoin.tradeHistories.push(id);
  await fromCoin.save();
  await toCoin.save();

  res.status(200).json({
    success: true,
    data: {
      fromCoin,
      toCoin,
      tradeHistory,
    },
  });
}
