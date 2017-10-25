const clrs = require('colors');
const beep = require('beepbeep');

const items = ['Hello', 'I\'m using', 'third-party', 'libraries', 'in', 'Node.js'];
const colors = ['green', 'red', 'grey', 'blue', 'yellow', 'magenta', 'cyan', 'grey'];

const writeNBeep = (str, color) => {
    console.log(str[`${color}`]);
    beep();
};

items.forEach((item, i) => {
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        writeNBeep(items[i], colors[randomIndex]);
    }, i * 1000);
});
