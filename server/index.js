const express = require('express');
const bodyParser = require('body-parser');
const converter = require('json-2-csv');
const path = require("path");
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/api", (_, res) => {
    const options = {
        root: path.join(`${__dirname}`)
    };
     
    var fileName = 'ocena.csv';
    res.sendFile(fileName, options, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
})

app.post("/api", (req, res) => {
    converter.json2csv(req.body, (err, csv) => {
        if (err) {
            throw err
        }
        fs.writeFileSync('server/ocena.csv', csv);
        res.sendStatus(200);
    });

})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})