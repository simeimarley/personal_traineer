// assets/js/main.js
import { SITE } from '../../config.js';

document.addEventListener('DOMContentLoaded', () => {
  aplicarIdentidadeVisual();
  injetarConteudoDinamico();
  inicializarAnimacaoScroll();
});

function aplicarIdentidadeVisual() {
  const root = document.documentElement;
  root.style.setProperty('--primary', SITE.brand.primary);
  root.style.setProperty('--dark', SITE.brand.dark);
  root.style.setProperty('--card-bg', SITE.brand.cardBg);
  root.style.setProperty('--light', SITE.brand.light);
  root.style.setProperty('--font-main', SITE.brand.font);
}

function injetarConteudoDinamico() {
  // SEO & Textos Hero
  document.title = SITE.seo.title;
  document.querySelector('meta[name="description"]').setAttribute('content', SITE.seo.description);
  document.getElementById('brand-logo').innerHTML = `${SITE.trainer.name.toUpperCase()}<span>.</span>`;
  document.getElementById('hero-title').textContent = SITE.trainer.tagline;
  document.getElementById('hero-subline').textContent = SITE.trainer.subline;
  document.getElementById('about-bio').textContent = SITE.trainer.subline;

  // Imagens
  document.getElementById('hero').style.backgroundImage = `linear-gradient(rgba(9,10,12,0.75), rgba(9,10,12,0.98)), url('${SITE.trainer.photo}')`;
  document.getElementById('about-img').src = SITE.trainer.photo;

  // URL WhatsApp
  const linkWhats = `https://wa.me/${SITE.whatsapp.phone}?text=${encodeURIComponent(SITE.whatsapp.message)}`;
  document.querySelectorAll('.cta-whatsapp').forEach(el => el.setAttribute('href', linkWhats));

  // Injetar Caixa de Estatísticas (Stats)
  const statsContainer = document.getElementById('stats-container');
  statsContainer.innerHTML = '';
  SITE.stats.forEach(st => {
    const box = document.createElement('div');
    box.className = 'stat-box';
    box.innerHTML = `<span class="stat-value">${st.value}</span><span class="stat-label">${st.label}</span>`;
    statsContainer.appendChild(box);
  });

  // Injetar Serviços
  const servicesContainer = document.getElementById('services-container');
  servicesContainer.innerHTML = '';
  SITE.services.forEach(sv => {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `
      <div class="service-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
      </div>
      <h3>${sv.title}</h3>
      <p>${sv.desc}</p>
    `;
    servicesContainer.appendChild(card);
  });

  // Injetar Planos Comercializáveis
  const plansContainer = document.getElementById('plans-container');
  plansContainer.innerHTML = '';
  SITE.plans.forEach(pl => {
    const card = document.createElement('div');
    card.className = `plan-card ${pl.recommended ? 'recommended' : ''}`;
    
    let badgeHtml = pl.recommended ? `<span class="plan-badge">Mais Escolhido</span>` : '';
    let precoHtml = pl.customPrice ? pl.customPrice : `R$ ${pl.price}<span>/mês</span>`;

    let featuresHtml = '';
    pl.features.forEach(ft => { featuresHtml += `<li>${ft}</li>`; });

    card.innerHTML = `
      ${badgeHtml}
      <h3>${pl.name}</h3>
      <div class="plan-price">${precoHtml}</div>
      <ul class="plan-features">${featuresHtml}</ul>
      <a href="${linkWhats}" class="btn ${pl.recommended ? 'btn-primary' : 'btn-outline'}">Quero este</a>
    `;
    plansContainer.appendChild(card);
  });

  // Injetar Testemunhos (Prova Social)
  const testimonialsContainer = document.getElementById('testimonials-container');
  testimonialsContainer.innerHTML = '';
  SITE.testimonials.forEach(tm => {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `<p>${tm.text}</p><span class="testimonial-name">${tm.name}</span>`;
    testimonialsContainer.appendChild(card);
  });

  // Injetar Perguntas Frequentes (FAQ Accordion)
  const faqContainer = document.getElementById('faq-container');
  faqContainer.innerHTML = '';
  SITE.faq.forEach(fq => {
    const item = document.createElement('details');
    item.innerHTML = `<summary>${fq.q}</summary><p>${fq.a}</p>`;
    faqContainer.appendChild(item);
  });

  // Footer Ano
  document.getElementById('footer-year').textContent = new Date().getFullYear();
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