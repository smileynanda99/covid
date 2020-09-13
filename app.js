//jshint esversion:6
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const https = require("https");

const port = 3000;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var helpNumber = [];
app.get("/", (req, res) => {
    // res.render("home");
    res.render("home");
});

app.get("/gragh", (req, res) => {
    // res.render("home");
    res.render("gragh");
});

app.get("/notification", (req, res) => {
    // res.render("home");
    res.render("notification");
});

app.get("/hostpitality", (req, res) => {
    // res.render("home");
    res.render("hostpitality");
});

app.get("/helpline", (req, res) => {
    // res.render("home");
    var url = "https://api.rootnet.in/covid19-in/contacts";
    // https.get(url, (response) => {
    //     console.log(response.statusCode);
    //     if (response.statusCode == 200) {
    //         response.on("data", (data) => {
    //             const contactData = JSON.parse(data);
    //             console.log(contactData)
    //                 // var dataArray = contactData.data.contacts.regional;
    //                 // console.log(dataArray);


    //         });
    //     }
    // https.get(url, (response) => {
    //         var data = response.json();
    //         console.log(JSON.stringify(data));
    //     })
    //});



    res.render("helpline"
        // phone: contactData.data.contacts.primary.number,
        //mobile: contactData.data.contacts.primary['number-tollfree']
    );
});


app.listen(port || process.env.PORT, () => {
    console.log(`server is running at port :${port}`);
});








// const csvParse = require("csv-parser");
// const fs = require("fs");

// const csvData = [];

// fs.createReadStream(__dirname + "/covid.csv")
//     .pipe(
//         csvParse({
//             delimiter: ","
//         })
//     )
//     .on("data", (dataRow) => {
//         if (dataRow.state == "Kerala") {
//             csvData.push(dataRow);
//         }
//     })
//     .on("end", () => {
//         console.log(csvData);
//     });