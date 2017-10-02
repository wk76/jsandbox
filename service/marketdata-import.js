#!/usr/bin/env node


let marketData = require("./marketdata.js").marketData;

marketData.importMarketData('BTC');





//var unirest = require('unirest');
//let db = require('arangojs')('http://root:C@rrau100@localhost:8529');
//db.useDatabase('jsandbox');
//let collectionMarketData = db.collection('marketData');
//let aqlQuery = require('arangojs').aqlQuery;
/*
function changeRatePercentage(last, prevDay) {
  if (last > prevDay) {
    perc = (last - prevDay) / prevDay * 100
  } else if (last < prevDay) {
    perc = -((prevDay - last) / prevDay * 100)
  } else {
    perc = 0
  }
  return (Math.round(perc * 10) / 10) + "%"
}


function importMarketData(currency) {
  return new Promise((resolve, reject) => {
    unirest.get('https://bittrex.com/api/v1.1/public/getmarketsummaries')
      .end(response => {
        for (obj of response.body["result"]) {
          let currencyCode = obj.MarketName.substring(0, obj.MarketName.indexOf("-"));
          let marketCode = obj.MarketName.substring(obj.MarketName.indexOf("-") + 1);
          let changeRate = changeRatePercentage(obj.Last, obj.PrevDay);
          if (currencyCode === currency) {
            obj._key = marketCode;
            obj.MarketName = marketCode;
            obj.RateOfChange = changeRate;
            db.query(aqlQuery`
            UPSERT {MarketName: ${obj["MarketName"]}} INSERT ${obj} REPLACE ${obj} IN marketData
            `)
          }
        }
      });
  });
}
*/





