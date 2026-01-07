import { NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/lib/telegram';
import { PersonaType } from '@/data/house-data';

interface ContactRequest {
    phone: string;
    persona: PersonaType;
    intent?: 'booking' | 'question' | 'callback' | 'general';
    historySummary?: string;
}

export async function POST(req: Request) {
    try {
        const body: ContactRequest = await req.json();
        const { phone, persona, intent = 'general' } = body;

        let intentEmoji = '📝';
        let intentText = 'ОБЩИЙ ЗАПРОС';

        switch (intent) {
            case 'booking':
                intentEmoji = '📅';
                intentText = 'ЗАПРОС НА ПРОСМОТР';
                break;
            case 'question':
                intentEmoji = '❓';
                intentText = 'ВОПРОС МЕНЕДЖЕРУ';
                break;
            case 'callback':
                intentEmoji = '📞';
                intentText = 'ПРОСЬБА ПЕРЕЗВОНИТЬ';
                break;
        }

        let salesTip = '';
        let icebreaker = '';

        // 1. Analyze Persona -> Generate AI Sales Tip (Russian)
        switch (persona) {
            case 'Target_Investor':
                salesTip = "Акцент на ROI, хак с площадью (506 vs 746) и качество инженерии (Buderus, ABB). Подчеркните низкий OPEX.";
                icebreaker = "Добрый день! Вижу, вас заинтересовали детали проекта. Подготовил данные по капитализации актива (506 м² как 746 м²) и расчет доходности.";
                break;
            case 'Target_Family':
                salesTip = "Акцент на безопасность, периметр, школу (Ломоносовская) и приватность блока персонала. Подчеркните свободу на 14 сотках.";
                icebreaker = "Здравствуйте! Хотели бы обсудить нюансы безопасности и инфраструктуры для детей? У нас как раз есть уникальное решение с блоком для персонала.";
                break;
            case 'Target_Party':
                salesTip = "Акцент на шумоизоляцию кинотеатра, поток патио-гостиная, зону BBQ и быстрый выезд в Сити. Упомяните стриминг 8K.";
                icebreaker = "Приветствую! Готовы оценить scale проекта вживую? Второй свет, зона патио и кинотеатр лучше всего смотрятся вечером.";
                break;
            default:
                salesTip = "Общий запрос. Сделайте акцент на реальной площади (746 м²) и премиальной локации.";
                icebreaker = "Добрый день! Подсказать детали по расположению и планировке?";
        }

        // 2. Construct Message (HTML)
        const message = `
${intentEmoji} <b>${intentText}</b>

📞 <b>Телефон:</b> <code>${phone}</code>
🎭 <b>Архетип:</b> ${persona}
💡 <b>AI Совет:</b> ${salesTip}

💬 <b>Скрипт начала (Icebreaker):</b>
<i>"${icebreaker}"</i>

----------------------
<i>Отправлено из Цифрового Двойника</i>
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
