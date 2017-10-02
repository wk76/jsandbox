#!/usr/bin/env node

let marketData = require("./marketdata.js").marketData;



// Fetch speciefied market's data
marketData.fetchMarketData('BITB').then((data) => {
  console.log(data);
});

/*
// Get markets according to critera
// queryParamsObj: (1) fromVolume (2) toVolume (3) fromChangeRate (4) toChangeRate
let queryParamsObj = {"fromVolume": 100, "toVolume": 120, "fromChangeRate": "-7.9%", "toChangeRate": "-7.9%"}
marketData.getMarkets(queryParamsObj).then((results) => {
    console.log(results);
});
*/

