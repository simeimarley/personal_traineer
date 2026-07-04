// config.js
export const SITE = {
  trainer: { 
    name: "Rafael", 
    tagline: "Transforme seu corpo. Reprograme sua mente.", 
    subline: "Programas 100% personalizados de treino e nutrição, presencial ou online. Resultados reais em semanas — sem promessas mágicas.",
    photo: "assets/img/hero.jpg" // Aqui o cliente coloca a foto dele
  },
  brand: { 
    primary: "#FF4C4C",  // Vermelho Coral idêntico ao do Lovable
    dark: "#090A0C",     // Fundo Obsidian total escuro dos prints
    cardBg: "#13161E",   // Fundo cinza-escuro azulado dos cards
    light: "#FFFFFF",    // Texto puro claro
    font: "'Inter', sans-serif" 
  },
  stats: [
    { value: "10+", label: "Anos" },
    { value: "500+", label: "Alunos" },
    { value: "98%", label: "Recomendam" }
  ],
  whatsapp: { 
    phone: "5511999999999", 
    message: "Olá, Rafael! Vi seu site e quero agendar minha avaliação gratuita." 
  },
  chatbot: { 
    enabled: true, 
    greeting: "Olá! Sou o assistente virtual do Rafael. Como posso te ajudar na sua jornada de treinos hoje?" 
  },
  services: [
    { title: "Treino Presencial", desc: "Acompanhamento 1-a-1 na academia parceira, com plano personalizado." },
    { title: "Consultoria Online", desc: "Plano semanal, vídeos dos exercícios e feedback contínuo por app." },
    { title: "Reeducação Postural", desc: "Programas para dores crônicas, mobilidade e qualidade de vida." }
  ],
  plans: [
    { name: "Online Essencial", price: "199", features: ["Treino personalizado", "App exclusivo", "Suporte por chat"], recommended: false, customPrice: "" },
    { name: "Online Premium", price: "349", features: ["Tudo do Essencial", "Ajustes semanais", "Videochamada quinzenal", "Plano alimentar"], recommended: true, customPrice: "" },
    { name: "Presencial", price: "", features: ["Aulas 1-a-1", "Avaliação física completa", "Periodização mensal"], recommended: false, customPrice: "Sob Consulta" }
  ],
  testimonials: [
    { text: '"-12 kg em 5 meses e a autoestima que eu não tinha há anos."', name: "MARINA, 34" },
    { text: '"Voltei a correr sem dor no joelho. Programa impecável."', name: "DIEGO, 41" },
    { text: '"Ganhei massa magra e finalmente entendi como me alimentar."', name: "CAMILA, 27" }
  ],
  faq: [
    { q: "Preciso já treinar para começar?", a: "Não. Recebo alunos de todos os níveis, incluindo iniciantes absolutos." },
    { q: "Como funciona a avaliação gratuita?", a: "Conversamos por 20 minutos por WhatsApp ou vídeo para entender seu objetivo e histórico. Sem compromisso." },
    { q: "Posso cancelar quando quiser?", a: "Sim. Sem fidelidade, sem multa. O pagamento é mensal." }
  ],
  social: { 
    instagram: "https://instagram.com", 
    youtube: "https://youtube.com", 
    tiktok: "https://tiktok.com" 
  },
  seo: { 
    title: "Rafael | Personal Trainer", 
    description: "Transforme seu corpo e reprograme sua mente com treinos personalizados em São Paulo." 
  }
};