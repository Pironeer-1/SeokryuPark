var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body, control) {
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
    ${control}
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

          var template = templateHTML(title, list,
            `<h2>${title}</h2><p>${description}</p>`,
            `<a href="/create">create</a>`
            );
          response.writeHead(200);
          response.end(template);
          })

      } else {
          fs.readdir('./data', (err, filelist) => {
            let list = templateList(filelist);

            fs.readFile(`data/${queryData.id}`, 'utf-8', (err, description) => {
              var title = queryData.id;
              var template = templateHTML(title, list,
                `<h2>${title}</h2><p>${description}</p>`,
                `<a href="/create">create</a>
                <a href="/update?id=${title}">update</a>
                <form action="delete_process" method="post" onsubmit="return confirm('정말로 삭제하시겠습니까?');">
                    <input type="hidden" name="id" value="${title}">
                    <input type="submit" value="delete">
                </form>`
                );
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
                <form action="/create_process" method="post">
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
    } else if(pathName === '/create_process'){
      var body = '';

      request.on('data', function (data) {
          body = body + data;
      });

      request.on('end', function () {
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        // console.log(title);
        // console.log(description);
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        });
      });
    } else if(pathName === '/update'){
      fs.readdir('./data', function(error, filelist) {  // readdir : 해당 디렉토리에 있는 파일 목록을 배열로 반환
          var list = templateList(filelist);
          // 읽은 파일은 decription에 저장됨
          fs.readFile(`data/${queryData.id}`, 'utf8', function(err,description){
              var title = queryData.id;
              var template = templateHTML(title, list,
                  `
                  <form action="/update_process" method="post">
                      <input type="hidden" name="id" value="${title}">
                      <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                      <p>
                          <textarea name="description" placeholder="description">${description}</textarea>
                      </p>
                      <p>
                          <input type="submit">
                      </p>
                  </form>
                  `,
                  `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
                  );
              response.writeHead(200);
              response.end(template);
          });
      });
    } else if(pathName === '/update_process'){
        var body = '';

        request.on('data', function (data) {
            body = body + data;
        });

        request.on('end', function () {
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            // console.log(post);
            fs.rename(`data/${id}`, `data/${title}`, function(error){
                fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                    response.writeHead(302, {Location: `/?id=${title}`});
                    response.end();
                });
            });
      });
    } else if (pathName === '/delete_process') {
        var body = '';

        request.on('data', function (data) {
            body = body + data;
        });

        request.on('end', function () {
            var post = qs.parse(body);
            var id = post.id;
            fs.unlink(`data/${id}`, function(error){
                response.writeHead(302, {Location: `/`});
                response.end();
            });
        });
    } else {
      response.writeHead(404);
      response.end('Not Found...');
    }
});
app.listen(80);