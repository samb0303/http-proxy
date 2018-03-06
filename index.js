var http = require('http'),
    httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({});

var server = http.createServer(function(req, res) {
  console.log(req.url);
  if ((/\/session/).test(req.url)) {
    proxy.web(req, res, { target: 'http://127.0.0.1:4201' });
  } else if ((/\/labels/).test(req.url)) {
    proxy.web(req, res, { target: 'http://127.0.0.1:4202' });
  } else if ((/\/dashboards/).test(req.url)) {
    proxy.web(req, res, { target: 'http://127.0.0.1:4203' });
  } else {
    proxy.web(req, res, { target: 'http://127.0.0.1:3000' });
  }
});

proxy.on('error', function(err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  res.end('Something went wrong. And we are reporting a custom error message.');
});

console.log("listening on port 4200")
server.listen(4200);
