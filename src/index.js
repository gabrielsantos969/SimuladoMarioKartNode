const player1 = { 
    NOME : "Mario",
    VELOCIDADE : 4,
    MANOBRABILIDADE : 3,
    PODER : 3,
    PONTOS : 0
}

const player2 = { 
    NOME : "Luigi",
    VELOCIDADE : 3,
    MANOBRABILIDADE : 4,
    PODER : 4,
    PONTOS : 0
}

const player3 = { 
    NOME : "Bowser",
    VELOCIDADE : 5,
    MANOBRABILIDADE : 2,
    PODER : 5,
    PONTOS : 0
}

const player4 = { 
    NOME : "Peach",
    VELOCIDADE : 3,
    MANOBRABILIDADE : 4,
    PODER : 2,
    PONTOS : 0
}

const player5 = { 
    NOME : "Yoshi",
    VELOCIDADE : 2,
    MANOBRABILIDADE : 4,
    PODER : 3,
    PONTOS : 0
}

const player6 = { 
    NOME : "Donkey Kong",
    VELOCIDADE : 2,
    MANOBRABILIDADE : 2,
    PODER : 5,
    PONTOS : 0
}

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1; 
}

async function getRamdomBlock(){
    let ramdom = Math.random();
    let result;

    switch (true){
        case ramdom < 0.33:
            result = 'RETA';
            break;
        case ramdom < 0.66:
            result = 'CURVA';
            break;
        default:
            result = 'CONFRONTO';
            break;
    }

    return result;
}

async function logRollResult(characterName, block, diceResult, attribute){
    console.log(`${characterName} 🎲 rolou um dado de  ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function declareWinner(character1, character2){
    console.log("\nResultado final:");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

    if(character1.PONTOS > character2.PONTOS){
        console.log(`\n${character1.NOME} venceu a corrida! 🏆`);
    }else if(character2.PONTOS > character1.PONTOS){
        console.log(`\n${character2.NOME} venceu a corrida! 🏆`);
    }else{
        console.log(`\nA corrida terminou em empate!`);
    }
}

async function playRaceEngine(character1, character2){
    
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`);

        let block = await getRamdomBlock();
        console.log(`Bloco: ${block}`);
    

        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === "RETA"){
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;
            await logRollResult(character1.NOME, block, diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, block, diceResult2, character2.VELOCIDADE);
        }

        if(block === "CURVA"){
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;
            await logRollResult(character1.NOME, block, diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, block, diceResult2, character2.MANOBRABILIDADE);
        }

        if(block === "CONFRONTO"){
            let powerResult1 = diceResult1 + character1.PODER
            let powerResult2 = diceResult2 + character2.PODER
            
            console.log(`${character1.NOME} confrontou com ${character2.NOME}!🥊`);

            await logRollResult(character1.NOME, block, diceResult1, character1.PODER);
            await logRollResult(character2.NOME, block, diceResult2, character2.PODER);

            if(powerResult1 > powerResult2 && character2.PONTOS > 0){
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto!`);
                character2.PONTOS--;
            }

            if(powerResult2 > powerResult1 && character1.PONTOS > 0){
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto!`);
                character1.PONTOS--;
            }
            
            console.log(powerResult2 === powerResult1 ? "Confronto empatado, nenhum ponto perdido." : "");
        }

        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
        }else if(totalTestSkill2 > totalTestSkill1){
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++;
        }

        console.log("----------------------------------")

    }

    await declareWinner(character1, character2);

}

(async function main(){
    console.log(`🏁🚨 Corrida Entre ${player1.NOME} e ${player2.NOME} começando...\n`);

    await playRaceEngine(player1, player2);
})()
