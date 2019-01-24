const express = require('express');
const bodyParser = require('body-parser@1.18.3');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

const process = function (req, res) {
	// 1 point for every $5 spent.
	let pointsAdded = Math.floor(req.body.orders[0].sub_total_price / 5);
	req.webtaskContext.storage.get( function (error, data) {
		if (error) return error;
		// check data for existing user
		let newData = data;
		let existingUserIndex;
		let newTotalPoints;
		for (let i = 0; i < newData.customerLoyaltyPoints.length; i++) {
			if (newData.customerLoyaltyPoints[i].email === req.body.orders[0].client_email) {
				existingUserIndex = i;
				break;
			}
		}

		if (typeof existingUserIndex === "number") {
			newTotalPoints = newData.customerLoyaltyPoints[existingUserIndex].points + pointsAdded;
			newData.customerLoyaltyPoints[existingUserIndex].points = newTotalPoints;
		} else {
			let newCustomer = {
				email: req.body.orders[0].client_email,
				points: pointsAdded
			};
			newData.customerLoyaltyPoints.push(newCustomer);
			newTotalPoints = pointsAdded;
		}
	
		req.webtaskContext.storage.set(newData, function (err) {
			if (error) return err;
			const transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
		  		user: 'aimprota30@gmail.com',
		  		pass: 'sawchdrqjkhjtoki'
	  		}
			});

			var mailOptions = {
	  		from: 'aimprota30@gmail.com',
	  		to: req.body.orders[0].client_email,
	  		subject: 'Thank You For Your Order',
	  		text: "We have received and processed your order. The total was $" + req.body.orders[0].total_price + ". We have also added " + pointsAdded + " points to your account, which now has a total of " + newTotalPoints + " points."
			};

			transporter.sendMail(mailOptions, function(failed, info){
	  		if (failed) {
					res.send({
						message: 'error',
						error: failed
					});
	  		} else {
					res.send({
						message: 'sent',
						info: info
					});
	  		}
			});
		});
	});
};

app.post('/', process);
module.exports = app;
