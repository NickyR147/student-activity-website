const express = require("express");
const stripe = require("stripe")("sk_test_51P9ej3K4pfrPfQYL8dYmxIWwm2il7rQq3m9d9k1peIrzge27oCk0t5yiNGC4FUEUQ9LSZZNlVtr6URzOObrth0ga003W2W7y4o");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

const app = express();

//handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//set static folder
app.use(express.static(`${__dirname}/public`));

//index route
app.get("/", (req, res) => {
  res.render("index");
});

//charge route
app.post("/charge", (req, res) => {
  const amount = 900;

  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: "CBS Original Series",
        currency: "usd",
        customer: customer.id
      })
    )
    .then(charge => res.render("success"));
});

const port = process.env.PORT || 7777;

app.listen(port, () => {
  console.log(`Stripe app is live on port ${port}`);
});
