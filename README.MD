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
1.Configuração Inicial do Repositório:No Terminal local.Inicialize o Git na pasta raíz do projeto executando os comandos:git initgit add .git commit -m "feat: estrutura base do template modular"
2.Vincular ao GitHub:Crie um repositório vazio no GitHub.Copie a URL do seu repositório remoto e rode no terminal local:git remote add origin SUA_URL_DO_GITHUBgit branch -M maingit push -u origin main
3.Conexão com o Painel Vercel:Hospedagem gratuita e segura.Acesse o painel da Vercel, clique em Add New > Project e importe o repositório que você acabou de subir para o GitHub.
4.Injetar Variáveis de Ambiente:Proteção de Chaves.Antes de clicar no botão "Deploy", expanda a seção Environment Variables. Adicione uma variável com a chave GROQ_API_KEY e insira o token que você gerou no painel da Groq.
5.Deploy e Validação:Menos de 1 minuto.Clique em Deploy. A Vercel vai compilar os arquivos e criar a rota serverless /api/chat.js de maneira automática. O link final de produção será gerado em instantes.