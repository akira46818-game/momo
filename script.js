const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatLog = document.getElementById('chat-log');

sendBtn.addEventListener('click', () => {
    const text = userInput.value;
    if (!text) return;

    // ももちゃんの返答ロジック（例）
    const response = `お疲れ様です！「${text}」ですね。了解しました、私にお任せください！`;
    
    const msgDiv = document.createElement('div');
    msgDiv.className = 'bot-msg';
    msgDiv.textContent = response;
    chatLog.appendChild(msgDiv);
    
    userInput.value = '';
    chatLog.scrollTop = chatLog.scrollHeight;
});