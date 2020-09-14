//jshint esversion:6
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");

const port = 3000;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var helpNumber = [];
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/gragh", (req, res) => {
    res.render("gragh");
});

app.get("/data", (req, res) => {
    res.send({
        labelArray: ["05/09/2020", "06/09/2020", "07/09/2020", "08/09/2020", "09/09/2020", "10/09/2020", "11/09/2020", "12/09/2020", "13/09/2020", "14/09/2020"],
        dataArray: [7, 19, 33, 67, 37, 25, 39, 56, 42, 69]
    });
});

app.get("/notification", (req, res) => {
    var url = "https://api.rootnet.in/covid19-in/notifications";
    // https.get(url, (response) => {

    //     var data = response.json();
    //     console.log(JSON.stringify(data));
    // });

    res.render("notification");
});

app.get("/hostpitality", (req, res) => {
    res.render("hostpitality");
});

app.get("/helpline", (req, res) => {

    res.render("helpline");
});


app.listen(port || process.env.PORT, () => {
    console.log(`server is running at port :${port}`);
});