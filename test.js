let express = require('express');

let ourApp = express();

ourApp.use(express.urlencoded({extended: false}));

ourApp.get('/', function(req, res) {
    res.send(`
    <form action="/answer" method="POST">
        <p>Type something here...?</p>
        <input name="answer" autoComplete="off">
        <button>Submit</button>
    </form>
    `);
});

ourApp.post('/answer', function(req, res) {
    if (req.body.answer =='Ganesh') {
        res.send(`
            <p>Yes, that is correct!</p>
            <a href='/'>Back to homepage</a>
        `);
    } else {
        res.send(`
            <p>That is correct. Try again!</p>
            <a href='/'>Back to homepage</a>
        `);
    }
});

ourApp.listen(3000);