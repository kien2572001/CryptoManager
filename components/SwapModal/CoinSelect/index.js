import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function CoinSelection({ data, coinData, setData }) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={data}
      //sx={{ width: 300 }}
      fullWidth
      renderInput={(params) => <TextField {...params} label="Token" />}
      value={coinData}
      onChange={(e, newValue) => {
        setData(newValue);
      }}
    />
  );
}
