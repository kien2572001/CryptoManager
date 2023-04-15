import TextField from "@mui/material/TextField";

export default function PriceSelection() {
  return (
    <TextField
      id="outlined-number"
      label="Price"
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
      fullWidth
    />
  );
}
