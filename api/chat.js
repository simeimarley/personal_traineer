// assets/js/chatbot.js
import { SITE } from '../../config.js';

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('chat-toggle');
  const closeBtn = document.getElementById('chat-close');
  const panel = document.getElementById('chat-panel');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const messagesContainer = document.getElementById('chat-messages');

  if (!SITE.chatbot.enabled) {
    toggleBtn.style.display = 'none';
    return;
  }

  // Primeira Mensagem do Bot
  const botMsg = document.createElement('div');
  botMsg.className = 'chat-bubble bubble-bot';
  botMsg.textContent = SITE.chatbot.greeting;
  messagesContainer.appendChild(botMsg);

  toggleBtn.addEventListener('click', () => panel.classList.toggle('active'));
  closeBtn.addEventListener('click', () => panel.classList.remove('active'));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    
    // Mensagem do usuário na tela
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble bubble-user';
    userBubble.textContent = text;
    messagesContainer.appendChild(userBubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Mensagem temporária de digitando
    const typingBubble = document.createElement('div');
    typingBubble.className = 'chat-bubble bubble-bot';
    typingBubble.textContent = 'Digitando...';
    messagesContainer.appendChild(typingBubble);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: "system", content: `Você é o assistente virtual do Personal Trainer ${SITE.trainer.name}. Ajude o usuário e recomende falar no WhatsApp.` },
            { role: "user", content: text }
          ]
        })
      });

      typingBubble.remove();

      if (!res.ok) throw new Error();

      const data = await res.json();
      const botResponse = data.choices[0].message.content;

      const replyBubble = document.createElement('div');
      replyBubble.className = 'chat-bubble bubble-bot';
      replyBubble.textContent = botResponse;
      messagesContainer.appendChild(replyBubble);
    } catch {
      typingBubble.remove();
      const errorBubble = document.createElement('div');
      errorBubble.className = 'chat-bubble bubble-bot';
      errorBubble.textContent = 'Estou com dificuldades para responder agora. Por favor, clique no botão do WhatsApp para falar direto comigo!';
      messagesContainer.appendChild(errorBubble);
    }

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });
});