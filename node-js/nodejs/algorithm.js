const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];

rl.on('line', function (line) {
    lines.push(line.trim());
}).on('close', function () {
    processInput(lines);
    process.exit(0);
});

function processInput(input) {
    // 여기에 핵심 로직을 작성하세요.
  let i = 0;
  const startMoney = 80000;
  const minusMoney = 20000;
  while(i < lines.length) {
    let [name, count] = lines[i].split(' '); //이렇게 바로 요소로 넣어주기
    let remainMoney = startMoney - (Number(count) * minusMoney);
    if (remainMoney < 0) {
      remainMoney = 0;
    }
    console.log(`${name}: ${remainMoney}`)
    i += 1;
  }
		//
}