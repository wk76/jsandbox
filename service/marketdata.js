let unirest = require('unirest');
let db = require('arangojs')('http://root:C@rrau100@localhost:8529');
db.useDatabase('jsandbox');
let collectionMarketData = db.collection('marketData');
let aqlQuery = require('arangojs').aqlQuery;



let marketData = {

    changeRatePercentage: function (last, prevDay) {
        let perc;
        if (last > prevDay) {
            perc = (last - prevDay) / prevDay * 100;
        } else if (last < prevDay) {
            perc = -((prevDay - last) / prevDay * 100);
        } else {
            perc = 0;
        }
        return (Math.round(perc * 10) / 10) + "%"
    },


    importMarketData: function (currency) {
        return new Promise((resolve, reject) => {
            unirest.get('https://bittrex.com/api/v1.1/public/getmarketsummaries')
                .end(response => {
                    for (obj of response.body["result"]) {
                        let currencyCode = obj.MarketName.substring(0, obj.MarketName.indexOf("-"));
                        let marketCode = obj.MarketName.substring(obj.MarketName.indexOf("-") + 1);
                        let changeRate = this.changeRatePercentage(obj.Last, obj.PrevDay);
                        if (currencyCode === currency) {
                            obj._key = obj.MarketName;
                            obj.MarketName = marketCode;
                            obj.Currency = currencyCode;
                            obj.RateOfChange = changeRate;
                            db.query(aqlQuery`
                  UPSERT {MarketName: ${obj["MarketName"]}} INSERT ${obj} REPLACE ${obj} IN marketData
                  `)
                        }
                    }
                });
        });
    },

    fetchMarketDataAll: function () {
        return new Promise((resolve, reject) => {
            collectionMarketData.all()
                .then(results => { resolve(results._result); }
                )
        }
        );
    },


    fetchMarketData: function (marketName) {
        return new Promise((resolve, reject) => {
            db.query(aqlQuery`
            LET searchCondition = ${(marketName.substring(marketName.indexOf("-") + 1)).toUpperCase()}
            FOR market IN marketData FILTER market["MarketName"] == searchCondition RETURN market 
            `).then((results) => {
                    resolve(results._result);
                });
        });

    },

    // queryParamsObj: (1) fromVolume (2) toVolume (3) fromChangeRate (4) toChangeRate
    getMarkets: function (queryParamsObj) {
        return new Promise((resolve, reject) => {

            let aqlOpen = "FOR market IN marketData FILTER market[\"Currency\"] == \"BTC\" ";
            let aqlClose = " RETURN market";
            let aqlArray = [];

            if (queryParamsObj.hasOwnProperty("fromVolume")) {
                let fromVolume = queryParamsObj.fromVolume;
                let aqlParam1 = "AND market[\"Volume\"] >= " + fromVolume;
                aqlArray.push(aqlParam1);
            }
            if (queryParamsObj.hasOwnProperty("toVolume")) {
                let toVolume = queryParamsObj.toVolume;
                let aqlParam2 = "AND market[\"Volume\"] <= " + toVolume;
                aqlArray.push(aqlParam2);
            }
            if (queryParamsObj.hasOwnProperty("fromChangeRate")) {
                let fromChangeRate = Number(queryParamsObj.fromChangeRate.replace("%", ""));
                let aqlParam3 = "AND TO_NUMBER(SUBSTITUTE(market[\"RateOfChange\"],\"%\",\"\" )) >= " + fromChangeRate;
                aqlArray.push(aqlParam3);
            }
            if (queryParamsObj.hasOwnProperty("toChangeRate")) {
                let toChangeRate = Number(queryParamsObj.toChangeRate.replace("%", ""));
                let aqlParam4 = "AND TO_NUMBER(SUBSTITUTE(market[\"RateOfChange\"],\"%\",\"\" )) <= " + toChangeRate;
                aqlArray.push(aqlParam4);
            }

            if (aqlArray.length >= 1) {
                let aqlConstruct = aqlOpen + aqlArray.join(" ") + aqlClose;
                db.query(aqlConstruct)
                    .then(results => {
                        resolve(results._result);
                    })
            } else {
                console.log("At least one parameter is required");
            }
        })
    }
}

exports.marketData = marketData;


