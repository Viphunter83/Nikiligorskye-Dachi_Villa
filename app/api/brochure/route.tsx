import { renderToFile, Font } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';
import { BrochureDocument } from '@/components/pdf/BrochureDocument';
import { PersonaType } from '@/data/house-data';
import path from 'path';
import fs from 'fs';
import os from 'os';

// Helper for file logging
const logToFile = (message: string) => {
    try {
        const logPath = path.join(process.cwd(), 'pdf-debug.log');
        fs.appendFileSync(logPath, `${new Date().toISOString()}: ${message}\n`);
    } catch (e) {
        // ignore
    }
};

// Register Fonts from local file system
const registerFonts = () => {
    try {
        const fontPath = path.join(process.cwd(), 'public/fonts');
        logToFile(`--- FONT REGISTRATION DEBUG ---`);
        logToFile(`Base Font Path: ${fontPath}`);

        const regularFontPath = path.join(fontPath, 'Roboto-Regular.ttf');
        const boldFontPath = path.join(fontPath, 'Roboto-Bold.ttf');

        // Check if files exist
        if (!fs.existsSync(regularFontPath)) logToFile(`MISSING: ${regularFontPath}`);
        if (!fs.existsSync(boldFontPath)) logToFile(`MISSING: ${boldFontPath}`);

        const regularFont = fs.readFileSync(regularFontPath);
        const boldFont = fs.readFileSync(boldFontPath);

        const regularBase64 = regularFont.toString('base64');
        const boldBase64 = boldFont.toString('base64');

        logToFile(`DEBUG: Font Path: ${fontPath}`);
        logToFile(`DEBUG: Regular Exists: ${fs.existsSync(regularFontPath)}`);
        logToFile(`DEBUG: Regular Base64 (first 20): ${regularBase64.substring(0, 20)}`);

        Font.register({
            family: 'BrochureDebug',
            fonts: [
                { src: `data:font/ttf;base64,${regularBase64}`, fontWeight: 'normal' },
                { src: `data:font/ttf;base64,${boldBase64}`, fontWeight: 'bold' }
            ]
        });
        logToFile('✅ Fonts registered as "BrochureDebug"');
        logToFile('-------------------------------');
    } catch (error) {
        logToFile(`❌ Font registration failed: ${error}`);
        console.error('Font registration failed:', error);
    }
}

const isLanguage = (lang: string): lang is 'ru' | 'en' => {
    return lang === 'ru' || lang === 'en';
}

// Minimal Test Document to isolate component issues
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';

const simpleStyles = StyleSheet.create({
    page: {
        fontFamily: 'BrochureDebug',
        padding: 30,
    },
    text: {
        fontSize: 12,
        marginBottom: 10,
    }
});

const SimpleDocument = () => (
    <Document>
        <Page size="A4" style={simpleStyles.page}>
            <Text style={simpleStyles.text}>Simple Test: Тестовый текст на русском</Text>
            <Text style={{ ...simpleStyles.text, fontWeight: 'bold' }}>Bold Test: Жирный текст</Text>
        </Page>
    </Document>
);

// Call registration (sync now)
export async function GET(req: Request) {
    registerFonts();
    try {
        const { searchParams } = new URL(req.url);
        const persona = (searchParams.get('persona') as PersonaType) || 'Target_Family';
        const langParam = searchParams.get('lang');
        const lang = (langParam && isLanguage(langParam)) ? langParam : 'ru'; // Validate lang

        const tempDir = os.tmpdir();
        const tempFilePath = path.join(tempDir, `brochure_${Date.now()}.pdf`);

        logToFile(`Generating PDF to temp file: ${tempFilePath}`);

        // Render to file
        await renderToFile(<BrochureDocument persona={persona} language={lang} />, tempFilePath);

        // Read buffer
        const buffer = fs.readFileSync(tempFilePath);
        logToFile(`PDF generated successfully, size: ${buffer.length}`);

        // Cleanup
        fs.unlinkSync(tempFilePath);

        return new NextResponse(buffer as unknown as BodyInit, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="Nikologorskie_Dachi_Offer_${persona}.pdf"`,
                'Content-Length': buffer.length.toString(),
            },
        });
    } catch (error) {
        logToFile(`PDF Generation Error: ${error}`);
        console.error('PDF Generation Error:', error);
        return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
    }
}
