'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const rp = require('request-promise');

app.use('/', express.static('public'));
app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.listen(app.get('port'), function() {
	console.log("logado olha o log !! aquiiiiiiiiiiiiii  TO ONLINEEEE  5000 ")
})



// ROUTES
app.get('/teste', function(req, res) {
	console.log("teste");
	res.send({
 				"messages": [
   								 {"text": "enviando msg facebook"}
									
 							]
			})
});




