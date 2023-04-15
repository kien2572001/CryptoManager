import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const styles = {
  padding: "10px",
};

export default function BasicTable({ coins }) {
  React.useEffect(() => {
    console.log("coins: ", coins);
  }, [coins]);

  const [rows, setRows] = React.useState(coins);
  const calculatePNL = (coin) => {
    const amount = Number.parseFloat(coin.amount);
    const costPrice = Number.parseFloat(coin.costPrice);
    const lastPrice = Number.parseFloat(coin.lastPrice);

    return Number.parseFloat((lastPrice / costPrice) * 100 - 100).toFixed(2);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" style={styles}>
        <TableHead>
          <TableRow>
            <TableCell>Currency</TableCell>
            <TableCell align="right">Amount|Value</TableCell>
            <TableCell align="right">Cost Price</TableCell>
            <TableCell align="right">Last Price</TableCell>
            <TableCell align="right">Position PNL</TableCell>
            <TableCell align="right">Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((row) => (
            <TableRow
              key={row.symbol}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <div className="flex items-center gap-4">
                  <img
                    src={`https://static-app.bingx.com/icon/${row.symbol}.png`}
                    alt="BTC"
                    style={{ width: "30px", height: "30px" }}
                  />
                  {row.symbol}
                </div>
              </TableCell>
              <TableCell align="right">
                {row.amount} <br />
                {Number.parseFloat(row.amount) *
                  Number.parseFloat(row.costPrice).toFixed(2)}{" "}
                USD
              </TableCell>
              <TableCell align="right">{row.costPrice}</TableCell>
              <TableCell align="right">
                {Number.parseFloat(row.lastPrice).toFixed(2)}
              </TableCell>
              <TableCell align="right">{calculatePNL(row)}</TableCell>
              <TableCell align="right">{row.costPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
