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
  document.getElementById('hero-title').textContent = SITE.trainer.tagline;
  document.getElementById('hero-subline').textContent = SITE.trainer.subline;
  document.getElementById('about-bio').textContent = SITE.trainer.subline;

  // Imagens dinâmicas
  document.getElementById('about-img').src = SITE.trainer.photo;

  // URLs Inteligentes do WhatsApp
  const linkWhats = `https://wa.me/${SITE.whatsapp.phone}?text=${encodeURIComponent(SITE.whatsapp.message)}`;
  document.querySelectorAll('.cta-whatsapp').forEach(el => el.setAttribute('href', linkWhats));

  // Renderizar Caixas de Estatísticas (Stats)
  const statsContainer = document.getElementById('stats-container');
  statsContainer.innerHTML = '';
  SITE.stats.forEach(st => {
    const statItem = document.createElement('div');
    statItem.className = 'stat';
    statItem.innerHTML = `<strong>${st.value}</strong><span>${st.label}</span>`;
    statsContainer.appendChild(statItem);
  });

  // Renderizar Cards de Serviços
  const servicesContainer = document.getElementById('services-container');
  servicesContainer.innerHTML = '';
  SITE.services.forEach(sv => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card__icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path></svg>
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
      <a href="${linkWhats}" class="btn ${pl.recommended ? 'btn--primary' : 'btn--ghost'}">Quero este</a>
    `;
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