const express = require('express');
const app = express();

app.get('/', function(request, response) {
    response.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>My ToDo App</title>
    </head>
    <body>
        <h1>Welcome to my new ToDo App</h1>
    </body>
    </html>
    `)
});

app.listen(3000, function() {
    console.log('Server listening on Port 3000...')
});