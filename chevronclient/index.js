const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const CONFIG = require('./config');
const {_} = require("underscore");

var fs = require("fs");
const port = CONFIG.port || 3000;
const app = express();
var usersData = {};

function getUsers(filepath){

    var file = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(file);
}

// serve static assets normally
app.use(express.static(__dirname + '/' + CONFIG.webDir));
app.use(express.static(__dirname + '/' + CONFIG.nodeDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//load users 
usersData = getUsers('../users.json');

//Validate user login credentials 
app.post('/login', function (req, res) {
    let params = req.body,
        response = {},
        user = _.findWhere(usersData.users,{ username : params.username,password : params.password });

    //validate user credentials
    if(user !== undefined){
        response = { 
            success: true,
            organisations : usersData.organisations, //load all organisations
            currentUser : {
                id : user.id,
                username : user.username,
                name : user.name,
                orgId : user.organisationId
            } //load matched user
        }
    } else {
        response = { success: false, error: "User not valid" };
    }

    res.status(200).send(JSON.stringify(response));
});

//bind backend APIs with server
if (!CONFIG.isLocalServer) {
    const query = require('../query.js');
    const listQuery = require('../ListQuery.js');
    const trade = require('../addTradeQuery.js');

    //bind local methods with server
    app.post('/listingData', function (request, response) {
        const params = request.body;
        console.log(params);

        const data = listQuery.getContractList(params.contractId);

        data.then(function (jsonData) {
            console.log("############# Data from node", jsonData);
            response.setHeader('Content-Type', 'application/json');
            response.send(jsonData);
        });

    });

    //load matched data
    app.post('/matchingData', function (request, response) {
        const params = request.body;
        const data = query.getContractData(params.contractId);

        console.log(params);

        data.then(function (jsonData) {
            response.setHeader('Content-Type', 'application/json');
            response.send(jsonData);
        });
    });

    //add trador data
    app.post('/addTrador', function (request, response) {
        const params = request.body;
        console.log("###### Form params : ", params);

        const form = [
            "add",
            params.tradeNumber,
            params.buyerName,
            params.sellerName,
            params.buyerID, //buyer id 
            params.sellerID, //seller id
            params.tradeType,
            params.marketType,
            params.price,
            params.priceUOM,
            params.quantity,
            params.quantityUOM,
            params.totalQuantity,
            params.totalQuantityUOM,
            params.tradeDate,
            params.startDate,
            params.endDate,
            params.productCode,
            params.deliveryLocation,
            params.paymetDays,
            params.paymentTerms,
            params.mot,
            params.owner, //Owner id
            params.ownerName,
            params.creatorUser, //loggedin user id 
            params.tradeStatus,
        ];

        const data = trade.addTrade(form);

        data.then(function (jsonData) {
            console.log("####Form added response", jsonData);

            response.setHeader('Content-Type', 'application/json');
            response.send(jsonData);
        });

    });


} else {
    //bind local methods with server
    app.post('/listingData', function (request, response) {
        const params = request.body;

        console.log(params);
        response.setHeader('Content-Type', 'application/json');
        response.send(JSON.stringify([{
            "TradeNumber": {
                "ValA": "Nippon",
                "ValB": "A01",
                "Match": false
            },
            "BuyerName": {
                "ValA": "Nippon",
                "ValB": "A02",
                "Match": false
            },
            "SellerName": {
                "ValA": "Chevron",
                "ValB": "A03",
                "Match": false
            },
            "BuyerID": {
                "ValA": "A04",
                "ValB": "A04",
                "Match": true
            },
            "SellerID": {
                "ValA": "A05",
                "ValB": "A05",
                "Match": true
            },
            "TradeType": {
                "ValA": "Date Pipeline Fixed Price",
                "ValB": "A06",
                "Match": false
            },
            "MarketType": {
                "ValA": "Physical Crude Oil",
                "ValB": "A07",
                "Match": false
            },
            "Price": {
                "ValA": "3000",
                "ValB": "A08",
                "Match": true
            },
            "PriceUOM": {
                "ValA": "BBL",
                "ValB": "A09",
                "Match": false
            },
            "Quantity": {
                "ValA": "300",
                "ValB": "A10",
                "Match": false
            },
            "QuantityUOM": {
                "ValA": "BBL",
                "ValB": "A11",
                "Match": false
            },
            "TotalQuantity": {
                "ValA": "30000",
                "ValB": "A12",
                "Match": true
            },
            "TotalQuantityUOM": {
                "ValA": "BBL",
                "ValB": "A13",
                "Match": true
            },
            "TradeDate": {
                "ValA": "23-03-1989",
                "ValB": "A14",
                "Match": true
            },
            "StartDate": {
                "ValA": "23-03-1989",
                "ValB": "A15",
                "Match": false
            },
            "EndDate": {
                "ValA": "23-03-1989",
                "ValB": "A16",
                "Match": true
            },
            "ProductCode": {
                "ValA": "MARS",
                "ValB": "A17",
                "Match": true
            },
            "DeliveryLocation": {
                "ValA": "Clovelly",
                "ValB": "A18",
                "Match": true
            },
            "PaymetDays": {
                "ValA": "30",
                "ValB": "A19",
                "Match": false
            },
            "PaymentTerms": {
                "ValA": "20FFMD",
                "ValB": "A20",
                "Match": true
            },
            "Mot": {
                "ValA": "Pipeline",
                "ValB": "A21",
                "Match": true
            },
            "Owner": {
                "ValA": "NPN",
                "ValB": "A22",
                "Match": false
            },
            "OwnerName": {
                "ValA": "Nippon",
                "ValB": "A23",
                "Match": false
            },
            "CreatorUser": {
                "ValA": "1",
                "ValB": "A24",
                "Match": false
            },
            "TradeStatus": {
                "ValA": "Active",
                "ValB": "A25",
                "Match": false
            },
            "CreationTimestamp": {
                "ValA": "2017-04-24 08:44:25.495732836 +0000 UTC",
                "ValB": "2017-04-24 08:44:39.221772715 +0000 UTC",
                "Match": false
            },
            "DealStatus": "Matched"
        }, {
            "TradeNumber": {
                "ValA": "Chevron",
                "ValB": "A01",
                "Match": false
            },
            "BuyerName": {
                "ValA": "A02",
                "ValB": "A02",
                "Match": false
            },
            "SellerName": {
                "ValA": "A03",
                "ValB": "A03",
                "Match": false
            },
            "BuyerID": {
                "ValA": "A04",
                "ValB": "A04",
                "Match": true
            },
            "SellerID": {
                "ValA": "A05",
                "ValB": "A05",
                "Match": true
            },
            "TradeType": {
                "ValA": "A06",
                "ValB": "A06",
                "Match": false
            },
            "MarketType": {
                "ValA": "A07",
                "ValB": "A07",
                "Match": false
            },
            "Price": {
                "ValA": "A08",
                "ValB": "A08",
                "Match": true
            },
            "PriceUOM": {
                "ValA": "A09",
                "ValB": "A09",
                "Match": false
            },
            "Quantity": {
                "ValA": "A10",
                "ValB": "A10",
                "Match": false
            },
            "QuantityUOM": {
                "ValA": "A11",
                "ValB": "A11",
                "Match": false
            },
            "TotalQuantity": {
                "ValA": "A12",
                "ValB": "A12",
                "Match": true
            },
            "TotalQuantityUOM": {
                "ValA": "A13",
                "ValB": "A13",
                "Match": true
            },
            "TradeDate": {
                "ValA": "A14",
                "ValB": "A14",
                "Match": true
            },
            "StartDate": {
                "ValA": "A15",
                "ValB": "A15",
                "Match": false
            },
            "EndDate": {
                "ValA": "A16",
                "ValB": "A16",
                "Match": true
            },
            "ProductCode": {
                "ValA": "A17",
                "ValB": "A17",
                "Match": true
            },
            "DeliveryLocation": {
                "ValA": "A18",
                "ValB": "A18",
                "Match": true
            },
            "PaymetDays": {
                "ValA": "A19",
                "ValB": "A19",
                "Match": false
            },
            "PaymentTerms": {
                "ValA": "A20",
                "ValB": "A20",
                "Match": true
            },
            "Mot": {
                "ValA": "A21",
                "ValB": "A21",
                "Match": true
            },
            "Owner": {
                "ValA": "A22",
                "ValB": "A22",
                "Match": false
            },
            "OwnerName": {
                "ValA": "A23",
                "ValB": "A23",
                "Match": false
            },
            "CreatorUser": {
                "ValA": "A24",
                "ValB": "A24",
                "Match": false
            },
            "TradeStatus": {
                "ValA": "A25",
                "ValB": "A25",
                "Match": false
            },
            "CreationTimestamp": {
                "ValA": "2017-04-24 08:44:25.495732836 +0000 UTC",
                "ValB": "2017-04-24 08:44:39.221772715 +0000 UTC",
                "Match": false
            },
            "DealStatus": "Matched"
        },{
            "TradeNumber": {
                "ValA": "BP",
                "ValB": "A01",
                "Match": false
            },
            "BuyerName": {
                "ValA": "A02",
                "ValB": "A02",
                "Match": false
            },
            "SellerName": {
                "ValA": "A03",
                "ValB": "A03",
                "Match": false
            },
            "BuyerID": {
                "ValA": "A04",
                "ValB": "A04",
                "Match": true
            },
            "SellerID": {
                "ValA": "A05",
                "ValB": "A05",
                "Match": true
            },
            "TradeType": {
                "ValA": "A06",
                "ValB": "A06",
                "Match": false
            },
            "MarketType": {
                "ValA": "A07",
                "ValB": "A07",
                "Match": false
            },
            "Price": {
                "ValA": "A08",
                "ValB": "A08",
                "Match": true
            },
            "PriceUOM": {
                "ValA": "A09",
                "ValB": "A09",
                "Match": false
            },
            "Quantity": {
                "ValA": "A10",
                "ValB": "A10",
                "Match": false
            },
            "QuantityUOM": {
                "ValA": "A11",
                "ValB": "A11",
                "Match": false
            },
            "TotalQuantity": {
                "ValA": "A12",
                "ValB": "A12",
                "Match": true
            },
            "TotalQuantityUOM": {
                "ValA": "A13",
                "ValB": "A13",
                "Match": true
            },
            "TradeDate": {
                "ValA": "A14",
                "ValB": "A14",
                "Match": true
            },
            "StartDate": {
                "ValA": "A15",
                "ValB": "A15",
                "Match": false
            },
            "EndDate": {
                "ValA": "A16",
                "ValB": "A16",
                "Match": true
            },
            "ProductCode": {
                "ValA": "A17",
                "ValB": "A17",
                "Match": true
            },
            "DeliveryLocation": {
                "ValA": "A18",
                "ValB": "A18",
                "Match": true
            },
            "PaymetDays": {
                "ValA": "A19",
                "ValB": "A19",
                "Match": false
            },
            "PaymentTerms": {
                "ValA": "A20",
                "ValB": "A20",
                "Match": true
            },
            "Mot": {
                "ValA": "A21",
                "ValB": "A21",
                "Match": true
            },
            "Owner": {
                "ValA": "A22",
                "ValB": "A22",
                "Match": false
            },
            "OwnerName": {
                "ValA": "A23",
                "ValB": "A23",
                "Match": false
            },
            "CreatorUser": {
                "ValA": "A24",
                "ValB": "A24",
                "Match": false
            },
            "TradeStatus": {
                "ValA": "A25",
                "ValB": "A25",
                "Match": false
            },
            "CreationTimestamp": {
                "ValA": "2017-04-24 08:44:25.495732836 +0000 UTC",
                "ValB": "2017-04-24 08:44:39.221772715 +0000 UTC",
                "Match": false
            },
            "DealStatus": "Pending"
        }, {
            "TradeNumber": {
                "ValA": "Mercuria",
                "ValB": "A01",
                "Match": false
            },
            "BuyerName": {
                "ValA": "A02",
                "ValB": "A02",
                "Match": false
            },
            "SellerName": {
                "ValA": "A03",
                "ValB": "A03",
                "Match": false
            },
            "BuyerID": {
                "ValA": "A04",
                "ValB": "A04",
                "Match": true
            },
            "SellerID": {
                "ValA": "A05",
                "ValB": "A05",
                "Match": true
            },
            "TradeType": {
                "ValA": "A06",
                "ValB": "A06",
                "Match": false
            },
            "MarketType": {
                "ValA": "A07",
                "ValB": "A07",
                "Match": false
            },
            "Price": {
                "ValA": "A08",
                "ValB": "A08",
                "Match": true
            },
            "PriceUOM": {
                "ValA": "A09",
                "ValB": "A09",
                "Match": false
            },
            "Quantity": {
                "ValA": "A10",
                "ValB": "A10",
                "Match": false
            },
            "QuantityUOM": {
                "ValA": "A11",
                "ValB": "A11",
                "Match": false
            },
            "TotalQuantity": {
                "ValA": "A12",
                "ValB": "A12",
                "Match": true
            },
            "TotalQuantityUOM": {
                "ValA": "A13",
                "ValB": "A13",
                "Match": true
            },
            "TradeDate": {
                "ValA": "A14",
                "ValB": "A14",
                "Match": true
            },
            "StartDate": {
                "ValA": "A15",
                "ValB": "A15",
                "Match": false
            },
            "EndDate": {
                "ValA": "A16",
                "ValB": "A16",
                "Match": true
            },
            "ProductCode": {
                "ValA": "A17",
                "ValB": "A17",
                "Match": true
            },
            "DeliveryLocation": {
                "ValA": "A18",
                "ValB": "A18",
                "Match": true
            },
            "PaymetDays": {
                "ValA": "A19",
                "ValB": "A19",
                "Match": false
            },
            "PaymentTerms": {
                "ValA": "A20",
                "ValB": "A20",
                "Match": true
            },
            "Mot": {
                "ValA": "A21",
                "ValB": "A21",
                "Match": true
            },
            "Owner": {
                "ValA": "A22",
                "ValB": "A22",
                "Match": false
            },
            "OwnerName": {
                "ValA": "A23",
                "ValB": "A23",
                "Match": false
            },
            "CreatorUser": {
                "ValA": "A24",
                "ValB": "A24",
                "Match": false
            },
            "TradeStatus": {
                "ValA": "A25",
                "ValB": "A25",
                "Match": false
            },
            "CreationTimestamp": {
                "ValA": "2017-04-24 08:44:25.495732836 +0000 UTC",
                "ValB": "2017-04-24 08:44:39.221772715 +0000 UTC",
                "Match": false
            },
            "DealStatus": "Pending"
        },{
            "TradeNumber": {
                "ValA": "Shell",
                "ValB": "A01",
                "Match": false
            },
            "BuyerName": {
                "ValA": "A02",
                "ValB": "A02",
                "Match": false
            },
            "SellerName": {
                "ValA": "A03",
                "ValB": "A03",
                "Match": false
            },
            "BuyerID": {
                "ValA": "A04",
                "ValB": "A04",
                "Match": true
            },
            "SellerID": {
                "ValA": "A05",
                "ValB": "A05",
                "Match": true
            },
            "TradeType": {
                "ValA": "A06",
                "ValB": "A06",
                "Match": false
            },
            "MarketType": {
                "ValA": "A07",
                "ValB": "A07",
                "Match": false
            },
            "Price": {
                "ValA": "A08",
                "ValB": "A08",
                "Match": true
            },
            "PriceUOM": {
                "ValA": "A09",
                "ValB": "A09",
                "Match": false
            },
            "Quantity": {
                "ValA": "A10",
                "ValB": "A10",
                "Match": false
            },
            "QuantityUOM": {
                "ValA": "A11",
                "ValB": "A11",
                "Match": false
            },
            "TotalQuantity": {
                "ValA": "A12",
                "ValB": "A12",
                "Match": true
            },
            "TotalQuantityUOM": {
                "ValA": "A13",
                "ValB": "A13",
                "Match": true
            },
            "TradeDate": {
                "ValA": "A14",
                "ValB": "A14",
                "Match": true
            },
            "StartDate": {
                "ValA": "A15",
                "ValB": "A15",
                "Match": false
            },
            "EndDate": {
                "ValA": "A16",
                "ValB": "A16",
                "Match": true
            },
            "ProductCode": {
                "ValA": "A17",
                "ValB": "A17",
                "Match": true
            },
            "DeliveryLocation": {
                "ValA": "A18",
                "ValB": "A18",
                "Match": true
            },
            "PaymetDays": {
                "ValA": "A19",
                "ValB": "A19",
                "Match": false
            },
            "PaymentTerms": {
                "ValA": "A20",
                "ValB": "A20",
                "Match": true
            },
            "Mot": {
                "ValA": "A21",
                "ValB": "A21",
                "Match": true
            },
            "Owner": {
                "ValA": "A22",
                "ValB": "A22",
                "Match": false
            },
            "OwnerName": {
                "ValA": "A23",
                "ValB": "A23",
                "Match": false
            },
            "CreatorUser": {
                "ValA": "A24",
                "ValB": "A24",
                "Match": false
            },
            "TradeStatus": {
                "ValA": "A25",
                "ValB": "A25",
                "Match": false
            },
            "CreationTimestamp": {
                "ValA": "2017-04-24 08:44:25.495732836 +0000 UTC",
                "ValB": "2017-04-24 08:44:39.221772715 +0000 UTC",
                "Match": false
            },
            "DealStatus": "Pending"
        }, {
            "TradeNumber": {
                "ValA": "Nippon 22",
                "ValB": "A01",
                "Match": false
            },
            "BuyerName": {
                "ValA": "A02",
                "ValB": "A02",
                "Match": false
            },
            "SellerName": {
                "ValA": "A03",
                "ValB": "A03",
                "Match": false
            },
            "BuyerID": {
                "ValA": "A04",
                "ValB": "A04",
                "Match": true
            },
            "SellerID": {
                "ValA": "A05",
                "ValB": "A05",
                "Match": true
            },
            "TradeType": {
                "ValA": "A06",
                "ValB": "A06",
                "Match": false
            },
            "MarketType": {
                "ValA": "A07",
                "ValB": "A07",
                "Match": false
            },
            "Price": {
                "ValA": "A08",
                "ValB": "A08",
                "Match": true
            },
            "PriceUOM": {
                "ValA": "A09",
                "ValB": "A09",
                "Match": false
            },
            "Quantity": {
                "ValA": "A10",
                "ValB": "A10",
                "Match": false
            },
            "QuantityUOM": {
                "ValA": "A11",
                "ValB": "A11",
                "Match": false
            },
            "TotalQuantity": {
                "ValA": "A12",
                "ValB": "A12",
                "Match": true
            },
            "TotalQuantityUOM": {
                "ValA": "A13",
                "ValB": "A13",
                "Match": true
            },
            "TradeDate": {
                "ValA": "A14",
                "ValB": "A14",
                "Match": true
            },
            "StartDate": {
                "ValA": "A15",
                "ValB": "A15",
                "Match": false
            },
            "EndDate": {
                "ValA": "A16",
                "ValB": "A16",
                "Match": true
            },
            "ProductCode": {
                "ValA": "A17",
                "ValB": "A17",
                "Match": true
            },
            "DeliveryLocation": {
                "ValA": "A18",
                "ValB": "A18",
                "Match": true
            },
            "PaymetDays": {
                "ValA": "A19",
                "ValB": "A19",
                "Match": false
            },
            "PaymentTerms": {
                "ValA": "A20",
                "ValB": "A20",
                "Match": true
            },
            "Mot": {
                "ValA": "A21",
                "ValB": "A21",
                "Match": true
            },
            "Owner": {
                "ValA": "A22",
                "ValB": "A22",
                "Match": false
            },
            "OwnerName": {
                "ValA": "A23",
                "ValB": "A23",
                "Match": false
            },
            "CreatorUser": {
                "ValA": "A24",
                "ValB": "A24",
                "Match": false
            },
            "TradeStatus": {
                "ValA": "A25",
                "ValB": "A25",
                "Match": false
            },
            "CreationTimestamp": {
                "ValA": "2017-04-24 08:44:25.495732836 +0000 UTC",
                "ValB": "2017-04-24 08:44:39.221772715 +0000 UTC",
                "Match": false
            },
            "DealStatus": "Unmatched"
        }]));
    });

    //load matched data
    app.post('/matchingData', function (request, response) {
        const params = request.body;

        response.setHeader('Content-Type', 'application/json');

        response.send(JSON.stringify({
            "TradeNumber": {
                "ValA": "A01",
                "ValB": "A01",
                "Match": false
            },
            "BuyerName": {
                "ValA": "A02",
                "ValB": "A02",
                "Match": false
            },
            "SellerName": {
                "ValA": "A03",
                "ValB": "A03",
                "Match": false
            },
            "BuyerID": {
                "ValA": "A04",
                "ValB": "A04",
                "Match": true
            },
            "SellerID": {
                "ValA": "A05",
                "ValB": "A05",
                "Match": true
            },
            "TradeType": {
                "ValA": "A06",
                "ValB": "A06",
                "Match": false
            },
            "MarketType": {
                "ValA": "A07",
                "ValB": "A07",
                "Match": false
            },
            "Price": {
                "ValA": "A08",
                "ValB": "A08",
                "Match": true
            },
            "PriceUOM": {
                "ValA": "A09",
                "ValB": "A09",
                "Match": false
            },
            "Quantity": {
                "ValA": "A10",
                "ValB": "A10",
                "Match": false
            },
            "QuantityUOM": {
                "ValA": "A11",
                "ValB": "A11",
                "Match": false
            },
            "TotalQuantity": {
                "ValA": "A12",
                "ValB": "A12",
                "Match": true
            },
            "TotalQuantityUOM": {
                "ValA": "A13",
                "ValB": "A13",
                "Match": true
            },
            "TradeDate": {
                "ValA": "A14",
                "ValB": "A14",
                "Match": true
            },
            "StartDate": {
                "ValA": "A15",
                "ValB": "A15",
                "Match": false
            },
            "EndDate": {
                "ValA": "A16",
                "ValB": "A16",
                "Match": true
            },
            "ProductCode": {
                "ValA": "A17",
                "ValB": "A17",
                "Match": true
            },
            "DeliveryLocation": {
                "ValA": "A18",
                "ValB": "A18",
                "Match": true
            },
            "PaymetDays": {
                "ValA": "A19",
                "ValB": "A19",
                "Match": false
            },
            "PaymentTerms": {
                "ValA": "A20",
                "ValB": "A20",
                "Match": true
            },
            "Mot": {
                "ValA": "A21",
                "ValB": "A21",
                "Match": true
            },
            "Owner": {
                "ValA": "A22",
                "ValB": "A22",
                "Match": false
            },
            "CreatorUser": {
                "ValA": "A23",
                "ValB": "A23",
                "Match": false
            },
            "CreationTimestamp": {
                "ValA": "2017-04-18 09:40:38.380852684 +0000 UTC",
                "ValB": "2017-04-18 09:42:30.822722935 +0000 UTC",
                "Match": false
            },
            "DealStatus": "Matched"
        }
        ));
    });

    //add trador data
    app.post('/addTrador', function (request, response) {
        //const params = request.body;
        const params = {
            tradeNumber: "SHLTR16TB0342:1",
            buyerName: "Chevron Products a Division of Chevorn USA",
            sellerName: "Indian Oil Corporation",
            buyerID: "CHV",
            sellerID: "IOC",
            tradeType: "Date Pipeline Fixed price",
            marketType: "Physical Crude Oil",
            price: "1000",
            priceUOM: "BBL",
            quantity: "10",
            quantityUOM: "BBL",
            totalQuantity: "30000",
            totalQuantityUOM: "BBL",
            tradeDate: "24-04-2016",
            startDate: "24-04-2016",
            endDate: "28-04-2016",
            productCode: "MARS",
            deliveryLocation: "Clovelly",
            paymetDays: "20",
            paymentTerms: "20FFMD",
            mot: "Pipeline",
            owner: "CHV", //owner id (Buyer id)
            ownerName: "Chevron Products a Division of Chevorn USA", //owner name (Buyer name)
            creatorUser: "1", //user id 
            tradeStatus: "Active"
        }

        const form = [
            "add",
            params.tradeNumber,
            params.buyerName,
            params.sellerName,
            params.buyerID,
            params.sellerID,
            params.tradeType,
            params.marketType,
            params.price,
            params.priceUOM,
            params.quantity,
            params.quantityUOM,
            params.totalQuantity,
            params.totalQuantityUOM,
            params.tradeDate,
            params.startDate,
            params.endDate,
            params.productCode,
            params.deliveryLocation,
            params.paymetDays,
            params.paymentTerms,
            params.mot,
            params.owner,
            params.ownerName,
            params.creatorUser,
            params.tradeStatus,
        ];

        response.setHeader('Content-Type', 'application/json');
        response.send(JSON.stringify({ "envstatus" : "success", "bustatus" : "pending","message" : "Trade added successfully" }));
    });

}

// Handles all routes so you do not get a not found error
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

app.listen(port)
console.log("server started on port " + port)
