# 🏎️ Mario Kart JS - Battle Engine

Um simulador de corrida e batalha desenvolvido em **Node.js**, aplicando conceitos de **Programação Orientada a Objetos (POO)** e lógica de jogos por turnos. O motor processa rodadas simultâneas entre 6 jogadores icônicos da franquia Mario Kart.

## 🕹️ Mecânicas do Jogo

O simulador roda uma pista aleatória de **5 rodadas**. Em cada rodada, o tipo de bloco define o desafio:

- **RETA:** Foco em Velocidade. O jogador com a maior soma (Dado + Atributo) ganha 1 ponto.
- **CURVA:** Foco em Manobrabilidade. O jogador com a maior soma (Dado + Atributo) ganha 1 ponto.
- **CONFRONTO:** Dois jogadores são sorteados para um duelo de Poder.
  - O perdedor pode ser atingido por um **Casco (-1 ponto)** ou uma **Bomba (-2 pontos)**.
  - O vencedor tem chance de ativar um **Turbo (+1 ponto)**.
  - **Regra de Ouro:** A pontuação nunca fica abaixo de zero.

## 🛠️ Tecnologias e Conceitos Aplicados

Este projeto foi refatorado para seguir padrões profissionais de desenvolvimento:

- **Node.js**: Ambiente de execução.
- **Classes (ES6)**: Utilização de `class Player` e `class RaceEngine` para encapsulamento.
- **Async/Await**: Gerenciamento de fluxo para simular o tempo de resposta das rodadas.
- **Math Logic**: Implementação de probabilidades para itens e sorteios de blocos.
- **Clean Code**: Funções com responsabilidades únicas e nomes semânticos.

## 🚀 Como Executar

Certifique-se de ter o **Node.js** instalado em sua máquina.

1. **Clone o repositório:**
   ````bash
   git clone [https://github.com/SEU_USUARIO/mario-kart-js.git](https://github.com/SEU_USUARIO/mario-kart-js.git)

   
2. **Acesse a pasta do projeto:**
   ````Bash
   cd mario-kart-js

3. **Execute o jogo:**
   ````Bash
   node index.js
   
## 📊 Estrutura de Dados (Exemplo de Jogador)

**JavaScript**
````Bash
  {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0
  }
