let express = require('express');

let ourApp = express();

ourApp.get('/', function(req, res) {
    res.send(`
    <form action="/answer" method="POST">
        <p>What is the answer?</p>
        <input name="ans" autoComplete="off">
        <button>Submit</button>
    </form>
    `);
});

ourApp.post('/answer', function(req, res) {
    res.send('We received your answer, we will get back to you soon!')
});

ourApp.listen(3000)

// console.log(express)