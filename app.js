const express = require("express");
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());

app.listen(3000, function() {
	console.log("Application is listening on port 3000");
})
app.use(express.static('public'));

var loyalty = '';

app.get('/getLoyalty', function(req, res, next){
	res.send(loyalty);
});

app.post('/loyalty', function(req, res, next) {
	console.log("req.data: " + req.body);
	loyalty = req.body;
	res.send(loyalty);
});

module.exports = app;


// 1: Get email and order cost from post request.
// 2: Divide order cost by 5 and round down to closest integer.
// 3: multiply result from step 2 by .5.
// 4. get record from db with matching email from step 1.
// 5. If there is a record with matching email, add integer from step 3 to points value.
// 	  If there is no matching record then the points value will equal the integer from step 3.
// 6. If the points value is greater than 20, subtract 20 from points value and the remainder will be the new points value.
// 7. Update record, or insert if new record, with email and new point value.
// 8. If step 6 was necessary, send email with $10 giftcard to the email from step 1.

