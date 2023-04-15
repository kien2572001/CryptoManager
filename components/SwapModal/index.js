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

export default function SwapModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [cryptoList, setCryptoList] = React.useState([]);

  React.useEffect(() => {
    //console.log(cryptoList.get().NSPair);
    let arr = Object.keys(cryptos.get().NSPair).map((key) => {
      return {
        name: key,
        label: cryptos.get().NSPair[key],
      };
    });
    setCryptoList(arr);
  }, []);

  return (
    <div className="w-full">
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <button
        className="w-full flex items-center justify-center bg-[#162348] text-[#3571FD] py-2 px-3 h-[50px] rounded-b-[15px]"
        onClick={handleClickOpen}
      >
        + Add Portfolio
      </button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Swap</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
          <div className="grid grid-cols-2 gap-5 m-2 z-100">
            <div className="grid grid-rows-3 gap-5">
              <CoinSelection data={cryptoList} />
              <PriceSelection />
              <AmountSelection />
            </div>
            <div className="grid grid-rows-3 gap-5">
              <CoinSelection data={cryptoList} />
              <PriceSelection />
              <AmountSelection />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Swap</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
