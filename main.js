let http =  require('http');

let ourApp = http.createServer(function(req, res) {
    console.log(req.url);
    if (req.url === '/about') {
        res.end('This is about us. We do a lot of stuff.');
    }
    res.end('Hello, welcome to our website.');
});

ourApp.listen(3000);