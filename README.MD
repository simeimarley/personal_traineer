# 🏋️‍♂️ MITS Trainer — Landing Page Premium & Inteligente

[![Vercel Production](https://img.shields.io/badge/Production-Live-success?style=for-the-badge&logo=vercel)](https://mits-trainer.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Stack-Vanilla_JS_%7C_Node.js-orange?style=for-the-badge)](https://mits-trainer.vercel.app)

Uma Landing Page de altíssima conversão projetada especificamente para Personal Trainers de elite que buscam posicionamento de mercado e automação de captação de leads. Este projeto foi desenvolvido como um case de sucesso de arquitetura leve, segura e escalável pela **Marley IT Solutions**.

🚀 **Acesse o projeto homologado em:** [mits-trainer.vercel.app](https://mits-trainer.vercel.app)

---

## 🎯 Diferenciais do Projeto (Valor de Negócio)

Diferente de páginas comuns construídas em criadores de site pesados (WordPress, Wix), esta solução foi codificada do zero focando em performance brutal, SEO agressivo e experiência de usuário fluida.

- **Design System Moderno:** Construído inteiramente com tokens dinâmicos usando o modelo de cores `oklch()`, garantindo contrastes perfeitos e apelo estético minimalista luxuoso.
- **Assistente IA Integrado:** Chatbot nativo conectado à API da Groq (`llama-3.1-8b-instant`) que atua como um recepcionista virtual 24/7, qualificando o lead antes de direcioná-lo ao WhatsApp.
- **Performance 100/100:** Carregamento instantâneo por não utilizar frameworks pesados no cliente (React, Vue), rodando puramente em Vanilla Tech Stack.
- **Abstracção por Configuração:** Toda a regra de negócio do cliente (preços, planos, biografia, redes sociais) é isolada em um único arquivo de configuração centralizado (`config.js`). Mudar o cliente leva menos de 2 minutos.

---

## 🏗️ Arquitetura e Engenharia de Software

O projeto foi dividido em uma arquitetura híbrida para garantir segurança corporativa e desacoplamento:

### 📺 Front-end (Client-side)

- **HTML5 & CSS3 Premium:** Uso de propriedades modernas como `clamp()` para tipografia responsiva adaptável e `color-mix()` para transparências nativas sem degradação de processamento.
- **Vanilla JS (ES6+):** Manipulação cirúrgica do DOM para injeção de dados dinâmica, controle de estados de componentes e efeitos de scroll reveal.
- **Segurança em Navegação:** Todos os gatilhos externos usam blindagem com atributos `target="_blank"` aliados a `rel="noopener noreferrer"`, prevenindo vulnerabilidades de engenharia reversa na aba de origem (_tab-nabbing_).

### ⚙️ Back-end (Server-side)

- **Vercel Serverless Functions:** A comunicação com a API de inteligência artificial é isolada em um ambiente Node.js seguro backend (`/api/chat.js`). A chave privada (`GROQ_API_KEY`) nunca é exposta ao navegador do usuário.
- **Memory Rate Limiting:** Implementação de algoritmo simples de controle de fluxo de requisições por IP diretamente em memória (Limite de 20 requisições por minuto por usuário), mitigando ataques de negação de serviço (DoS) e controle de custos de infraestrutura.
- **Sanitização Pesada de Dados:** O backend filtra e sanitiza o payload de mensagens interceptando injeções de prompt no client-side, limitando mensagens a um teto rígido de caracteres e histórico de contexto histórico.

---

## ⚙️ Como Utilizar e Customizar (Open-Source)

Este é um projeto público e distribuído sob o conceito de template modular. Sinta-se livre para clonar, modificar e utilizar para os seus próprios clientes.

### 1. Clonando o Repositório

```bash
git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
cd seu-repositorio
```
### 2. Customizando as Informações do Cliente
Toda a alteração visual, de texto ou links de contato deve ser feita exclusivamente alterando as propriedades do arquivo raiz:
📁 config.js

### 3. Configurando as Variáveis de Ambiente (Backend AI)
Para habilitar o assistente virtual inteligente, crie um arquivo .env na raiz do projeto para testes locais:

GROQ_API_KEY=sua_chave_secreta_aqui

Ao realizar o deploy na Vercel, adicione a variável GROQ_API_KEY diretamente no painel de configurações do projeto (Settings > Environment Variables) para garantir o funcionamento seguro em produção.

# 👨‍💻 Desenvolvido por
Este projeto foi planejado, arquitetado e executado pela Marley IT Solutions como parte do nosso portfólio oficial de soluções de alta engenharia para a web.

Se a sua empresa precisa de sistemas robustos, landing pages de alta conversão ou integrações inteligentes com Inteligência Artificial, entre em contato conosco.

Website/Portfólio: mits-trainer.vercel.app

LinkedIn: [\[Seu Link do LinkedIn\]](https://www.linkedin.com/in/simei-marley/)

Contato Corporativo: marleyitsolutions@gmail.com

Licença MITS - Sinta-se livre para usar, modificar e distribuir conforme sua necessidade comercial.