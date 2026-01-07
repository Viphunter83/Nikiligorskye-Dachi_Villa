export async function sendTelegramMessage(message: string): Promise<boolean> {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatIds = process.env.TELEGRAM_CHAT_ID?.split(',').map(id => id.trim()).filter(Boolean);
    console.log('Attempting to send Telegram to IDs:', chatIds);

    if (!token || !chatIds || chatIds.length === 0) {
        console.error('Telegram credentials not configured');
        return false;
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const results = await Promise.all(chatIds.map(async (chatId) => {
            try {
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
                });

                if (!response.ok) {
                    const error = await response.json();
                    console.error(`Telegram API error for chat ${chatId}:`, error);
                    return false;
                }
                return true;
            } catch (err) {
                console.error(`Failed to send to chat ${chatId}:`, err);
                return false;
            }
        }));

        clearTimeout(timeoutId);

        // Return true if at least one message was sent successfully
        return results.some(success => success);
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            console.error('Telegram request timed out');
        } else {
            console.error('Failed to send Telegram message:', error);
        }
        return false;
    }
}
