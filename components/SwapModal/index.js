import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CoinSelection from "./CoinSelect";
import PriceSelection from "./PriceSelect";
import AmountSelection from "./AmountSelect";
import { cryptoSymbol } from "crypto-symbol";
const cryptos = cryptoSymbol();

import { IconButton } from "@mui/material";
import { AddCard, CurrencyExchange } from "@mui/icons-material";
import axios from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";

export default function SwapModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [cryptoList, setCryptoList] = React.useState([]);
  const [mode, setMode] = React.useState("swap"); //swap or add

  const [fromCoin, setFromCoin] = React.useState("");
  const [toCoin, setToCoin] = React.useState("");
  const [fromPrice, setFromPrice] = React.useState("");
  const [toPrice, setToPrice] = React.useState("");
  const [fromAmount, setFromAmount] = React.useState("");
  const [toAmount, setToAmount] = React.useState("");

  React.useEffect(() => {
    let arr = Object.keys(cryptos.get().NSPair).map((key) => {
      return {
        name: key,
        label: cryptos.get().NSPair[key],
      };
    });
    setCryptoList(arr);
  }, []);
  const resetForm = () => {
    setFromCoin("");
    setToCoin("");
    setFromPrice("");
    setToPrice("");
    setFromAmount("");
    setToAmount("");
  };

  const handleSwap = async () => {
    const data = {
      from: fromCoin.label,
      to: toCoin.label,
      fromPrice: fromPrice,
      toPrice: toPrice,
      fromAmount: fromAmount,
      toAmount: toAmount,
    };
    const response = await axios.post(
      "/portfolio/coin/swap",
      data
    );
    if (response.status === 200) {
      toast.success(
        `${fromAmount} ${fromCoin.label} swapped to ${toAmount} ${toCoin.label}`,
        {
          autoClose: 3000,
        }
      );
      resetForm();
      handleClose();
    } else {
      toast.error("Something went wrong", {
        autoClose: 3000,
      });
      handleClose();
    }
  };

  const handleAdd = async () => {
    const data = {
      symbol: fromCoin.label,
      price: fromPrice,
      amount: fromAmount,
    };

    const response = await axios.post(
      "/portfolio/coin/add",
      data
    );
    if (response.status === 200) {
      //alert(`${fromAmount} ${fromCoin.label} added to portfolio`)
      toast.success(`${fromAmount} ${fromCoin.label} added to portfolio`, {
        autoClose: 3000,
      });
      resetForm();
      handleClose();
    } else {
      toast.error("Something went wrong", {
        autoClose: 3000,
      });
      handleClose();
    }
  };

  return (
    <div className="w-full">
      <button
        className="w-full flex items-center justify-center bg-[#162348] text-[#3571FD] py-2 px-3 h-[50px] rounded-b-[15px]"
        onClick={handleClickOpen}
      >
        + Add Portfolio
      </button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <div className="flex justify-between items-center">
            {mode === "swap" ? (
              <>
                <div className="text-xl">Swap</div>
                <IconButton onClick={() => setMode("add")}>
                  <AddCard />
                </IconButton>
              </>
            ) : (
              <>
                <div className="text-xl">Add</div>
                <IconButton onClick={() => setMode("swap")}>
                  <CurrencyExchange />
                </IconButton>
              </>
            )}
          </div>
        </DialogTitle>
        <DialogContent>
          {mode === "swap" ? (
            <div className="grid grid-cols-2 gap-5 m-2 z-100">
              <div className="grid grid-rows-3 gap-5">
                <CoinSelection
                  data={cryptoList}
                  setData={setFromCoin}
                  coinData={fromCoin}
                />
                <PriceSelection setData={setFromPrice} data={fromPrice} />
                <AmountSelection setData={setFromAmount} data={fromAmount} />
              </div>
              <div className="grid grid-rows-3 gap-5">
                <CoinSelection
                  data={cryptoList}
                  setData={setToCoin}
                  coinData={toCoin}
                />
                <PriceSelection setData={setToPrice} data={toPrice} />
                <AmountSelection setData={setToAmount} data={toAmount} />
              </div>
            </div>
          ) : (
            <div className="grid grid-rows-3 gap-5 m-2">
              <CoinSelection
                data={cryptoList}
                setData={setFromCoin}
                coinData={fromCoin}
              />
              <PriceSelection setData={setFromPrice} data={fromPrice} />
              <AmountSelection setData={setFromAmount} data={fromAmount} />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          {mode === "swap" ? (
            <Button onClick={handleSwap}>Swap</Button>
          ) : (
            <Button onClick={handleAdd}>Add</Button>
          )}
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
