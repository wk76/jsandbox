
const marketData = require("../service/marketdata.js").marketData;




const endPointHandlersMarketData =
    [

        getMarketDataForSpecifiedMarketPath = {
            method: 'GET',
            path: '/marketdata/{marketname}',
            handler: function (request, reply) {
                let MarketName = request.params.marketname;
                marketData.fetchMarketData(MarketName).then((data) => {
                    if (data) {
                        let style = '<style>table  {border: 2px solid black; border-collapse: collapse} </style>';
                        let tableOpen = '<table>';
                        let tableCaption = '<caption> <h1> Market Data for ' + MarketName.toUpperCase() + '</h1> </caption> <br><br>';
                        let tableClose = '</table>';
                        let tableRows = [];
                        for (item in data[0]) {
                            if (item.charAt(0) !== '_') {
                                tableRows.push('<tr><td style="width:200px" >  ' + item + ': </td><td>  ' + data[0][item] + '</td></tr>');
                            }
                        }
                        reply(style + tableOpen + tableCaption + tableRows.join(" ") + tableClose);
                    } else {
                        reply('Market data not found');
                    }
                });
            }
        },

        getMarketDataForSpecifiedMarketQuery = {
            method: 'GET',
            path: '/marketdata',
            handler: function (request, reply) {
                let MarketName = request.query.marketname;
                marketData.fetchMarketData(MarketName).then((data) => {
                    if (data) {
                        let style = '<style>table  {border: 2px solid black; border-collapse: collapse} </style>';
                        let tableOpen = '<table>';
                        let tableCaption = '<caption> <h1> Market Data for ' + MarketName.toUpperCase() + '</h1> </caption> <br><br>';
                        let tableClose = '</table>';
                        let tableRows = [];
                        for (item in data[0]) {
                            if (item.charAt(0) !== '_') {
                                tableRows.push('<tr><td style="width:200px" >  ' + item + ': </td><td>  ' + data[0][item] + '</td></tr>');
                            }
                        }
                        reply(style + tableOpen + tableCaption + tableRows.join(" ") + tableClose);
                    } else {
                        reply('Market data not found');
                    }
                });
            }
        },

        getMarketDataAll = {
            method: 'GET',
            path: '/marketdata/all',
            handler: function (request, reply) {
                marketData.fetchMarketDataAll().then((data) => {
                    if (data) {
                        let tableOpen = '<table style="width:100%">';
                        let tableCaption = '<caption> <h1> Market Data for All Markets </h1> </caption> <br><br>';
                        let tableClose = '</table>';
                        let tableHeader = '<tr>'
                        tableHeader += '<th style="text-align:left"> Market Name </th>';
                        tableHeader += '<th style="text-align:right"> Ask </th>';
                        tableHeader += '<th style="text-align:right"> Base Volume </th>';
                        tableHeader += '<th style="text-align:right"> Bid </th>';
                        tableHeader += '<th style="text-align:right"> Created </th>';
                        tableHeader += '<th style="text-align:right"> High </th>';
                        tableHeader += '<th style="text-align:right"> Low </th>';
                        tableHeader += '<th style="text-align:right"> Last </th>';
                        tableHeader += '<th style="text-align:right"> Open Buy Orders </th>';
                        tableHeader += '<th style="text-align:right"> Open Sell Orders </th>';
                        tableHeader += '<th style="text-align:right"> Previous Day </th>';
                        tableHeader += '<th style="text-align:right"> Rate Of Change </th>';
                        tableHeader += '<th style="text-align:right"> TimeStamp </th>';
                        tableHeader += '<th style="text-align:right"> Volume </th></tr>';
                        let tableRecords = [];
                        for (attribute of data) {
                            let tr = '<tr>'; 
                            tr += '<td style="text-align:left">' + attribute.MarketName + '</td>';
                            tr += '<td style="text-align:right">' + attribute.Ask + '</td>';
                            tr += '<td style="text-align:right">' + attribute.BaseVolume + '</td>';
                            tr += '<td style="text-align:right">' + attribute.Bid + '</td>';
                            tr += '<td style="text-align:right">' + attribute.Created + '</td>';
                            tr += '<td style="text-align:right">' + attribute.High + '</td>';
                            tr += '<td style="text-align:right">' + attribute.Low + '</td>';
                            tr += '<td style="text-align:right">' + attribute.Last + '</td>';
                            tr += '<td style="text-align:right">' + attribute.OpenBuyOrders + '</td>';
                            tr += '<td style="text-align:right">' + attribute.OpenSellOrders + '</td>';
                            tr += '<td style="text-align:right">' + attribute.PrevDay + '</td>';
                            tr += '<td style="text-align:right">' + attribute.RateOfChange + '</td>';
                            tr += '<td style="text-align:right">' + attribute.TimeStamp + '</td>';
                            tr += '<td style="text-align:right">' + attribute.Volume + '</td></tr>';
                            tableRecords.push(tr);
                        }
                        reply(tableOpen + tableCaption + tableHeader + (tableRecords.sort()).join(" ") + tableClose);
                    } else {
                        reply('Market data not found');
                    }
                });
            }
        },

        getMarketDataForSpecifiedMarketQueryObj = {
            method: 'GET',
            path: '/marketdataqueryobj/{obj}',
            handler: function (request, reply) {
                let queryParamsObj = request.params.obj
                marketData.getMarkets(queryParamsObj).then((data) => {
                    if (data) {
                        reply(data);
                    } else {
                        reply('Market data not found');
                    }
                });
            }
        },


        getMarketDataForSpecifiedMarketQuery = {
            method: 'GET',
            path: '/marketdataquery',
            handler: function (request, reply) {
                let queryParamsObj = {};
                if (request.query.fromvolume) { queryParamsObj.fromVolume = request.query.fromvolume; }
                if (request.query.tovolume) { queryParamsObj.toVolume = request.query.tovolume; }
                if (request.query.fromchangerate) { queryParamsObj.fromChangeRate = request.query.fromchangerate; }
                if (request.query.tochangerate) { queryParamsObj.toChangeRate = request.query.tochangerate; }
                marketData.getMarkets(queryParamsObj).then((data) => {
                    if (data) {
                        let tableOpen = '<table style="width:100%">';
                        let tableCaption = '<caption> <h1> Market Data for ' + JSON.stringify(queryParamsObj) +  '</h1> </caption> <br><br>';
                        let tableClose = '</table>';
                        let tableHeader = '<tr>'
                        tableHeader += '<th style="text-align:left"> Market Name </th>';
                        tableHeader += '<th style="text-align:right"> Ask </th>';
                        tableHeader += '<th style="text-align:right"> Base Volume </th>';
                        tableHeader += '<th style="text-align:right"> Bid </th>';
                        tableHeader += '<th style="text-align:right"> Created </th>';
                        tableHeader += '<th style="text-align:right"> High </th>';
                        tableHeader += '<th style="text-align:right"> Low </th>';
                        tableHeader += '<th style="text-align:right"> Last </th>';
                        tableHeader += '<th style="text-align:right"> Open Buy Orders </th>';
                        tableHeader += '<th style="text-align:right"> Open Sell Orders </th>';
                        tableHeader += '<th style="text-align:right"> Previous Day </th>';
                        tableHeader += '<th style="text-align:right"> Rate Of Change </th>';
                        tableHeader += '<th style="text-align:right"> TimeStamp </th>';
                        tableHeader += '<th style="text-align:right"> Volume </th></tr>';
                        let tableRecords = [];
                        for (attribute of data) {
                            let tr = '<tr>'; 
                            tr += '<td style="text-align:left">' + attribute.MarketName + '</td>';
                            tr += '<td style="text-align:right">' + attribute.Ask + '</td>';
                            tr += '<td style="text-align:right">' + attribute.BaseVolume + '</td>';
                            tr += '<td style="text-align:right">' + attribute.Bid + '</td>';
                            tr += '<td style="text-align:right">' + attribute.Created + '</td>';
                            tr += '<td style="text-align:right">' + attribute.High + '</td>';
                            tr += '<td style="text-align:right">' + attribute.Low + '</td>';
                            tr += '<td style="text-align:right">' + attribute.Last + '</td>';
                            tr += '<td style="text-align:right">' + attribute.OpenBuyOrders + '</td>';
                            tr += '<td style="text-align:right">' + attribute.OpenSellOrders + '</td>';
                            tr += '<td style="text-align:right">' + attribute.PrevDay + '</td>';
                            tr += '<td style="text-align:right">' + attribute.RateOfChange + '</td>';
                            tr += '<td style="text-align:right">' + attribute.TimeStamp + '</td>';
                            tr += '<td style="text-align:right">' + attribute.Volume + '</td></tr>';
                            tableRecords.push(tr);
                        }
                        reply(tableOpen + tableCaption + tableHeader + (tableRecords.sort()).join(" ") + tableClose);
                    } else {
                        reply('Market data not found');
                    }
                });
            }
        }

    ];


exports.endPointHandlersMarketData = endPointHandlersMarketData;




//exports.getUserPath = getUserPath;
//exports.getUserQuery = getUserQuery;
//exports.getUsersAll = getUsersAll;



