// MODIFICAÇÃO: Transformamos os jogadores individuais em um Array para que todos corram juntos
const players = [
    { NOME: 'Mario', VELOCIDADE: 4, MANOBRABILIDADE: 3, PODER: 3, PONTOS: 0 },
    { NOME: 'Luigi', VELOCIDADE: 3, MANOBRABILIDADE: 4, PODER: 4, PONTOS: 0 },
    { NOME: 'Peach', VELOCIDADE: 3, MANOBRABILIDADE: 4, PODER: 2, PONTOS: 0 },
    { NOME: 'Yoshi', VELOCIDADE: 2, MANOBRABILIDADE: 4, PODER: 3, PONTOS: 0 },
    { NOME: 'Bowser', VELOCIDADE: 5, MANOBRABILIDADE: 2, PODER: 5, PONTOS: 0 },
    { NOME: 'Donkey Kong', VELOCIDADE: 2, MANOBRABILIDADE: 2, PODER: 5, PONTOS: 0 }
];

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getrandomBlock() {
    let random = Math.random();
    if (random < 0.33) return 'RETA';
    if (random < 0.66) return 'CURVA';
    return 'CONFRONTO';
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou ${block}: ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

// MODIFICAÇÃO: A função agora processa o Array de jogadores
async function playRaceEngine(allPlayers) {
    // REGRA: Pista de 5 rodadas
    for (let round = 1; round <= 5; round++) {
        console.log(`\n🏁 Rodada ${round}`);

        let block = await getrandomBlock();
        console.log(`Bloco: ${block}`);

        // MODIFICAÇÃO: Lógica para blocos de Habilidade (RETA e CURVA) envolvendo os 6 jogadores
        if (block === 'RETA' || block === 'CURVA') {
            let roundResults = [];
            let atributoNome = block === 'RETA' ? 'VELOCIDADE' : 'MANOBRABILIDADE';

            for (let player of allPlayers) {
                let dice = await rollDice();
                let attrValue = player[atributoNome];
                let total = dice + attrValue;
                
                await logRollResult(player.NOME, atributoNome.toLowerCase(), dice, attrValue);
                roundResults.push({ player, total });
            }

            // REGRA: Quem vencer (maior pontuação no bloco) ganha um ponto
            let maxScore = Math.max(...roundResults.map(r => r.total));
            roundResults.filter(r => r.total === maxScore).forEach(winner => {
                console.log(`🏅 ${winner.player.NOME} venceu a disputa de ${block}! +1 ponto.`);
                winner.player.PONTOS++;
            });

        } 
        // MODIFICAÇÃO: Lógica de CONFRONTO (Sorteio de itens, Turbo e Trava de pontos negativos)
        else if (block === 'CONFRONTO') {
            // Sorteia 2 jogadores aleatórios para o duelo entre os 6
            let i1 = Math.floor(Math.random() * allPlayers.length);
            let i2;
            do { i2 = Math.floor(Math.random() * allPlayers.length); } while (i1 === i2);

            let p1 = allPlayers[i1];
            let p2 = allPlayers[i2];

            console.log(`🧨 CONFRONTO: ${p1.NOME} vs ${p2.NOME}!`);

            let d1 = await rollDice();
            let d2 = await rollDice();
            let power1 = d1 + p1.PODER;
            let power2 = d2 + p2.PODER;

            await logRollResult(p1.NOME, 'poder', d1, p1.PODER);
            await logRollResult(p2.NOME, 'poder', d2, p2.PODER);

            // REGRA EXTRA: Sortear Casco (-1) ou Bomba (-2)
            let item = Math.random() < 0.5 ? { nome: 'CASCO 🐢', dano: 1 } : { nome: 'BOMBA 💣', dano: 2 };

            if (power1 > power2) {
                console.log(`💥 ${p1.NOME} venceu! ${p2.NOME} perde ${item.dano} ponto(s) pelo ${item.nome}.`);
                // REGRA: Nenhum jogador pode ter pontuação negativa (Math.max garante isso)
                p2.PONTOS = Math.max(0, p2.PONTOS - item.dano);
                
                // REGRA EXTRA: Vencedor ganha Turbo (+1) aleatoriamente
                if (Math.random() > 0.5) {
                    console.log(`🚀 TURBO! ${p1.NOME} ganhou +1 ponto extra!`);
                    p1.PONTOS++;
                }
            } else if (power2 > power1) {
                console.log(`💥 ${p2.NOME} venceu! ${p1.NOME} perde ${item.dano} ponto(s) pelo ${item.nome}.`);
                p1.PONTOS = Math.max(0, p1.PONTOS - item.dano);
                
                if (Math.random() > 0.5) {
                    console.log(`🚀 TURBO! ${p2.NOME} ganhou +1 ponto extra!`);
                    p2.PONTOS++;
                }
            } else {
                console.log("🤝 Empate no confronto! Ninguém perde pontos.");
            }
        }
        console.log('----------------------------------------------------------');
    }
}

// MODIFICAÇÃO: Função de vencedor ajustada para o ranking de 6 pessoas
async function declareWinner(allPlayers) {
    console.log(`\n🏁🚩 Corrida finalizada!`);
    
    // Ordenar do maior para o menor
    allPlayers.sort((a, b) => b.PONTOS - a.PONTOS);

    allPlayers.forEach((p, i) => {
        console.log(`${i + 1}º: ${p.NOME} - ${p.PONTOS} ponto(s)`);
    });

    // REGRA: Vence quem acumulou mais pontos
    if (allPlayers[0].PONTOS === allPlayers[1].PONTOS) {
        console.log(`\n🤝 Empate técnico entre os líderes!`);
    } else {
        console.log(`\n🎉 ${allPlayers[0].NOME} é o grande vencedor! 🏆`);
    }
}

(async function main() {
    console.log(`🏁🚨 Corrida com todos os 6 jogadores começando...\n`);
    await playRaceEngine(players);
    await declareWinner(players);
})();
