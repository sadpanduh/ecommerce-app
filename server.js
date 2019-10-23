const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

if (process.env !== 'production') {
    require('dotenv').config();
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//instantiate a new express application
const app = express();
//the PORT will get set by the host (Heroku) and localhost port 5000 for local
const port = process.env.PORT || 5000;

//app.use sets the app to use them
//convert the requests bodys to JSON so we can use it
app.use(bodyParser.json());
//makes sure the url strings we are getting in and passing out dont contain spaces or symbols because urls are strict on what they can have
app.use(bodyParser.urlencoded({ extended: true }))
//CORS cross origin requests, since the front end and back end origins are different this allows them to communicate 
app.use(cors());

if (process.env.NODE_ENV === 'production') {
    //app use this express static middleware function, allows to serve a certain file to this path, of this current dir and pointing to client/build
    //client/build, is what gets built in our build script in our package/json and want to serve all of our static files in there
    app.use(express.static(path.join(__dirname, 'client/build')));

    //when we get any 'get' request, send our static files (HTML/CSS/JS files) 
    //app.get is how we tell our application what the REST parameters for each URL will be
    //REST being either get,post, update, delete
    //give them our index.html file in our build, which holds all of our frontend client code
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, error => {
    if (error) throw error;
    console.log('Server running on port ' + port);
})

app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            //failure status code
            res.status(500).send({ error: stripeErr });
        } else {
            res.status(200).send({ success: stripeRes });
        }
    })
})