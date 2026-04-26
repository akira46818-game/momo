const API_KEY = 'AIzaSyBs3XUTIzBgSaRYy_LoMeBJ3_sgLlmRa5k'; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatLog = document.getElementById('chat-log');

function appendMessage(text, isBot) {
    const msgDiv = document.createElement('div');
    msgDiv.className = isBot ? 'bot-msg' : 'user-msg';
    msgDiv.textContent = text;
    chatLog.appendChild(msgDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}

sendBtn.addEventListener('click', async () => {
    const text = userInput.value;
    if (!text) return;

    appendMessage(text, false);
    userInput.value = '';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `あなたは「もも」という名前の24歳の女性秘書です。親しみやすく、明るい口調で話してください。悩み相談に親身に乗ってください。相談内容：${text}`
                    }]
                }]
            })
        });

        const data = await response.json();
        const botResponse = data.candidates[0].content.parts[0].text;
        appendMessage(botResponse, true);

    } catch (error) {
        console.error(error);
        appendMessage("ごめんなさい、ちょっと調子が悪いみたい…。", true);
    }
});
