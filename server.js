//  OpenShift sample Node application
var express = require('express'),
    httpProxy = require('http-proxy');

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

var proxy = httpProxy.createProxyServer({target: process.env.DARKSKY_API_URL, secure: false, changeOrigin: true});

proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });

    res.end('Something went wrong. And we are reporting a custom error message.');
});

proxy.on('proxyRes', function (proxyRes, req, res) {
    if (proxyRes.statusCode !== 200) {
        res.end('Something went wrong.');
    }
});

proxy.listen(port, ip);
console.log('Proxy Server running on http://%s:%s', ip, port);