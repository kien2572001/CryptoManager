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

    const positionPNL = Number.parseFloat(
      (lastPrice / costPrice) * 100 - 100
    ).toFixed(2);
    const positionPNLValue = Number.parseFloat(
      (lastPrice - costPrice) * amount
    ).toFixed(2);
    let lostOrGain = positionPNLValue > 0 ? "text-green-500" : "text-red-500";

    return (
      <div className="flex flex-col gap-1">
        <span className={`${lostOrGain}`}>
          {positionPNLValue > 0 ? "+ " : "  "}
          {positionPNLValue} USD
        </span>
        <span className={`text-xs ${lostOrGain}`}>
          {positionPNL > 0 ? "+ " : "  "}
          {positionPNL} %
        </span>
      </div>
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" style={styles}>
        <TableHead>
          <TableRow>
            <TableCell>Currency</TableCell>
            <TableCell align="left">Amount|Value</TableCell>
            <TableCell align="left">Cost Price</TableCell>
            <TableCell align="left">Last Price</TableCell>
            <TableCell align="left">Position PNL</TableCell>
            <TableCell align="left">Operation</TableCell>
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
              <TableCell align="left">
                <div className="flex flex-col gap-1">
                  <span className="text-sm">{row.amount}</span>
                  <span className="text-xs text-gray-500">
                    {(
                      Number.parseFloat(row.amount) *
                      Number.parseFloat(row.costPrice)
                    ).toFixed(2)}{" "}
                    USD
                  </span>
                </div>
              </TableCell>
              <TableCell align="left">
                {Number.parseFloat(row.costPrice).toFixed(2)}
              </TableCell>
              <TableCell align="left">
                {Number.parseFloat(row.lastPrice).toFixed(2)}
              </TableCell>
              <TableCell align="left">{calculatePNL(row)}</TableCell>
              <TableCell align="left">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Add
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">
                  Swap
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
