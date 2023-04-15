import { WebSocketConnector } from "@binance/connector";

const socket = new WebSocketConnector({
  apiKey: process.env.BINANCE_API_KEY,
  apiSecret: process.env.BINANCE_API_SECRET,
});

export const subscribeTicker = (symbol) => {
  socket.subscribeTicker(symbol, (data) => {
    console.log(data);
    // xu ly data
  });
};

export const unsubscribeTicker = (symbol) => {
  socket.unsubscribeTicker(symbol);
};

export const closeSocket = () => {
  socket.close();
};
