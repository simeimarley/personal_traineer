// assets/js/main.js
import { SITE } from '../../config.js';

document.addEventListener('DOMContentLoaded', () => {
  renderizarDadosPremium();
  configurarEfeitoHeader();
  inicializarAnimacaoScroll();
});

function renderizarDadosPremium() {
  // Ajustes de SEO e Títulos textuais
  document.title = SITE.seo.title;
  document.querySelector('meta[name="description"]').setAttribute('content', SITE.seo.description);
  document.getElementById('brand-logo').innerHTML = `${SITE.trainer.name.toUpperCase()}<span>.</span>`;
  // ==========================================================================
  // INJEÇÃO INTELIGENTE DO TÍTULO HERO (PRESERVANDO O GRADIENTE PREMIUM)
  // ==========================================================================
  const titleElement = document.getElementById('hero-title');

  if (titleElement) {
    const tagline = SITE.trainer.tagline;

    // Se a frase tiver ponto final, divide para isolar o efeito na segunda parte
    if (tagline.includes('.')) {
      const parts = tagline.split('.');
      const firstPart = parts[0] ? parts[0] + '.' : '';
      const secondPart = parts[1] ? parts[1].trim() : '';

      // Reconstrói o HTML aplicando o <span> na segunda metade da frase
      titleElement.innerHTML = `${firstPart} <span>${secondPart}</span>`;
    } else {
      // Caso não encontre o ponto, injeta o texto corrido por segurança
      titleElement.textContent = tagline;
    }
  }
//   document.getElementById('hero-title').textContent = SITE.trainer.tagline;
  document.getElementById('hero-subline').textContent = SITE.trainer.subline;
  document.getElementById('about-bio').textContent = SITE.trainer.subline;

  // 📸 Imagens dinâmicas (Aqui estava o detalhe!)
  const heroBg = document.getElementById('hero-bg-img');
  if (heroBg) {
    heroBg.src = SITE.trainer.photo; // Injeta a foto no fundo do Hero
  }
  document.getElementById('about-img').src = SITE.trainer.photo; //[cite: 5]

  // URLs Inteligentes do WhatsApp
  const linkWhats = `https://wa.me/${SITE.whatsapp.phone}?text=${encodeURIComponent(SITE.whatsapp.message)}`;
  // Força todos os botões estáticos do Whats a abrirem em nova guia com segurança
  document.querySelectorAll('.cta-whatsapp').forEach(el => {
    el.setAttribute('href', linkWhats);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  // Renderizar Caixas de Estatísticas (Stats)
  const statsContainer = document.getElementById('stats-container');
  statsContainer.innerHTML = '';
  SITE.stats.forEach(st => {
    const statItem = document.createElement('div');
    statItem.className = 'stat';
    statItem.innerHTML = `<strong>${st.value}</strong><span>${st.label}</span>`;
    statsContainer.appendChild(statItem);
  });

  // ==========================================================================
  // RENDERIZAR CARDS DE SERVIÇOS COM ÍCONES DINÂMICOS
  // ==========================================================================
  const servicesContainer = document.getElementById('services-container');
  servicesContainer.innerHTML = ''; 

  // Mapa de vetores SVG nativos extraídos do Lovable
  const iconesMap = {
    dumbbell: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6v12M18 6v12M2 10v4M22 10v4M6 12h12"/></svg>`,
    wifi: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0M12 19h.01"/></svg>`,
    heart: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z"/></svg>`
  };

  SITE.services.forEach(sv => { 
    const card = document.createElement('div'); 
    card.className = 'card'; 
    
    // Busca o SVG correspondente no mapa ou usa o halter como padrão caso falte preenchimento
    const svgIcone = iconesMap[sv.icon] || iconesMap['dumbbell'];

    card.innerHTML = `
      <div class="card__icon">
        ${svgIcone}
      </div>
      <h3>${sv.title}</h3>
      <p>${sv.desc}</p>
    `;
    servicesContainer.appendChild(card); 
  });

  // Renderizar Cards de Planos Comerciais
  const plansContainer = document.getElementById('plans-container');
  plansContainer.innerHTML = '';
  SITE.plans.forEach(pl => {
    const card = document.createElement('div');
    card.className = `card plan ${pl.recommended ? 'plan--featured' : ''}`;
    
    let badgeHtml = pl.recommended ? `<span class="plan__badge">Mais Escolhido</span>` : '';
    let precoHtml = pl.customPrice ? pl.customPrice : `R$ ${pl.price}<span>/mês</span>`;
    let featuresHtml = '';
    pl.features.forEach(ft => { featuresHtml += `<li>${ft}</li>`; });

    card.innerHTML = `
      ${badgeHtml}
      <h3>${pl.name}</h3>
      <div class="plan__price">${precoHtml}</div>
      <ul>${featuresHtml}</ul>
      <a href="${linkWhats}" target="_blank" rel="noopener noreferrer" class="btn ${pl.recommended ? 'btn--primary' : 'btn--ghost'}">Quero este</a>`;
    plansContainer.appendChild(card);
  });

  // Renderizar Testemunhos (Prova Social)
  const testimonialsContainer = document.getElementById('testimonials-container');
  testimonialsContainer.innerHTML = '';
  SITE.testimonials.forEach(tm => {
    const block = document.createElement('div');
    block.className = 'testimonial';
    block.innerHTML = `<p>${tm.text}</p><strong>${tm.name}</strong>`;
    testimonialsContainer.appendChild(block);
  });

  // Renderizar Sanfona de FAQ Accordion
  const faqContainer = document.getElementById('faq-container');
  faqContainer.innerHTML = '';
  SITE.faq.forEach(fq => {
    const item = document.createElement('details');
    item.innerHTML = `<summary>${fq.q}</summary><p>${fq.a}</p>`;
    faqContainer.appendChild(item);
  });

// ==========================================================================
  // RENDERIZAR ÍCONES SOCIAIS NO FOOTER
  // ==========================================================================
  const socialsContainer = document.getElementById('socials-container');
  if (socialsContainer) {
    socialsContainer.innerHTML = '';

    // Mapeamento dos SVGs exatos do Lovable para manter a identidade premium[cite: 7]
    const socialIconsMap = {
      instagram: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></svg>`,
      youtube: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="3" /><path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" /></svg>`,
      tiktok: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3v10a4 4 0 1 1-4-4" /><path d="M15 3a5 5 0 0 0 5 5" /></svg>`
    };

    // Percorre dinamicamente o objeto social do seu config.js
    Object.keys(SITE.social).forEach(key => {
      const url = SITE.social[key];
      
      // Só cria o botão se a URL estiver preenchida no config.js
      if (url) {
        const socialLink = document.createElement('a');
        socialLink.href = url;
        socialLink.target = '_blank';
        socialLink.rel = 'noopener noreferrer';
        socialLink.setAttribute('aria-label', key);
        socialLink.innerHTML = socialIconsMap[key] || '';
        socialsContainer.appendChild(socialLink);
      }
    });
  }

  document.getElementById('footer-year').textContent = new Date().getFullYear();
}

/**
 * Adiciona uma sombra e blur no menu superior quando o usuário rola a página para baixo
 */
function configurarEfeitoHeader() {
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  });
}

function inicializarAnimacaoScroll() {
  const elementos = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });
  elementos.forEach(el => observer.observe(el));
}