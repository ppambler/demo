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
    console.log("他请求访问/index.html");
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    let string = fs.readFileSync(`public/index.html`);
    console.log(`fs.readFileSync('public/index.html')是一个${typeof string}`);
    console.log(string) //Buffer实例
    string = string.toString();
    console.log(string) // index.html里边的字符串化内容
    const page1 = fs.readFileSync(`db/page1.json`);
    console.log(page1)
    const array = JSON.parse(page1);
    console.log(array)
    const result = array.map((item) => `<li>${item.id}</li>`).join("");
    // 前后端不分离的渲染技术
    string = string.replace(`{{page}}`, `<ul>${result}</ul>`);
    console.log(result)
    response.write(string);
    response.end();
  } else if (path === "/5.json") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json;charset=utf-8");
    response.write(fs.readFileSync("./public/5.json"));
    response.end();
  } else if (path === "/4.xml") {
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
  } else if (path === "/page1.json") {
    response.statusCode = 200;
    console.log(`他请求访问/page1.json`);
    response.setHeader("Content-Type", "application/json;charset=utf-8");
    response.write(fs.readFileSync(`db/page1.json`));
    response.end();
  } else if (path === "/page2.json") {
    response.statusCode = 200;
    console.log(`他请求访问/page2.json`);
    response.setHeader("Content-Type", "application/json;charset=utf-8");
    response.write(fs.readFileSync(`db/page2.json`));
    response.end();
  } else if (path === "/page3.json") {
    response.statusCode = 200;
    console.log(`他请求访问/page3.json`);
    response.setHeader("Content-Type", "application/json;charset=utf-8");
    response.write(fs.readFileSync(`db/page3.json`));
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
