# 🏋️ Landing Page Coringa para Personal Trainer & Chatbot Groq

Template de Landing Page profissional de alta performance, projetado de forma modular (Mobile-First), totalmente customizável através de um único arquivo de configuração (`config.js`). Pronto para rodar na infraestrutura Serverless da Vercel de forma segura.

## 📁 Como Customizar para um Novo Cliente

Mudar o cliente exige apenas alterações em duas áreas:

1.  **Imagens e Identidade Visual:**
    *   Substitua as mídias da pasta `/assets/img/`. Salve preferencialmente em formato `.webp` ou `.jpg` otimizado:
        *   `hero.jpg`: Foto principal de impacto do treinador.
        *   `antes1.jpg`, `depois1.jpg`: Fotos do carrossel de transformações corporais.
2.  **Modificação de Conteúdo:**
    *   Abra o arquivo `/config.js` na raíz e altere os campos dentro do objeto `SITE`. É possível alterar:
        *   Nome do profissional e slogans da marca.
        *   Cores em formato Hexadecimal (o script reconfigura o CSS automaticamente).
        *   Listagem e descrição de planos/valores e serviços oferecidos.

## 🚀 Como subir para o GitHub e Vercel

Siga as etapas abaixo para realizar a publicação estável: