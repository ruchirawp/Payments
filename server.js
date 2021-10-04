const express = require("express");
const app = express();
// This is your real test secret API key.
const stripe = require("stripe")("sk_test_51JgDERHLYdmDsJss20dP6PAp0FYDX3D0uSrfVzBArPGEMqSKrO8YV7FGe4SaV0ZTnRhPGazhlBaKYbd8Wlv1pKb000jKjNqWfP");

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });

});


//Sending an Invoice to the customer
app.post("/invoice", async (req, res) => {

  //Retrieving a Customer using their customer ID
  const customer = await stripe.customers.retrieve(
    'cus_KLJnUw787WMvdJ'
  );

//Creating a Product 
  const product = await stripe.products.create({
    name: 'Mask',
  });

  //Creating a Price 
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: 1000,
    currency: 'usd',

  });

  //Creating an Invoice Item for a customer with a price amount 
  const invoiceItem = await stripe.invoiceItems.create({
    customer: customer.id,
    price: price.unit_amount,
  });

  //Creating the Invoice 
  const invoice = await stripe.invoices.create({
    customer: customer.id,
    auto_advance: true, // Auto-finalize this draft after ~1 hour
  });


  res.send({
    msg: "invoice sent"
  });


});


app.listen(4242, () => console.log('Node server listening on port 4242!'));

