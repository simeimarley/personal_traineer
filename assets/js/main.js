// assets/js/main.js
import { SITE } from '../../config.js';

document.addEventListener('DOMContentLoaded', () => {
  inicializarConfiguracoesBase();
  renderizarDadosDoCliente();
  configurarAnimacaoScroll();
});

/**
 * Define as propriedades de estilo essenciais no :root a partir do arquivo de configuração
 */
function inicializarConfiguracoesBase() {
  const root = document.documentElement;
  root.style.setProperty('--primary', SITE.brand.primary);
  root.style.setProperty('--dark', SITE.brand.dark);
  root.style.setProperty('--light', SITE.brand.light);
  root.style.setProperty('--font-main', SITE.brand.font);
}

/**
 * Injeta todos os textos, links e mídias estruturadas com segurança (utilizando textContent)
 */
function renderizarDadosDoCliente() {
  // SEO & Head do documento
  document.title = SITE.seo.title;
  document.querySelector('meta[name="description"]').setAttribute('content', SITE.seo.description);
  
  // Elementos Nominativos Básicos
  document.getElementById('brand-logo').textContent = SITE.trainer.name.split(' ')[0];
  document.getElementById('hero-title').textContent = SITE.trainer.name;
  document.getElementById('hero-tagline').textContent = SITE.trainer.tagline;
  document.getElementById('about-bio').textContent = `Olá, eu sou o ${SITE.trainer.name}. Minha missão é extrair sua melhor versão através de metodologias cientificamente validadas de treino dinâmico e acompanhamento próximo.`;
  document.getElementById('footer-name').textContent = SITE.trainer.name;
  document.getElementById('footer-year').textContent = new Date().getFullYear();

  // Tratamento de Imagens Seguras
  const heroSection = document.getElementById('hero');
  heroSection.style.backgroundImage = `linear-gradient(rgba(29,29,29,0.7), rgba(29,29,29,0.95)), url('${SITE.trainer.photo}')`;
  document.getElementById('about-img').src = SITE.trainer.photo;

  // URLs Dinâmicas do WhatsApp
  const linkWhats = `https://wa.me/${SITE.whatsapp.phone}?text=${encodeURIComponent(SITE.whatsapp.message)}`;
  document.querySelectorAll('.cta-whatsapp').forEach(el => el.setAttribute('href', linkWhats));

  // Renderização Dinâmica - Serviços
  const containerServicos = document.getElementById('services-container');
  containerServicos.innerHTML = ''; // Limpa esqueleto
  SITE.services.forEach(servico => {
    const card = document.createElement('article');
    card.className = 'service-card';
    
    // SVG inline genérico simulando o ícone
    card.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12v18H6z"/></svg>
      <h3></h3>
      <p></p>
    `;
    card.querySelector('h3').textContent = servico.title;
    card.querySelector('p').textContent = servico.desc;
    containerServicos.appendChild(card);
  });

  // Renderização Dinâmica - Carrossel de Evoluções (Antes e Depois)
  const containerResultados = document.getElementById('results-container-list');
  containerResultados.innerHTML = '';
  SITE.results.forEach(res => {
    const item = document.createElement('div');
    item.className = 'result-item';
    item.innerHTML = `
      <div class="result-grid">
        <img class="img-before" src="" alt="Antes de ${res.name}" loading="lazy" width="150" height="200">
        <img class="img-after" src="" alt="Depois de ${res.name}" loading="lazy" width="150" height="200">
      </div>
      <p></p>
    `;
    item.querySelector('.img-before').src = res.before;
    item.querySelector('.img-after').src = res.after;
    item.querySelector('p').textContent = `Evolução - ${res.name}`;
    containerResultados.appendChild(item);
  });

  // Renderização Dinâmica - Planos comerciais
  const containerPlanos = document.getElementById('plans-container');
  containerPlanos.innerHTML = '';
  SITE.plans.forEach(plano => {
    const pCard = document.createElement('div');
    pCard.className = `plan-card ${plano.recommended ? 'recommended' : ''}`;
    
    if(plano.recommended) {
      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = 'RECOMENDADO';
      pCard.appendChild(badge);
    }

    const h3 = document.createElement('h3'); h3.textContent = plano.name; pCard.appendChild(h3);
    const divPreco = document.createElement('div'); divPreco.className = 'plan-price';
    divPreco.innerHTML = `R$ ${plano.price}<span>/mês</span>`; pCard.appendChild(divPreco);

    const ul = document.createElement('ul');
    ul.className = 'plan-features';
    plano.features.forEach(feat => {
      const li = document.createElement('li'); li.textContent = feat; ul.appendChild(li);
    });
    pCard.appendChild(ul);

    const btnPlano = document.createElement('a');
    btnPlano.className = 'btn btn-primary cta-whatsapp';
    btnPlano.textContent = 'Começar Agora';
    btnPlano.href = linkWhats;
    pCard.appendChild(btnPlano);

    containerPlanos.appendChild(pCard);
  });
}

/**
 * Inicializa a Intersection Observer API para detecção de scroll elegante
 */
function configurarAnimacaoScroll() {
  const elementos = document.querySelectorAll('.reveal');
  
  const observerOptions = {
    root: null,
    threshold: 0.15, // Ativa quando 15% do bloco entra na janela visual
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Libera memória parando de rastrear o elemento visível
      }
    });
  }, observerOptions);

  elementos.forEach(el => observer.observe(el));
}