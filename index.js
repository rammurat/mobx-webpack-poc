const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const CONFIG = require('./config');

const port = CONFIG.port || 3000;
const app = express();

// serve static assets normally
app.use(express.static(__dirname + '/' + CONFIG.webDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//bind backend APIs with server
if(!CONFIG.isLocalServer){
    const query = require('./query.js');
    
    //bind local methods with server
    app.post('/listingData', function (request, response){
        const params = request.body;

        console.log(params);
        response.setHeader('Content-Type', 'application/json');
        response.send(JSON.stringify([{
                id : Date.now() + "_" + Math.random(), 
                tradeType:"SHLTR16TB0342:1",  
                marketType:"Chevron Products Company, a division of Chevron USA Inc.", 
                direction:"Chevron Products Company, a division of Chevron USA Inc.",   
                price:"90",   
                priceUOM:"USD/BBL",   
                quantity:"100000",    
                quantityUOM:"BBl",    
                totalQuantity:"10000",  
                totalQuantityUOM:"BBl",   
                tradedate:"15-3-2017",  
                startDate:"1-Apr",  
                endDate:"30-Apr",    
                productCode:"MARS",    
                deliveryLocation:"Clovelly",   
                paymetDays:"20", 
                paymentTerms:"",   
                mOT:"Pipeline", 
                dealStatus:"ACTIVE"
                },{
                id : Date.now() + "_" + Math.random(),
                tradeType:"SHLTR16TB0342:2",  
                marketType:"Chevron Products Company, ", 
                direction:"Chevron Products Company, a division of Chevron USA Inc.",   
                price:"90",   
                priceUOM:"USD/BBL",   
                quantity:"30000",    
                quantityUOM:"BBl",    
                totalQuantity:"30000",  
                totalQuantityUOM:"BBl",   
                tradedate:"15-3-2017",  
                startDate:"1-Apr",  
                endDate:"30-Apr",    
                productCode:"MARS",    
                deliveryLocation:"Clovelly",   
                paymetDays:"20", 
                paymentTerms:"",   
                mOT:"Pipeline", 
                dealStatus:"ACTIVE"
            }]
        ))
    });

    //load matched data
    app.post('/matchingData', function (request, response){
        const params = request.body;
        const data = query.getContractData(params.contractId);

        console.log(params);

        data.then(function(jsonData){
            response.setHeader('Content-Type', 'application/json');
            response.send(jsonData);
        });
    });

    //add trador data
    app.post('/addTrador', function (request, response){
        //const params = request.body;
        
        const params = {
            tradeNumber : "SHLTR16TB0342:1",
            buyerName : "Chevron Products a Division of Chevorn USA",
            sellerName : "Chevron Products Company, a division of Chevron USA Inc.",
            buyerID : "1",
            sellerID : "2",
            tradeType : "Date Pipeline Fixed price",
            marketType : "Physical Crude Oil",
            price : "1000",
            priceUOM : "BBL",
            quantity : "10",
            quantityUOM : "BBL",
            totalQuantity : "30000",
            totalQuantityUOM : "BBL",
            tradeDate : "24-04-2016",
            startDate : "24-04-2016",
            endDate : "28-04-2016",
            productCode : "MARS",
            deliveryLocation : "Clovelly",
            paymetDays : "20",
            paymentTerms : "20FFMD",
            mot : "Pipeline",
            owner : "1", //owner id (Buyer id)
            ownerName : "Chevron Products a Division of Chevorn USA", //owner name (Buyer name)
            creatorUser : "1", //user id 
            tradeStatus : "?",	
            creationTimestamp : "?", 
            dealStatus : "Active"
        }
        
        const form = {
            TradeNumber :       params.tradeNumber,
            BuyerName   :		params.buyerName,
            SellerName  :		params.sellerName,
            BuyerID		:		params.buyerID,
            SellerID	:		params.sellerID,
            TradeType	:		params.tradeType,
            MarketType	:		params.marketType,
            Price 		:		params.price,
            PriceUOM 	:		params.priceUOM,
            Quantity 	:		params.quantity,
            QuantityUOM :		params.quantityUOM,
            TotalQuantity: 		params.totalQuantity,
            TotalQuantityUOM: 	params.totalQuantityUOM,
            TradeDate 		:	params.tradeDate,
            StartDate 		:	params.startDate,
            EndDate 		:	params.endDate,
            ProductCode 	:	params.productCode,
            DeliveryLocation :	params.deliveryLocation,
            PaymetDays 		:	params.paymetDays,
            PaymentTerms 	:	params.paymentTerms,
            Mot 			:	params.mot,
            Owner 			:	params.owner,
            OwnerName		:	params.ownerName,
            CreatorUser 	:	params.creatorUser,
            TradeStatus		:	params.tradeStatus,	
            CreationTimestamp :	params.creationTimestamp, 
            DealStatus 	:	    params.dealStatus,			
        };
        
        const data = query.addTrador(form);

        data.then(function(jsonData){
            response.setHeader('Content-Type', 'application/json');
            response.send(jsonData);
        });

    });


}else{
    //bind local methods with server
    app.post('/listingData', function (request, response){
        const params = request.body;

        console.log(params);
        response.setHeader('Content-Type', 'application/json');
        response.send(JSON.stringify([{
                id : Date.now() + "_" + Math.random(), 
                tradeType:"SHLTR16TB0342:1",  
                marketType:"Chevron Products Company, a division of Chevron USA Inc.", 
                direction:"Chevron Products Company, a division of Chevron USA Inc.",   
                price:"90",   
                priceUOM:"USD/BBL",   
                quantity:"100000",    
                quantityUOM:"BBl",    
                totalQuantity:"10000",  
                totalQuantityUOM:"BBl",   
                tradedate:"15-3-2017",  
                startDate:"1-Apr",  
                endDate:"30-Apr",    
                productCode:"MARS",    
                deliveryLocation:"Clovelly",   
                paymetDays:"20", 
                paymentTerms:"",   
                mOT:"Pipeline", 
                dealStatus:"ACTIVE"
                },{
                id : Date.now() + "_" + Math.random(),
                tradeType:"SHLTR16TB0342:2",  
                marketType:"Chevron Products Company, ", 
                direction:"Chevron Products Company, a division of Chevron USA Inc.",   
                price:"90",   
                priceUOM:"USD/BBL",   
                quantity:"30000",    
                quantityUOM:"BBl",    
                totalQuantity:"30000",  
                totalQuantityUOM:"BBl",   
                tradedate:"15-3-2017",  
                startDate:"1-Apr",  
                endDate:"30-Apr",    
                productCode:"MARS",    
                deliveryLocation:"Clovelly",   
                paymetDays:"20", 
                paymentTerms:"",   
                mOT:"Pipeline", 
                dealStatus:"ACTIVE"
            }]
        ))
    });

    //load matched data
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

    //add trador data
    app.post('/addTrador', function (request, response){
        //const params = request.body;
        
        const params = {
            tradeNumber : "SHLTR16TB0342:1",
            buyerName : "Chevron Products a Division of Chevorn USA",
            sellerName : "Chevron Products Company, a division of Chevron USA Inc.",
            buyerID : "1",
            sellerID : "2",
            tradeType : "Date Pipeline Fixed price",
            marketType : "Physical Crude Oil",
            price : "1000",
            priceUOM : "BBL",
            quantity : "10",
            quantityUOM : "BBL",
            totalQuantity : "30000",
            totalQuantityUOM : "BBL",
            tradeDate : "24-04-2016",
            startDate : "24-04-2016",
            endDate : "28-04-2016",
            productCode : "MARS",
            deliveryLocation : "Clovelly",
            paymetDays : "20",
            paymentTerms : "20FFMD",
            mot : "Pipeline",
            owner : "1", //owner id (Buyer id)
            ownerName : "Chevron Products a Division of Chevorn USA", //owner name (Buyer name)
            creatorUser : "1", //user id 
            tradeStatus : "?",	
            creationTimestamp : "?", 
            dealStatus : "Active"
        }
        
        const form = {
            TradeNumber :       params.tradeNumber,
            BuyerName   :		params.buyerName,
            SellerName  :		params.sellerName,
            BuyerID		:		params.buyerID,
            SellerID	:		params.sellerID,
            TradeType	:		params.tradeType,
            MarketType	:		params.marketType,
            Price 		:		params.price,
            PriceUOM 	:		params.priceUOM,
            Quantity 	:		params.quantity,
            QuantityUOM :		params.quantityUOM,
            TotalQuantity: 		params.totalQuantity,
            TotalQuantityUOM: 	params.totalQuantityUOM,
            TradeDate 		:	params.tradeDate,
            StartDate 		:	params.startDate,
            EndDate 		:	params.endDate,
            ProductCode 	:	params.productCode,
            DeliveryLocation :	params.deliveryLocation,
            PaymetDays 		:	params.paymetDays,
            PaymentTerms 	:	params.paymentTerms,
            Mot 			:	params.mot,
            Owner 			:	params.owner,
            OwnerName		:	params.ownerName,
            CreatorUser 	:	params.creatorUser,
            TradeStatus		:	params.tradeStatus,	
            CreationTimestamp :	params.creationTimestamp, 
            DealStatus 	:	    params.dealStatus,			
        };
        

        response.setHeader('Content-Type', 'application/json');
        response.send(JSON.stringify({id:1}));
    });

}

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
