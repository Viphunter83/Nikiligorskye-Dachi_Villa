export async function sendTelegramMessage(message: string): Promise<boolean> {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        console.error('Telegram credentials not configured');
        return false;
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML',
            }),
            signal: controller.signal
        }).finally(() => clearTimeout(timeoutId));

        if (!response.ok) {
            const error = await response.json();
            console.error('Telegram API error:', error);
            return false;
        }

        return true;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            console.error('Telegram request timed out');
        } else {
            console.error('Failed to send Telegram message:', error);
        }
        return false;
    }
}
