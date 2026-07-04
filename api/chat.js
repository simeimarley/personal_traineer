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

  // Primeira Mensagem Automática do Assistente
  const botMsg = document.createElement('div');
  botMsg.className = 'msg msg--bot';
  botMsg.textContent = SITE.chatbot.greeting;
  messagesContainer.appendChild(botMsg);

  // Exibe o painel alterando o estilo de display e aplicando a classe de animação
  toggleBtn.addEventListener('click', () => {
    if (panel.style.display === 'none') {
      panel.style.display = 'flex';
      setTimeout(() => panel.classList.add('active'), 10);
    } else {
      fecharPainel();
    }
  });

  closeBtn.addEventListener('click', fecharPainel);

  function fecharPainel() {
    panel.classList.remove('active');
    setTimeout(() => panel.style.display = 'none', 250);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    
    const userBubble = document.createElement('div');
    userBubble.className = 'msg msg--user';
    userBubble.textContent = text;
    messagesContainer.appendChild(userBubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    const typingBubble = document.createElement('div');
    typingBubble.className = 'msg msg--bot msg--typing';
    typingBubble.textContent = 'Digitando...';
    messagesContainer.appendChild(typingBubble);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: "system", content: `Você é o assistente virtual do Personal Trainer ${SITE.trainer.name}. Seja motivador e direto. Indique o agendamento no WhatsApp.` },
            { role: "user", content: text }
          ]
        })
      });

      typingBubble.remove();
      if (!res.ok) throw new Error();

      const data = await res.json();
      const botResponse = data.choices[0].message.content;

      const replyBubble = document.createElement('div');
      replyBubble.className = 'msg msg--bot';
      replyBubble.textContent = botResponse;
      messagesContainer.appendChild(replyBubble);
    } catch {
      typingBubble.remove();
      const errorBubble = document.createElement('div');
      errorBubble.className = 'msg msg--bot';
      errorBubble.textContent = 'Estou instável no momento. Clique no WhatsApp para falar direto comigo!';
      messagesContainer.appendChild(errorBubble);
    }

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });
});