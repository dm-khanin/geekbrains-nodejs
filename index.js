/* eslint-disable no-console */
const readline = require('readline');
const fs = require('fs');
const colors = require('colors');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const gameResults = {
    roundsPlayed: 0,
    countSucceed: 0,
    countFailed: 0,
    eaglesCount: 0,
    tailsCount: 0,
};
let resultsFilename = 'game.log';

let playRound;

const startGame = () => {
    rl.question(
        'Добро пожаловать на игру "Орел и решка"!\n' +
        'Для записи результатов введите имя файла (например, game.log) ',
        (filename) => {
            if (filename.length && filename.indexOf('.') !== -1) {
                resultsFilename = filename;
            }

            const content = 'Результаты игры "Орел и решка"\n';
            fs.writeFile(resultsFilename, content, (err) => {
                if (err) throw err;
                console.log('Начинаем игру!');
                playRound();
            });
        },
    );
};

const writeResults = () => {
    const {
        roundsPlayed: n,
        countSucceed: win,
        countFailed: lose,
        eaglesCount: e,
        tailsCount: t,
    } = gameResults;

    const str =
        `Раундов сыграно: ${n}\n` +
        `Раундов выиграно: ${win}\n` +
        `Раундов проиграно: ${lose}\n` +
        `Выбрано значений "орел": ${e}\n` +
        `Выбрано значений "решка": ${t}\n`;

    fs.writeFile(resultsFilename, str, { flag: 'a' }, (err) => {
        if (err) throw err;
        console.log(`Результаты игры записаны в файл ${resultsFilename}.`);
    });
};

playRound = () => {
    rl.question('Ваш выбор: орел (1) или решка (2)? ', (plrStr) => {
        const playerStr = plrStr.toLowerCase();
        const cpuValue = Math.round(Math.random()) + 1;
        let playerValue;

        if (playerStr.match(/[Рр]ешка/) || playerStr === '2') {
            playerValue = 2;
            gameResults.tailsCount += 1;
        } else if (playerStr.match(/^[Оо]р[её]л$/) || playerStr === '1') {
            gameResults.eaglesCount += 1;
            playerValue = 1;
        } else {
            console.log('Вы ввели неверные данные, пожалуйста, повторите.');
            playRound();
            return;
        }

        gameResults.roundsPlayed += 1;

        if (playerValue === cpuValue) {
            console.log('Вы угадали!'.green);
            gameResults.countSucceed += 1;
        } else {
            console.log('Вы не угадали!'.red);
            gameResults.countFailed += 1;
        }

        rl.question('Сыграть еще? да (1) / нет ', (answer) => {
            if (answer.match(/^[Дд]а$/) || answer === '1') {
                playRound();
            } else {
                writeResults();
                console.log('Спасибо за игру!');
                rl.close();
            }
        });
    });
};

startGame();
