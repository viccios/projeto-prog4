# Projeto Programação 4

## Sobre

Projeto de produção de um site fullstack para a matéria de programação 4 do
IFRS Campus Restinga.
Detalhes sobre a ideia do projeto podem ser encontrados no documento de proposta.

## Instalação

O projeto é um sistema Web desenvolvido com JavaScript.
Para executá-lo, é necessário ter o Node.js instalado.
A versão de referência é a LTS 24.16.0.

### Frontend

Ainda não implementado.

### Backend

1. Clonar o repositório: `git clone https://github.com/viccios/projeto-prog4.git`
2. Entrar no diretório do backend: `cd backend`
3. Instalar as dependências: `npm install`
4. Configurar as variáveis de ambiente no arquivo `.env`
   (exemplo disponível em `.env.example`)
5. Iniciar o servidor no modo de produção: `npm run start`
   ou no modo de desenvolvimento: `npm run dev`

### Scripts disponívels

Scripts para a manutenção e qualidade do código

- `npm run format`: formatar o código com Prettier
- `npm run lint`: análise de qualidade e boas práticas com ESLint
- `npm run test`: executar teste unitárias com Vitest

## Documentação

- [docs/README.md](/docs/README.md): descrição do projeto, objetivos e limitações
- [docs/requirements.md](/docs/requirements.md): requisitos funcionais e não funcionais
- [docs/erd.md](/docs/erd.md): diagrama entidade-relacionamento
- [docs/architecture.md](/docs/architecture.md): arquitetura e convenções
- [docs/use-case-diagram.md](/docs/use-case-diagram.md): diagramas de caso de uso
- [docs/proposal-document/proposal-document.pdf](/docs/proposal-document/proposal-document.pdf): documento de proposta (gerado com Typst)
