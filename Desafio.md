# Desafio de projeto do Felipão: Mario Kart.JS

| ![Mario](https://github.com/MarcosJr001/Mario-Kart-JS---Battle-Engine/blob/main/docs/header.gif) | **Objetivo:** <br> Mario Kart é uma série de jogos de corrida desenvolvida e publicada pela Nintendo. Nosso desafio será criar uma lógica de um jogo de vídeo game para simular corridas de Mario Kart, levando em consideração as regras e mecânicas abaixo. |
| :--- | :--- |

## Players

| Mario | Velocidade: 4 | Peach | Velocidade: 3 | Yoshi | Velocidade: 2 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| ![Mario](https://github.com/MarcosJr001/Mario-Kart-JS---Battle-Engine/blob/main/docs/mario.gif) | **Manobrabilidade: 3** <br> **Poder: 3** | ![Peach](https://github.com/MarcosJr001/Mario-Kart-JS---Battle-Engine/blob/main/docs/peach.gif) | **Manobrabilidade: 4** <br> **Poder: 2** | ![Yoshi](https://github.com/MarcosJr001/Mario-Kart-JS---Battle-Engine/blob/main/docs/yoshi.gif) | **Manobrabilidade: 4** <br> **Poder: 3** |
| **Bowser** | **Velocidade: 5** | **Luigi** | **Velocidade: 3** | **Donkey Kong** | **Velocidade: 2** |
| ![Bowser](https://github.com/MarcosJr001/Mario-Kart-JS---Battle-Engine/blob/main/docs/bowser.gif) | **Manobrabilidade: 2** <br> **Poder: 5** | ![Luigi](https://github.com/MarcosJr001/Mario-Kart-JS---Battle-Engine/blob/main/docs/luigi.gif) | **Manobrabilidade: 4** <br> **Poder: 4** | ![DK](https://github.com/MarcosJr001/Mario-Kart-JS---Battle-Engine/blob/main/docs/dk.gif) | **Manobrabilidade: 2** <br> **Poder: 5** |

---

## 🏎️ Regras & mecânicas:

### Jogadores:
- O Computador deve receber dois personagens para disputar a corrida em um objeto cada.

### Pistas:
- Os personagens irão correr em uma pista aleatória de 5 rodadas.
- A cada rodada, será sorteado um bloco da pista que pode ser uma reta, curva ou confronto.
    - Caso o bloco da pista seja uma **RETA**, o jogador deve jogar um dado de 6 lados e somar o atributo **VELOCIDADE**, quem vencer ganha um ponto.
    - Caso o bloco da pista seja uma **CURVA**, o jogador deve jogar um dado de 6 lados e somar o atributo **MANOBRABILIDADE**, quem vencer ganha um ponto.
    - Caso o bloco da pista seja um **CONFRONTO**, o jogador deve jogar um dado de 6 lados e somar o atributo **PODER**, quem perder, perde um ponto.
    - Nenhum jogador pode ter pontuação negativa (valores abaixo de 0).

### Condição de vitória:
- Ao final, vence quem acumulou mais pontos.

### Extra:
**Adicionar todos os 6 jogadores**
# Confroto:
  - Sortear aleatoriamente se é um casco(-1 ponto) ou um bomba(-2 pontos)
  - Quem vence o confronto ganha um turbo (+ 1ponto) aleatoriamente
  - Quando for confronto adicionar somente 2 jogadores
