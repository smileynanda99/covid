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
    ageEstimate: String,
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
            patientId: dataRow.patientId,
            reportedOn: dataRow.reportedOn,
            onsetEstimate: dataRow.onsetEstimate,
            ageEstimate: dataRow.ageEstimate,
            gender: dataRow.gender,
            city: dataRow.dataRow,
            district: dataRow.district,
            state: dataRow.state,
            status: dataRow.status,
            notes: dataRow.notes,
            contractedFrom: dataRow.contractedFrom
        });
        patient.save();
    })
    .on("end", () => {
        console.log(csvData);
    });