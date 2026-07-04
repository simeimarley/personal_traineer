// /api/chat.js
// Proxy seguro para a API da Groq rodando nativamente na Vercel Serverless.

// 1. Rate limit simples em memória: 20 requisições a cada 60s por IP[cite: 3].
const buckets = new Map();
const LIMIT = 20;
const WINDOW_MS = 60000;

function rateLimit(ip) {
  const now = Date.now();
  const b = buckets.get(ip);
  
  if (!b || b.reset < now) { 
    buckets.set(ip, { count: 1, reset: now + WINDOW_MS }); 
    return true; 
  }
  
  if (b.count >= LIMIT) return false;
  
  b.count++;
  return true;
}

// 2. Exportação assíncrona padrão para funções Serverless da Vercel
export default async function handler(req, res) {
  // Bloqueia preventivamente qualquer método diferente de POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método HTTP não permitido" });
  }

  // 3. Segurança: Captura o IP real do cliente através dos cabeçalhos e checa o limite[cite: 3]
  const ip = req.headers["x-forwarded-for"]?.split(",")[0].trim() || "unknown";
  
  if (!rateLimit(ip)) {
    return res.status(429).json({ error: "rate_limited", reply: "Muitas requisições. Aguarde um minuto." });
  }

  // 4. Segurança: Puxa a chave da Groq guardada de forma invisível nas variáveis da Vercel[cite: 3]
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "missing_api_key", reply: "Erro no servidor: Chave não configurada." });
  }

  try {
    // Na Vercel, o req.body já chega como objeto JSON
    const messages = req.body?.messages || [];

    // 5. Sanitização Rigorosa: Máximo 20 msgs, 500 chars cada, e apenas roles válidos[cite: 3]
    const clean = messages
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-20)
      .map((m) => ({ role: m.role, content: String(m.content).slice(0, 500) }));

    if (clean.length === 0) {
      return res.status(400).json({ error: "empty", reply: "Nenhuma mensagem válida recebida." });
    }

    // 6. Comunicação isolada no backend com a Groq API
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { 
        "Authorization": `Bearer ${apiKey}`, 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // Modelo leve e rápido solicitado na configuração[cite: 3]
        temperature: 0.6,
        max_tokens: 400,
        messages: [
          // Prompt de Sistema injetado direto no backend (protegido contra injeção de prompt no client-side)
          { role: "system", content: "Você é um assistente virtual focado no atendimento para um Personal Trainer. Seja educado, conciso e direcione para um agendamento no WhatsApp." },
          ...clean
        ],
      }),
    });

    // 7. Tratamento de erros caso a Groq esteja fora do ar
    if (!groqRes.ok) {
      const txt = await groqRes.text();
      console.error("Erro na API da Groq:", groqRes.status, txt);
      return res.status(502).json({ error: "upstream", reply: "Estou passando por uma instabilidade agora. Por favor, me chame no WhatsApp!" });
    }

    const data = await groqRes.json();
    const reply = data?.choices?.[0]?.message?.content || "";
    
    // Retorna a string de resposta extraída no formato esperado pelo novo frontend[cite: 3]
    return res.status(200).json({ reply });

  } catch (err) {
    console.error("Erro interno Node.js:", err);
    return res.status(500).json({ error: "fetch_failed", reply: "Erro interno no processamento do chat." });
  }
}