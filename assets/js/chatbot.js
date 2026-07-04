// assets/js/chatbot.js
import { SITE } from '../../config.js';

document.addEventListener('DOMContentLoaded', () => {
  if (!SITE.chatbot.enabled) {
    document.getElementById('chatbot-toggle').style.display = 'none';
    return;
  }

  const toggleBtn = document.getElementById('chatbot-toggle');
  const closeBtn = document.getElementById('chatbot-close');
  const panel = document.getElementById('chatbot-panel');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');
  const msgContainer = document.getElementById('chatbot-messages');

  // Histórico local de mensagens da sessão para manter a IA ciente do contexto
  let historicoMensagens = [
    { role: "system", content: `Você é um assistente virtual focado em vendas e dúvidas do Personal Trainer ${SITE.trainer.name}. Seja profissional, motivador e tente direcionar o usuário para agendar uma avaliação física via WhatsApp. Responda de forma concisa.` }
  ];

  // Injeta mensagem de boas-vindas definida no config.js
  adicionarMensagemNaTela('bot', SITE.chatbot.greeting);

  // Eventos de Visibilidade
  toggleBtn.addEventListener('click', abrirChat);
  closeBtn.addEventListener('click', fecharChat);

  // Fechamento via Tecla ESC (Acessibilidade)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('active')) {
      fecharChat();
    }
  });

  // Captura do Envio da Mensagem
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const textoLimpo = input.value.trim();
    if (!textoLimpo) return;

    // Sanitização básica e prevenção de estouro de tela
    input.value = '';
    adicionarMensagemNaTela('user', textoLimpo);
    historicoMensagens.push({ role: "user", content: textoLimpo });

    // Cria efeito visual de carregamento ("...")
    const bubbleDigitando = adicionarMensagemNaTela('bot', 'Digitando...');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historicoMensagens })
      });

      bubbleDigitando.remove(); // Remove o balão indicador de digitação

      if (!response.ok) throw new Error('Falha na resposta do servidor.');

      const dados = await response.json();
      const respostaIA = dados.choices[0].message.content;

      adicionarMensagemNaTela('bot', respostaIA);
      historicoMensagens.push({ role: "assistant", content: respostaIA });

    } catch (error) {
      if(bubbleDigitando) bubbleDigitando.remove();
      adicionarMensagemNaTela('bot', 'Desculpe, meu sistema está passando por manutenção temporária. Você pode falar diretamente comigo no WhatsApp!');
      console.error('Chatbot Error:', error);
    }
  });

  function abrirChat() {
    panel.classList.add('active');
    panel.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    setTimeout(() => input.focus(), 300); // Foca no input automaticamente
  }

  function fecharChat() {
    panel.classList.remove('active');
    panel.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.focus();
  }

  /**
   * Helper que injeta os balões textuais tratando injeção de tags maliciosas
   */
  function adicionarMensagemNaTela(remetente, texto) {
    const bubble = document.createElement('div');
    bubble.className = `msg msg-${remetente}`;
    bubble.textContent = texto; // Proteção XSS Absoluta contra injeções HTML
    msgContainer.appendChild(bubble);
    msgContainer.scrollTop = msgContainer.scrollHeight; // Auto-scroll para a última mensagem
    return bubble;
  }
});