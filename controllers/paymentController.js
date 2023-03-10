const Buyer = require('../models/buyer.model')
const dotenv = require("dotenv");
const axios = require('axios');
const paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY)
dotenv.config();
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const BASE_URL = 'https://api.paystack.co';


const handlePaystackPayment = async (req, res) => {
  const { email, item, amount } = req.body;

  const params = {
    email,
    amount,
    callback_url: `http://127.0.0.1:5500/public/index.html`, //user will be directed to this route when payment is successful
    metadata: {
      cancel_action: "http://localhost:3000", //user will be directed to this route once payment fails
      cartItem: item,
    },
  };

  paystack.transaction.initialize(params, (error, response) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        message: 'An error occurred while initializing the transaction',
      });
    }

    const buyer = Buyer.create({ userEmail: email, paymentReference: response.data.reference, totalAmount: amount, productName: item })
    return res.status(200).json({ response, buyer });
  });
}

const handlePaystackPaymentVerification = async (req, res) => {
  const reference = req.params.reference;
  paystack.transaction.verify(reference, (error, response) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        message: 'An error occurred while verifying the transaction',
      });
    }


    return res.status(200).json(response);
  });
};
//create customer
const createCustomer = async (req, res) => {
  const { email, firstName, lastName, phone } = req.body
  const plan = "PLN_mcpt6afwbkizv3v"
  try {
    const response = await axios.post(`${BASE_URL}/customer`, {
      email,
      firstName,
      lastName,
      phone
    }, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    })
    const customer = response.data.data.customer_code
    const subscribe = await axios.post(`${BASE_URL}/subscription`, {
      customer,
      plan
    }, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    res.status(201).json(subscribe.data)
  } catch (error) {
    res.status(500).json(error.message)
  }
}
const createPlan = async (req, res) => {
  const payload = req.body
  try {
    const response = await axios.post(`${BASE_URL}/plan`, payload, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        // 'Content-Type': 'application/json',
      },
    });

    res.status(201).json(response.data)
  } catch (error) {
    console.error(error.message);
    throw new Error('Could not create plan');
  }
}

// Create subscription
const createSubscription = async (req, res) => {
  const { email } = req.body
  const plan = "PLN_mcpt6afwbkizv3v"
  const customer = "CUS_stxkdgsg0rhur26"

  try {
    const subscribe = await axios.post(`${BASE_URL}/subscription`, {
      customer,
      plan
    }, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    res.status(201).json(subscribe.data)
  } catch (error) {
    res.status(500).json(error.message)
  }
};


module.exports = { handlePaystackPayment, handlePaystackPaymentVerification, createSubscription, createCustomer, createPlan };

