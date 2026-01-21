# Aplicação do Dashboard da Parko

## Sobre o projeto
Esta aplicação é um dashboard utilizado por estabelecimentos parceiros da Parko para gerenciar
operações diárias de estacionamento, incluindo reservas, controle financeiro,
monitoramento de vagas e atendimento ao cliente.

O projeto foi desenvolvido utilizando **React.js**, **Axios**, **JWT** (autenticação) e **ChartJS** (Gráficos)

---

## Funcionalidades

- Visualização de vagas disponíveis
- Controle de reservas e clientes
- Informações financeiras e fluxo de caixa
- Relatórios financeiros
- Gestão de preços
- Registro de ocorrências
- Controle de horário de funcionamento

---

## Pré-requisitos
Antes de começar, você vai precisar ter instalado: 
- Node.js (versão recomendada: >= 18)
- npm ou yarn

---

## Instalação

⚠️ Antes de rodar o front-end, é necessário configurar e executar o back-end:

🔗 https://github.com/rafaguima00/parko-server

### Passos

```bash
# Clone o repositório
git clone https://github.com/rafaguima00/dashboard-parko.git

# Acesse a pasta do projeto
cd dashboard-parko

# Instale as dependências
npm install

# Inicie o projeto
npm start
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione:

REACT_APP_STATUS_APP=test

Essa variável é utilizada para controlar o ambiente da aplicação (ex: produção ou desenvolvimento).

## Licença

Este projeto é de uso privado e pertence à Parko.
