const express = require("express");
const router = express.Router();

const { handlePaystackPayment, handlePaystackPaymentVerification, createSubscription, createCustomer, createPlan } = require("../controllers/paymentController");

//post reqs
router.post('/paystack', handlePaystackPayment);
router.post('/paystack/subscription', createSubscription);
router.post('/paystack/customer', createCustomer);
router.post('/paystack/plan', createPlan);
router.get('/paystack/verify/:reference', handlePaystackPaymentVerification);

module.exports = router