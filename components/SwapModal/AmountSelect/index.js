import TextField from "@mui/material/TextField";

export default function AmountSelection() {
  return (
    <TextField
      id="outlined-number"
      label="Amount"
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
      fullWidth
    />
  );
}