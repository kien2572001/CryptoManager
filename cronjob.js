const cron = require("node-cron");
const axios = require("axios");

cron.schedule("*/30 * * * * *", function () {
  console.log("Running cron job every 30 seconds");
  axios
    .get("http://localhost:3000/api/update")
    .then((response) => {
      console.log("Update price successfully");
    })
    .catch((error) => {
      console.log("Update price failed");
    });
});
