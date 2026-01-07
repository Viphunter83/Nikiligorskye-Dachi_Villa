const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('DOM KP Nikologorskie_ 506m2.pdf');

pdf(dataBuffer).then(function (data) {
    console.log(data.text);
}).catch(function (error) {
    console.error("Error parsing PDF:", error);
});
