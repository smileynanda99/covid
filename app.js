//jshint esversion:6
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const port = 3000;

const app = express();
//default gragh data
var dataArray = [];
var labelArray = [];

//mongoose.connect("mongodb+srv://admin-teamJs:teamjs@99@cluster0.lxra1.mongodb.net/Covid19DB", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect("mongodb://localhost:27017/Covid19DB", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);
const dataSchema = new mongoose.Schema({
    patientId: Number,
    reportedOn: String,
    onsetEstimate: String,
    ageEstimate: Number,
    gender: String,
    city: String,
    district: String,
    state: String,
    status: String,
    notes: String,
    contractedFrom: String
});


const Patient = new mongoose.model("Patient", dataSchema);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Patient.find({ state: "Rajasthan" }, (err, result) => {
//     if (err) {
//         console.log(err);
//     } else {
//         // console.log(result);
//         dataArray.push(result.length);
//     }
// });
// console.log(dataArray);

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/gragh", (req, res) => {
    res.render("gragh");
});


app.post("/data", (req, res) => {
    var age1 = 0;
    var age2 = 0;
    if (req.body.age != "70") {
        age2 = req.body.age;
        age1 = age2 - 9;
    } else {
        age1 = 70;
        age2 = 100;
    }

    const state = req.body.state;
    var date1 = date.date_formate(new Date(req.body.date1));
    var date2 = date.date_formate(new Date(req.body.date2));
    dataArray = [];
    labelArray = [];
    for (date1; date.dates_compare(date1, date2);) {
        Patient.find({ state: state, date: date1 }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(result);
                dataArray.push(result.length);
            }
        });
        //console.log(date1, date2);
        labelArray.push(date1);
        date1 = date.date_increment(date1);
    }
    console.log(dataArray);
    console.log(labelArray);
    res.redirect("/gragh");

});

app.get("/data", (req, res) => {
    res.send({
        labelArray: labelArray,
        dataArray: dataArray
    });
});

app.get("/notification", (req, res) => {
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