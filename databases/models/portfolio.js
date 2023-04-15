import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
  name: String,
  coins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coin",
    },
  ],
});

const Portfolio = mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
