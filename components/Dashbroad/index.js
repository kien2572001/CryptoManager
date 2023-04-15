import PortfolioChart from "../Chart/PortfolioChart";
import PortfolioTable from "../Table/PortfolioTable";
import SwapModal from "../SwapModal";
import React, { useState, useEffect } from "react";

import dynamic from "next/dynamic";

import { BinanceConnector } from "@binance/connector";
const binance = new BinanceConnector({
  apiKey: process.env.BINANCE_API_KEY,
  apiSecret: process.env.BINANCE_API_SECRET,
});

const symbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "ADAUSDT", "DOTUSDT"];

export default function Dashbroad({ portfolio }) {
  const [coins, setCoins] = useState(portfolio.coins);

  useEffect(() => {
    const handlerTicker = (data) => {
      console.log(data);
      // xu ly data
    };
    binance.subscribeTicker(symbols, handlerTicker);
    return () => {
      binance.unsubscribeTicker(symbols, handlerTicker);
    };
  }, []);
  return (
    <div className="max-w-screen-xl mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {/*Total balance  */}
      <div className="card-container text-[#ffffffe6] flex flex-col">
        <div className="leading-[30px]">Total Balance</div>
        <div className="text-4xl font-bold leading-[54px]">$ 764.61</div>
        <div>in BTC 0.00000000</div>
        <div className="block border-b mt-[25px] border-b-white"></div>
        <div className="mt-4">All Time max</div>
        <div className="text-xl font-bold leading-[30px] mt-3">$ 764.61</div>
        <div className="mt-4">All Time min</div>
        <div className="text-xl font-bold leading-[30px] mt-3">$ 764.61</div>
        <div className="block border-b mt-[16px] mb-[25px] border-b-white"></div>
        <div className="">Total assets: 8</div>
      </div>
      {/* Wallet */}
      <div className=" grid grid-rows-2 gap-5">
        {/* Top wallets */}
        <div className="card-container-with-bottom-button text-[#ffffffe6] flex flex-col p-0">
          <div className="p-4">
            <div className="leading-[30px] text-xl">Total Wallet</div>
            <div className="mt-6">$ 764.61</div>
            <div className="mt-3 text-xs text-[#3571FD]">
              0 wallets | 0 assets
            </div>
          </div>
          <button className="flex items-center justify-center bg-[#162348] text-[#3571FD] py-2 px-3 h-[50px] rounded-b-[15px]">
            + Add Wallet
          </button>
        </div>
        {/* top porfolios */}
        <div className="card-container-with-bottom-button text-[#ffffffe6] flex flex-col p-0">
          <div className="p-4">
            <div className="leading-[30px] text-xl">Total Portfolio</div>
            <div className="mt-6">$ 764.61</div>
            <div className="mt-3 text-xs text-[#3571FD]">
              0 wallets | 0 assets
            </div>
          </div>
          <SwapModal />
        </div>
      </div>
      <div className="md:col-span-2 lg:col-span-2 card-container flex flex-col p-6">
        <div className="flex justify-between items-center">
          <div className="leading-[30px] text-xl text-[#ffffffe6]">
            Portfolio Chart
          </div>
        </div>
        <PortfolioChart coins={coins} />
      </div>
      <div className="card-container flex flex-col p-6 md:col-span-2 lg:col-span-4 text-white">
        <PortfolioTable coins={coins} />
      </div>
    </div>
  );
}
