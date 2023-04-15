import axios from "axios";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const { symbols } = req.body;
  //res.status(200).json(symbols);
  try {
    const pricePromises = symbols.map((symbol) =>
      axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`)
    );
    const prices = await Promise.all(pricePromises);

    res.status(200).json(prices.map((price) => price.data));
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
