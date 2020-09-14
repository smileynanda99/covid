//jshint esversion:6
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");
const mongoose = require("mongoose");

const port = 3000;

const app = express();
//default gragh data
var dataArray = [7, 19, 33, 67, 37, 25, 39, 56, 42, 69];
var labelArray = ["05/09/2020", "06/09/2020", "07/09/2020", "08/09/2020", "09/09/2020", "10/09/2020", "11/09/2020", "12/09/2020", "13/09/2020", "14/09/2020"];

mongoose.connect("mongodb+srv://admin-teamJs:teamjs@99@cluster0.lxra1.mongodb.net/Covid19DB", { useNewUrlParser: true, useUnifiedTopology: true });
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

var helpNumber = [];
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/gragh", (req, res) => {
    res.render("gragh");
});


// Patient.find({ state: req.body.state, age: { $gte: 1980, $lte: 1989 } }, (err, result) => {

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
    const date1 = req.body.date1;
    const date2 = req.body.date2;
    var date1Array = date1.split("-");
    var date2Array = date2.split("-");
    for (var y = date1Array[0]; y <= date2Array[0]; y++) {
        var d = date1Array[1];
        for (var m = date1Array[1]; m <= date2Array[1]; m++) {
            if (m == date2Array[1]) {
                for (d; d <= date2Array[2]; d++) {
                    console.log(date = +"d");
                    var userDate = d + "/" + m + "/" + y;
                    Patient.find({ state: req.body.state, date: userDate, age: { $gt: age1, $lt: age2 } }, (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            // console.log(state, userDate, age1 + " " + age2);
                            console.log(result)
                        }
                    });
                }
            } else {
                for (d; d <= 31; d++) {
                    console.log(date = +"d");
                    var userDate = d + "/" + m + "/" + y;
                    Patient.find({ state: req.body.state, date: userDate, age: { $gt: age1, $lt: age2 } }, (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            // console.log(state, userDate, age1 + " " + age2);
                            console.log(result)
                        }
                    });
                }
                d = 1;
            }
        }
    }
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