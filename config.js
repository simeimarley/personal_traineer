// config.js
export const SITE = {
  trainer: { 
    name: "Lucas Silva", 
    tagline: "Transforme seu corpo e conquiste sua alta performance com treinos sob medida.", 
    photo: "assets/img/hero.jpg" 
  },
  brand: { 
    primary: "#E63946", // Cor de destaque (botões, links ativos)
    dark: "#1D1D1D",    // Fundo principal escuro
    light: "#F1FAEE",   // Textos claros e contrastes
    font: "'Inter', sans-serif" 
  },
  whatsapp: { 
    phone: "5571999999999", // Exemplo com o DDD de Salvador (71)
    message: "Olá, Lucas! Vim pelo site e quero agendar minha avaliação física." 
  },
  chatbot: { 
    enabled: true, 
    greeting: "Olá! Sou o assistente virtual do Lucas Silva. Estou aqui para tirar suas dúvidas sobre consultoria e treinos. Como posso te ajudar hoje?" 
  },
  services: [
    { icon: "dumbbell", title: "Consultoria Online", desc: "Planilhas de treino personalizadas via aplicativo com acompanhamento semanal de evolução." },
    { icon: "users", title: "Treino Presencial", desc: "Acompanhamento individualizado e focado na correção postural e máxima intensidade." },
    { icon: "heart", title: "Qualidade de Vida", desc: "Foco em emagrecimento saudável, ganho de massa magra e longevidade física." }
  ],
  plans: [
    { name: "Mensal", price: "149", features: ["Treino personalizado", "Suporte via WhatsApp", "Ajuste mensal"], recommended: false },
    { name: "Trimestral", price: "359", features: ["Treino personalizado", "Suporte prioritário", "Acesso a comunidade", "Avaliação bioimpedância"], recommended: true },
    { name: "Semestral", price: "599", features: ["Planejamento de longo prazo", "Suporte 24/7", "Bônus: Guia Nutricional"], recommended: false }
  ],
  results: [
    { name: "Carlos M.", before: "assets/img/antes1.jpg", after: "assets/img/depois1.jpg" },
    { name: "Mariana S.", before: "assets/img/antes2.jpg", after: "assets/img/depois2.jpg" }
  ],
  social: { 
    instagram: "https://instagram.com", 
    youtube: "https://youtube.com", 
    tiktok: "https://tiktok.com" 
  },
  seo: { 
    title: "Lucas Silva | Personal Trainer & Consultoria de Resultados", 
    description: "Alcance seus objetivos de forma rápida e segura com a metodologia exclusiva de treino do Personal Lucas Silva.", 
    ogImage: "assets/img/og-image.jpg" 
  }
};