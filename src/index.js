// 1. Definição da Classe do Jogador
class Player {
    constructor(nome, velocidade, manobrabilidade, poder) {
        this.nome = nome;
        this.velocidade = velocidade;
        this.manobrabilidade = manobrabilidade;
        this.poder = poder;
        this.pontos = 0;
    }

    // Método para adicionar pontos
    addPontos(valor) {
        this.pontos += valor;
    }

    // REGRA: Impedir pontuação negativa
    removePontos(valor) {
        this.pontos = Math.max(0, this.pontos - valor);
    }
}

// 2. Gerenciador da Corrida
class RaceEngine {
    constructor(players) {
        this.players = players;
        this.rounds = 5;
    }

    async rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    async getRandomBlock() {
        const blocks = ['RETA', 'CURVA', 'CONFRONTO'];
        return blocks[Math.floor(Math.random() * blocks.length)];
    }

    // Lógica de Confronto (Regras de Casco, Bomba e Turbo)
    async handleConflict() {
        // Seleciona 2 oponentes aleatórios
        const shuffled = [...this.players].sort(() => 0.5 - Math.random());
        const [p1, p2] = shuffled.slice(0, 2);

        console.log(`🧨 CONFRONTO: ${p1.nome} vs ${p2.nome}!`);

        const d1 = await this.rollDice();
        const d2 = await this.rollDice();
        const power1 = d1 + p1.poder;
        const power2 = d2 + p2.poder;

        // REGRA: Sorteio de item (Casco -1 ou Bomba -2)
        const item = Math.random() < 0.5 
            ? { nome: 'CASCO 🐢', dano: 1 } 
            : { nome: 'BOMBA 💣', dano: 2 };

        if (power1 > power2) {
            console.log(`💥 ${p1.nome} venceu! ${p2.nome} perde ${item.dano} ponto(s) [${item.nome}].`);
            p2.removePontos(item.dano);
            this.applyTurbo(p1);
        } else if (power2 > power1) {
            console.log(`💥 ${p2.nome} venceu! ${p1.nome} perde ${item.dano} ponto(s) [${item.nome}].`);
            p1.removePontos(item.dano);
            this.applyTurbo(p2);
        } else {
            console.log("🤝 Empate! Ninguém perde pontos.");
        }
    }

    // REGRA: Turbo aleatório (+1 ponto)
    applyTurbo(winner) {
        if (Math.random() > 0.5) {
            console.log(`🚀 TURBO! ${winner.nome} ganhou +1 ponto extra!`);
            winner.addPontos(1);
        }
    }

    // Loop principal da corrida
    async startRace() {
        for (let i = 1; i <= this.rounds; i++) {
            const block = await this.getRandomBlock();
            console.log(`\n🏁 Rodada ${i} - Bloco: ${block}`);

            if (block === 'CONFRONTO') {
                await this.handleConflict();
            } else {
                await this.handleSkillCheck(block);
            }
            console.log("-".repeat(50));
        }
    }

    async handleSkillCheck(block) {
        const attr = block === 'RETA' ? 'velocidade' : 'manobrabilidade';
        let results = [];

        for (let p of this.players) {
            const dice = await this.rollDice();
            const total = dice + p[attr];
            console.log(`${p.nome} 🎲 rolou ${attr}: ${dice} + ${p[attr]} = ${total}`);
            results.push({ player: p, score: total });
        }

        // REGRA: Quem vencer ganha 1 ponto
        const maxScore = Math.max(...results.map(r => r.score));
        results.filter(r => r.score === maxScore).forEach(winner => {
            console.log(`🏅 ${winner.player.nome} pontuou!`);
            winner.player.addPontos(1);
        });
    }

    showRanking() {
        console.log(`\n🏆 --- PLACAR FINAL --- 🏆`);
        const ranking = [...this.players].sort((a, b) => b.pontos - a.pontos);
        ranking.forEach((p, i) => {
            console.log(`${i + 1}º ${p.nome.padEnd(12)} | Pontos: ${p.pontos}`);
        });
    }
}

// 3. Execução Principal
(async function main() {
    const participants = [
        new Player('Mario', 4, 3, 3),
        new Player('Luigi', 3, 4, 4),
        new Player('Peach', 3, 4, 2),
        new Player('Yoshi', 2, 4, 3),
        new Player('Bowser', 5, 2, 5),
        new Player('Donkey Kong', 2, 2, 5)
    ];

    const race = new RaceEngine(participants);
    
    console.log("🚦 Dada a largada!");
    await race.startRace();
    race.showRanking();
})();
