const fs = require('fs');
const pdf = require('pdf-parse');

async function verifyServerOutput() {
    try {
        console.log('Verifying content of ./test_curl_fix.pdf ...');

        if (!fs.existsSync('./test_curl_fix.pdf')) {
            console.error('test_curl_fix.pdf not found. Did curl fail?');
            return;
        }

        const dataBuffer = fs.readFileSync('./test_curl_fix.pdf');

        const data = await pdf(dataBuffer);
        console.log('----------------------------------------');
        console.log('Extracted Text (First 500 chars):');
        console.log(data.text.substring(0, 500));
        console.log('----------------------------------------');

        if (/[а-яА-Я]/.test(data.text)) {
            console.log('✅ SUCCESS: Cyrillic characters found in PDF');
        } else {
            console.log('❌ FAILURE: No Cyrillic characters found (Garbage output)');
        }

    } catch (err) {
        console.error('Verify error:', err);
    }
}

verifyServerOutput();
