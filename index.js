const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
//const query = require('./query.js');

// serve static assets normally
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//load listing data from backend service 
//query.getContractListData("A01");

//submit trade form data to service 
//query.addContractData();

//load matching data from backend 
// app.get('/matchingData', function (request, response){
//     const params = req.body;
// 	const data = query.getContractData(params.contractId);

// 	data.then(function(matchData){
// 		console.log(matchData)
// 		response matchData;
// 	})
// });

app.post('/matchingData', function (request, response){
    const params = request.body;

	console.log(params);
	response.setHeader('Content-Type', 'application/json');
	response.send(JSON.stringify({
        "TradeNumber":{
            "ValA":"A01",
            "ValB":"A01",
            "Match":false
        },
        "BuyerName":{
            "ValA":"A02",
            "ValB":"A02",
            "Match":false
        },
        "SellerName":{
            "ValA":"A03",
            "ValB":"A03",
            "Match":false
        },
        "BuyerID":{
            "ValA":"A04",
            "ValB":"A04",
            "Match":true
        },
        "SellerID":{
            "ValA":"A05",
            "ValB":"A05",
            "Match":true
        },
        "TradeType":{
            "ValA":"A06",
            "ValB":"A06",
            "Match":false
        },
        "MarketType":{
            "ValA":"A07",
            "ValB":"A07",
            "Match":false
        },
        "Price":{
            "ValA":"A08",
            "ValB":"A08",
            "Match":true
        },
        "PriceUOM":{
            "ValA":"A09",
            "ValB":"A09",
            "Match":false
        },
        "Quantity":{
            "ValA":"A10",
            "ValB":"A10",
            "Match":false
        },
        "QuantityUOM":{
            "ValA":"A11",
            "ValB":"A11",
            "Match":false
        },
        "TotalQuantity":{
            "ValA":"A12",
            "ValB":"A12",
            "Match":true
        },
        "TotalQuantityUOM":{
            "ValA":"A13",
            "ValB":"A13",
            "Match":true
        },
        "TradeDate":{
            "ValA":"A14",
            "ValB":"A14",
            "Match":true
        },
        "StartDate":{
            "ValA":"A15",
            "ValB":"A15",
            "Match":false
        },
        "EndDate":{
            "ValA":"A16",
            "ValB":"A16",
            "Match":true
        },
        "ProductCode":{
            "ValA":"A17",
            "ValB":"A17",
            "Match":true
        },
        "DeliveryLocation":{
            "ValA":"A18",
            "ValB":"A18",
            "Match":true
        },
        "PaymetDays":{
            "ValA":"A19",
            "ValB":"A19",
            "Match":false
        },
        "PaymentTerms":{
            "ValA":"A20",
            "ValB":"A20",
            "Match":true
        },
        "Mot":{
            "ValA":"A21",
            "ValB":"A21",
            "Match":true
        },
        "Owner":{
            "ValA":"A22",
            "ValB":"A22",
            "Match":false
        },
        "CreatorUser":{
            "ValA":"A23",
            "ValB":"A23",
            "Match":false
        },
        "CreationTimestamp":{
            "ValA":"2017-04-18 09:40:38.380852684 +0000 UTC",
            "ValB":"2017-04-18 09:42:30.822722935 +0000 UTC",
            "Match":false
        },
        "DealStatus":"Matched"
    }
	))
});


// Handles all routes so you do not get a not found error
app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

//Validate user login credentials 
app.post('/login', function(req, res) {
	let data = req.body;
    
	console.log(data);
	
    //validate user credentials
    if (data && data.username === "admin" && data.password === "admin") {
		res.status(201).send(JSON.stringify({ success: true }));
	} else {
		res.status(200).send(JSON.stringify({ success: false, error: "User not valid" }));
	}
});


app.listen(port)
console.log("server started on port " + port)
