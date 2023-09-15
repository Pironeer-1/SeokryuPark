var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body) {
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    <a href="/create">create</a>
    ${body}
  </body>
  </html>
  `;
}

function templateList(filelist){
  var list = '<ul>';
  let i = 0;
  while (i < filelist.length) {
    listComponent = `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
    list += listComponent;
    i += 1;
  }
  list = list + '</ul>';
  return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathName = url.parse(_url, true).pathname;

    if (pathName === '/') {
      if (queryData.id === undefined) {
        
        fs.readdir('./data', (err, filelist) => {
          console.log(filelist);

          var title = 'New dsfrsdfTITLE';
          var description = 'HElloooooooo'
          let list = templateList(filelist);

          var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
          response.writeHead(200);
          response.end(template);
          })

      } else {
          fs.readdir('./data', (err, filelist) => {
            let list = templateList(filelist);

            fs.readFile(`data/${queryData.id}`, 'utf-8', (err, description) => {
              var title = queryData.id;
              var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
              response.writeHead(200);
              response.end(template);
            });
          });
        }
    } else if (pathName === '/create'){
        fs.readdir('./data', function(error, filelist) {
            var title = 'WEB - create';
            var list = templateList(filelist);
            var template = templateHTML(title, list, `
                <form action="http://localhost:3000/create_process" method="post">
                    <p><input type="text" name="title" placeholder="title"></p>
                    <p>
                        <textarea name="description" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                </form>
            `);
            response.writeHead(200);   
            response.end(template);
        });
    } else {
      response.writeHead(404);
      response.end('Not Found...');
    }
});
app.listen(80);