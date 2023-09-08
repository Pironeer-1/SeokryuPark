var fs = require('fs'); // fs 라는 변수 fs 모듈을 다룰 수 있게 됨. (fs: file system)
fs.readFile('sample.txt', 'utf-8', (err, data) => {
  console.log(data);
});