const fs = require('fs').promises
const express = require('express')
const axios = require('axios');
const https = require('https');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express()
var port = process.env.PORT || '3000';

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Live PCR Data")
})


app.get('/getPcrData', async (req, res) => {
    const url = "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY"

    const agent = new https.Agent({
        rejectUnauthorized: false, // Ignore SSL certificate errors
    });

    try {
        const response = await axios.get(url,{
            httpsAgent: agent,
        });
        res.send(response)
    } catch (error) {
        console.log(error);
    }


})



app.listen(port, () => {
    console.log("Server is running on " + port)
})





// Why not try this one

const fs = require('fs').promises;
const express = require('express');
const axios = require('axios');
const https = require('https');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Live PCR Data");
});

app.get('/getPcrData', async (req, res) => {
    const url = "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY";

    const agent = new https.Agent({
        rejectUnauthorized: false, // Ignore SSL certificate errors
    });

    try {
        const response = await axios.get(url, {
            httpsAgent: agent,
        });
        // Send the response data, not the entire Axios response object
        res.json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
});

app.listen(port, () => {
    console.log("Server is running on " + port);
});
