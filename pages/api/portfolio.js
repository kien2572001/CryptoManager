const { Spot } = require("@binance/connector");
const apiKey =
  "zKUJpAFVLhdII1l4kuVG5aLyCdqsasi12yemwKxRkBMWGV4oT1rMGCsm8j8sYb0T";
const apiSecret =
  "0X4eoGcnbBHJARlmPhf0fkfo5nG3xzg9MzCQZ0Pq9owRZjPR4fuQqReeSpGa0Ahy";

const client = new Spot(apiKey, apiSecret);

const getAccount = () => {
  return new Promise((resolve, reject) => {
    client
      .account()
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default function handler(req, res) {
  client
    .account()
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => client.logger.error(error));
}
