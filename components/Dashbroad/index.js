import PortfolioChart from "../Chart/PortfolioChart";
import PortfolioTable from "../Table/PortfolioTable";
import SwapModal from "../SwapModal";
import React, { useState, useEffect, useCallback,useMemo } from "react";
import axios from "../../utils/axios";
const updateInterval = 10000;

export default function Dashbroad({ portfolio, appData }) {
  const [coins, setCoins] = useState(portfolio.coins);
  const [totalBalance, setTotalBalance] = useState(0);

  const [prices, setPrices] = useState([]);
  const [BTCPrice, setBTCPrice] = useState(appData.BTCprice);

  const getCoinPrices = useCallback(async () => {
    const symbols = coins
      .filter((coin) => coin.symbol !== "USDT")
      .map((coin) => coin.symbol + "USDT");
    try {
      const response = await axios.post("/spot/price", { symbols });
      setCoins((coins) =>
        coins.map((coin) => {
          const price = response.data.find(
            (price) =>
              price.symbol === coin.symbol + "USDT" && price.symbol !== "USDT"
          );
          return {
            ...coin,
            lastPrice: price ? price.price : coin.lastPrice,
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  }, [coins]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getCoinPrices();
    }, updateInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [getCoinPrices]);

  const totalBalanceCalculation = useMemo(() => {
    return coins.reduce((total, coin) => {
      return (
        total +
        Number.parseFloat(coin.lastPrice) * Number.parseFloat(coin.amount)
      );
    }, 0);
  }, [coins]);

  useEffect(() => {
    setTotalBalance(totalBalanceCalculation);
  }, [coins]);

  return (
    <div className="max-w-screen-xl mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {/*Total balance  */}
      <div className="card-container text-[#ffffffe6] flex flex-col">
        <div className="leading-[30px]">Total Balance</div>
        <div className="text-4xl font-bold leading-[54px]">
          $ {totalBalance.toFixed(2)}
        </div>
        <div>in BTC {(totalBalance / BTCPrice).toFixed(8)}</div>
        <div className="block border-b mt-[25px] border-b-white"></div>
        <div className="mt-4">All Time max</div>
        <div className="text-xl font-bold leading-[30px] mt-3">$ 764.61</div>
        <div className="mt-4">All Time min</div>
        <div className="text-xl font-bold leading-[30px] mt-3">$ 764.61</div>
        <div className="block border-b mt-[16px] mb-[25px] border-b-white"></div>
        <div className="">Total assets: {coins.length}</div>
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
            <div className="mt-6">$ {totalBalance.toFixed(2)}</div>
            <div className="mt-3 text-xs text-[#3571FD]">
              0 wallets | {coins.length} assets
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
