// assets/js/chatbot.js
import { SITE } from '../../config.js';

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('chat-toggle');
  const closeBtn = document.getElementById('chat-close');
  const panel = document.getElementById('chat-panel');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const messagesContainer = document.getElementById('chat-messages');

  // Segurança: Se o chatbot estiver desativado no config.js, oculta o botão e aborta
  if (!SITE.chatbot || !SITE.chatbot.enabled) {
    if (toggleBtn) toggleBtn.style.display = 'none';
    return;
  }

  // Injeta a mensagem de saudação inicial se o container estiver vazio
  if (messagesContainer && messagesContainer.children.length === 0) {
    const botMsg = document.createElement('div');
    botMsg.className = 'msg msg--bot';
    botMsg.textContent = SITE.chatbot.greeting || 'Olá! Como posso te ajudar hoje?';
    messagesContainer.appendChild(botMsg);
  }

  // Função centralizada para abrir o painel
  function abrirPainel() {
    panel.style.display = 'flex';
    // Pequeno delay de 10ms para o navegador registrar o display antes de aplicar a animação CSS
    setTimeout(() => panel.classList.add('is-active'), 10);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Função centralizada para fechar o painel
  function fecharPainel() {
    panel.classList.remove('is-active');
    // Aguarda os 250ms da animação de fade-out do CSS terminar para aplicar o display none
    setTimeout(() => {
      panel.style.display = 'none';
    }, 250);
  }

  // Alterna o estado do painel usando a propriedade calculada real do navegador (Garante funcionamento 100%)
  if (toggleBtn && panel) {
    toggleBtn.addEventListener('click', () => {
      const isHidden = window.getComputedStyle(panel).display === 'none';
      if (isHidden) {
        abrirPainel();
      } else {
        fecharPainel();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', fecharPainel);
  }

  // Atalho de acessibilidade: fecha o chat ao pressionar a tecla ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.style.display === 'flex') {
      fecharPainel();
    }
  });

  // Gerenciamento e envio de mensagens para o backend seguro
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      input.value = '';
      
      // Criar e renderizar o balão do usuário
      const userBubble = document.createElement('div');
      userBubble.className = 'msg msg--user';
      userBubble.textContent = text;
      messagesContainer.appendChild(userBubble);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // Criar o indicador visual de digitação da IA
      const typingBubble = document.createElement('div');
      typingBubble.className = 'msg msg--bot msg--typing';
      typingBubble.textContent = 'Digitando...';
      messagesContainer.appendChild(typingBubble);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // Captura o histórico de mensagens da tela para enviar como contexto estruturado para a API
      const mensagensAtuais = Array.from(messagesContainer.querySelectorAll('.msg:not(.msg--typing)'));
      const historicoContexto = mensagensAtuais.map(el => ({
        role: el.classList.contains('msg--user') ? 'user' : 'assistant',
        content: el.textContent
      })).slice(-20); // Sanitização: envia apenas as últimas 20 mensagens para controle de limite

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: historicoContexto })
        });

        typingBubble.remove();

        if (!res.ok) throw new Error();

        const data = await res.json();
        // Mapeamento direto da propriedade calculada no nosso handler serverless do Node.js
        const botResponse = data.reply; 

        const replyBubble = document.createElement('div');
        replyBubble.className = 'msg msg--bot';
        replyBubble.textContent = botResponse;
        messagesContainer.appendChild(replyBubble);
      } catch (error) {
        typingBubble.remove();
        const errorBubble = document.createElement('div');
        errorBubble.className = 'msg msg--bot';
        errorBubble.textContent = 'Estou passando por uma manutenção rápida. Clique no botão do WhatsApp abaixo para falar comigo direto!';
        messagesContainer.appendChild(errorBubble);
      }

      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
  }
});