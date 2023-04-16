import TextField from "@mui/material/TextField";

export default function PriceSelection({ data, setData }) {
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
      value={data}
      onChange={(e) => setData(e.target.value)}
    />
  );
}
