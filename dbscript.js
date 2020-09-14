const csvParse = require("csv-parser");
const fs = require("fs");
const mongoose = require("mongoose");

const csvData = [];
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
fs.createReadStream(__dirname + "/covid.csv")
    .pipe(
        csvParse({
            delimiter: ","
        })
    )
    .on("data", (dataRow) => {
        const patient = new Patient({
            patientId: dataRow[0],
            reportedOn: dataRow[1],
            onsetEstimate: dataRow[2],
            ageEstimate: dataRow[3],
            gender: dataRow[4],
            city: dataRow[5],
            district: dataRow[6],
            state: dataRow[7],
            status: dataRow[8],
            notes: dataRow[9],
            contractedFrom: dataRow[10]
        });
        patient.save();

    })
    .on("end", () => {
        console.log("successfully insert");
    });