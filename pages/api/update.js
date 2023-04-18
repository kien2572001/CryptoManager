import connectDB from "../../databases/connectDB";
import Coin from "../../databases/models/coin";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }
  connectDB();
  const response = await Coin.find({ symbol: { $ne: "USDT" } });
  const coinsArray = response.map(async (coin) => {
    const { data } = await axios.get(
      `https://api.binance.com/api/v3/ticker/price?symbol=${coin.symbol}USDT`
    );
    return {
      symbol: coin.symbol,
      price: data.price,
    };
  });
  const listCoinAndPrice = await Promise.all(coinsArray);
  response.forEach((coin) => {
    const coinPrice = listCoinAndPrice.find(
      (coinAndPrice) => coinAndPrice.symbol === coin.symbol
    );
    if (coinPrice) {
      coin.lastPrice = coinPrice.price;
      coin.save();
    }
  });

  res.status(200).json({
    success: true,
    message: "Update price successfully",
    data: response,
  });
}
