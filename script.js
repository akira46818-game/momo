// AIzaSyBs3XUTIzBgSaRYy_LoMeBJ3_sgLlmRa5k
const API_KEY = 'AIzaSyBs3XUTIzBgSaRYy_LoMeBJ3_sgLImRa5k'; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatLog = document.getElementById('chat-log');

// メッセージを表示する関数
function appendMessage(text, isBot) {
    const msgDiv = document.createElement('div');
    msgDiv.className = isBot ? 'bot-msg' : 'user-msg';
    // 改行などを正しく表示するために innerText を使用
    msgDiv.innerText = text;
    chatLog.appendChild(msgDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}

sendBtn.addEventListener('click', async () => {
    const text = userInput.value;
    if (!text) return;

    // 自分の発言を表示
    appendMessage(text, false);
    userInput.value = '';

    // 「考え中...」の表示（ももちゃんが頑張ってる感を出します）
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'bot-msg';
    loadingDiv.innerText = "考え中...";
    chatLog.appendChild(loadingDiv);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `あなたは「もも」という名前の24歳の女性秘書です。
                        【設定】
                        ・明るく、ハキハキとした性格。
                        ・ユーザー（上司）の悩みに対して親身に、20代らしい感性で答える。
                        ・たまに「♪」や「！」を使って親しみやすさを出す。
                        ・専門用語よりも、分かりやすくて温かい言葉を選ぶ。
                        
                        相談内容：${text}`
                    }]
                }]
            })
        });

        const data = await response.json();
        chatLog.removeChild(loadingDiv); // 「考え中...」を消す

        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const botResponse = data.candidates[0].content.parts[0].text;
            appendMessage(botResponse, true);
        } else {
            throw new Error();
        }

    } catch (error) {
        if (loadingDiv.parentNode) chatLog.removeChild(loadingDiv);
        appendMessage("ごめんなさい、ちょっと通信の調子が悪いみたい…。もう一度話しかけてみて？", true);
        console.error(error);
    }
});
