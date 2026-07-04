// /api/chat.js
import fetch from 'node-fetch';

// Sistema simples de cache em memória para Rate Limit (Escopo Global da Instância Serverless)
const ipCache = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const MAX_REQUESTS_PER_WINDOW = 20;  // Máximo de 20 requisições por minuto por IP

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  // Captura o IP real do cliente através dos cabeçalhos da Vercel
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'anonymous';
  const now = Date.now();

  // Controle de Rate Limit
  if (!ipCache.has(clientIp)) {
    ipCache.set(clientIp, { count: 1, startTime: now });
  } else {
    const userData = ipCache.get(clientIp);
    if (now - userData.startTime < RATE_LIMIT_WINDOW) {
      if (userData.count >= MAX_REQUESTS_PER_WINDOW) {
        return res.status(429).json({ error: "Muitas requisições. Por favor, aguarde um minuto." });
      }
      userData.count++;
    } else {
      // Janela expirou, reinicia a contagem
      ipCache.set(clientIp, { count: 1, startTime: now });
    }
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Formato de corpo de requisição inválido" });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // Modelo balanceado para chat veloz
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: "Erro na API da Groq", details: errorData });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor de proxy", details: error.message });
  }
}