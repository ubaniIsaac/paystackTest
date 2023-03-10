const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

//import coustom middlware
const config = require("./utils/config");
const connectDB = require("./utils/dbConn");
const paymentRouter = require('./routes/paymentRouter');


const app = express();
connectDB();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')))
var publicPath = path.join(__dirname, 'public');

app.use('/order', express.static('index.html'))

app.get('/subsribe', function (req, res) {
    res.send(publicPath + '/subscription.html');
});

// app.use('/subscribe', express.static('subscription.html'))
//routes
app.use("/api/payment", paymentRouter);


mongoose.connection.once("open", () => {
    console.log("connected to DB");
    app.listen(config.PORT, () => {
        console.log(`connected to backend - ${config.PORT}`);
    });
});
//with this setup, app won't listen until mongoDB is cconnected. Helps avoid future error
