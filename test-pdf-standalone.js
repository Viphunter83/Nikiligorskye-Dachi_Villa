const React = require('react');
const { Document, Page, Text, View, StyleSheet, Font, renderToFile } = require('@react-pdf/renderer');
const path = require('path');
const fs = require('fs');

// 1. Register Font
const fontPathRegular = path.join(__dirname, 'public/fonts/Roboto-Regular.ttf');
const fontPathBold = path.join(__dirname, 'public/fonts/Roboto-Bold.ttf');

try {
    const regularBuffer = fs.readFileSync(fontPathRegular);
    const boldBuffer = fs.readFileSync(fontPathBold);

    Font.register({
        family: 'Roboto',
        fonts: [
            { src: `data:font/ttf;base64,${regularBuffer.toString('base64')}`, fontWeight: 'normal' },
            { src: `data:font/ttf;base64,${boldBuffer.toString('base64')}`, fontWeight: 'bold' }
        ]
    });

} catch (err) {
    console.error('Failed to load font files:', err);
    process.exit(1);
}

// 2. Define Document (Using React.createElement to avoid JSX compilation issues in raw Node)
const MyDocument = () => (
    React.createElement(Document, {},
        React.createElement(Page, { size: "A4", style: styles.page },
            React.createElement(View, { style: styles.section },
                React.createElement(Text, {}, "Test English Text"),
                React.createElement(Text, {}, "Тестовый текст на русском языке (Regular)"),
                React.createElement(Text, { style: { fontWeight: 'bold' } }, "Тестовый текст на русском языке (Bold)"),
                React.createElement(Text, {}, "1234567890")
            )
        )
    )
);

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        fontFamily: 'Roboto', // Critical: Use the registered family
        fontSize: 24,
    }
});

// 3. Render and Verify
async function generate() {
    try {
        console.log('Generating ./test-output.pdf...');
        await renderToFile(React.createElement(MyDocument), './test-output.pdf');
        console.log('Done! Generating completed.');

        // 4. Verify with pdf-parse
        console.log('Verifying content...');
        const pdf = require('pdf-parse');
        const dataBuffer = fs.readFileSync('./test-output.pdf');

        const data = await pdf(dataBuffer);
        console.log('----------------------------------------');
        console.log('Extracted Text:');
        console.log(data.text);
        console.log('----------------------------------------');

        if (data.text.includes('Тестовый текст')) {
            console.log('✅ SUCCESS: Russian text found in PDF');
        } else {
            console.log('❌ FAILURE: Russian text NOT found (Garbage output)');
        }

    } catch (err) {
        console.error('Render/Verify error:', err);
    }
}

generate();
