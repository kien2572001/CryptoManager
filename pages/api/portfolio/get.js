import connectDB from "../../../databases/connectDB";
import Portfolio from "../../../databases/models/portfolio";
import Coin from "../../../databases/models/coin";
import TradeHistory from "../../../databases/models/tradeHistory";
import { cryptoSymbol } from "crypto-symbol";
import url from "url";
const { nameLookup } = cryptoSymbol();

export default async function handler(req, res) {
  //only GET requests
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }
  const { name } = url.parse(req.url, true).query;

  connectDB();

  const portfolio = await  Portfolio.findOne({ name: name }).populate("coins");
  if (!portfolio) {
    return res.status(404).json({
      success: false,
      message: "Portfolio not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Portfolio fetched",
    data: portfolio,
  });
}
