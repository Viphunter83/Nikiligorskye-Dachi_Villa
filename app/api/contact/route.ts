import { NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/lib/telegram';
import { PersonaType } from '@/data/house-data';

interface ContactRequest {
    phone: string;
    persona: PersonaType;
    historySummary?: string;
}

export async function POST(req: Request) {
    try {
        const body: ContactRequest = await req.json();
        const { phone, persona } = body;

        let salesTip = '';

        // 1. Analyze Persona -> Generate AI Sales Tip
        switch (persona) {
            case 'Target_Investor':
                salesTip = "Focus on ROI, square meters hack (506 vs 746), and engineering quality (Buderus, ABB). Emphasize low OPEX.";
                break;
            case 'Target_Family':
                salesTip = "Focus on security, perimeter safety, nearby schools (Lomonosov), and the staff block privacy. Emphasize the 14 acres freedom.";
                break;
            case 'Target_Party':
                salesTip = "Focus on the cinema soundproofing, patio flow, BBQ zone, and fast views to Moscow City. Mention 8K streaming.";
                break;
            default:
                salesTip = "General inquiry. Focus on total area (746 m²) and premium location.";
        }

        // 2. Construct Message
        const message = `
🚨 *NEW LEAD DETECTED*

📞 *Phone:* \`${phone}\`
🎭 *Archetype:* ${persona}
💡 *AI Sales Tip:* ${salesTip}

----------------------
_Sent via Residence Digital Twin_
    `.trim();

        // 3. Send Telegram Message
        const success = await sendTelegramMessage(message);

        if (!success) {
            // In development or if env vars missing, we still return success to UI but log error
            console.warn('Telegram notification failed to send');
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to process request' },
            { status: 500 }
        );
    }
}
