const fs = require('fs');
// Try to import based on the keys we saw
const pdfLib = require('pdf-parse');

const dataBuffer = fs.readFileSync('DOM KP Nikologorskie_ 506m2.pdf');

// Based on the keys 'PDFParse', maybe we need to instantiate it?
// Or maybe it's not the 'pdf-parse' we know.
// Let's try to see if PDFParse is a function/class we can use.

async function run() {
    try {
        console.log('Attempting to use PDFParse class/function...');
        if (pdfLib.PDFParse) {
            // It might be a class?
            // const parser = new pdfLib.PDFParse();
            // parsing logic?
            console.log('PDFParse exists. Proto:', pdfLib.PDFParse.prototype);
        }

        // Strategy 2: Remove node_modules/pdf-parse and force reinstall valid version
        // Strategy 3: Try another library "pdf-extraction"
    } catch (e) {
        console.error(e);
    }
}
run();
