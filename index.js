const http = require("http");
const url = require('url');
const querystring = require('querystring');
const main = require("./main");

const server = http.createServer(async (req, res) => {
  res.setHeader("content-Type", "text/plain;charset=utf-8");
  if (req.url.startsWith('/sport')) {
    const parsedUrl = url.parse(req.url);
    const query = querystring.parse(parsedUrl.query);
    const runner = new main.MiMotionRunner(query.user, query.pwd,);
    const [msg, ok] = await runner.loginAndPostStep(query.step);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    console.log('[ msg ] >', msg)
    res.end(msg);
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain', });
    // 发送错误消息并结束响应
    res.end('Method Not Allowed\n');
  }
});

server.listen(6789, () => {
  console.log("服务器开启成功,请访问 http://localhost:6789");
});
