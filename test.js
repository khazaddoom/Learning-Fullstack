let express = require('express');

let ourApp = express();



ourApp.get('/', function(req, res) {
    res.send(`
    <form action="/answer" method="POST">
        <p>What is the color of the sky on a bright sunny day?</p>
        <input name="answer" autoComplete="off">
        <button>Submit</button>
    </form>
    `);
});

ourApp.post('/answer', function(req, res) {
    const answer = (req.body.answer).toLowerCase();
    if (answer ==='blue') {
        res.send(`
            <p>Yes ${req.body.answer}, that is correct!</p>
            <a href='/'>Back to homepage</a>
        `);
    } else {
        res.send(`
            <p>That is incorrect. Try again!</p>
            <a href='/'>Back to homepage</a>
        `);
    }
});

ourApp.use(express.urlencoded({extended: false}));

ourApp.listen(3000);