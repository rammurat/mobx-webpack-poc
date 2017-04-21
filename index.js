const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
const query = require('./query.js');

// serve static assets normally
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//load listing data from backend service 
//query.getContractListData("A01");

//submit trade form data to service 
//query.addContractData();

//load matching data from backend 

var data = query.getContractData("A01");

data.then(function(matchData){
	console.log(d)
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
