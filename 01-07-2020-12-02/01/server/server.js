var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port) {
  console.log("请指定端口号好不啦？\nnode server.js 8888 这样不会吗？");
  process.exit(1);
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  /******** 从这里开始看，上面不要看 ************/

  console.log("有个傻子发请求过来啦！路径（带查询参数）为：" + pathWithQuery);

  if (path === "/" || path === "/index.html") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(fs.readFileSync("./public/index.html"));
    response.end();
   } else if (path === "/5.json") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json;charset=utf-8");
    response.write(fs.readFileSync("./public/5.json"));
    response.end();
   }
  else if (path === "/4.xml") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/xml;charset=utf-8");
    response.write(fs.readFileSync("./public/4.xml"));
    response.end();
  } else if (path === "/public/3.html") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(fs.readFileSync("./public/3.html"));
    response.end();
  } else if (path === "/scripts/getjs.js") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain;charset=utf-8");
    response.write(fs.readFileSync("./scripts/getjs.js"));
    response.end();
  } else if (path === "/scripts/main.js") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/javaScript;charset=utf-8");
    response.write(fs.readFileSync("./scripts/main.js"));
    response.end();
  } else if (path === "/styles/main.css") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/css;charset=utf-8");
    response.write(fs.readFileSync("./styles/main.css"));
    response.end();
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(`你输入的路径不存在对应的内容`);
    response.end();
  }

  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log(
  "监听 " +
    port +
    " 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:" +
    port
);
