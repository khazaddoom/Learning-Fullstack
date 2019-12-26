let express = require('express');
let mongodb = require('mongodb');
let sanitizeHtml = require('sanitize-html');
let app = express();
let db;
let connectionString = 'mongodb+srv://ToDoAppUser:SQ8eiCdR5LpdNYGg@cluster0-ixsd4.mongodb.net/ToDoApp?retryWrites=true&w=majority';

// Allow and Serve external GET POST or other similar full page requests to our backend!
app.use(express.urlencoded({extended: false}))

// Allow and serve Asynchronous requests to our backend
app.use(express.json())

// Serve static files from public folder as directly from root path is not possible
app.use(express.static('public'));

mongodb.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {

  if(err) {
    console.error(err);
    return;
  }
  
  db = client.db();

  app.listen(3000, function() {
      console.log('Server listening on Port 3000...')
  });

});

app.use(passwordProtected);

function passwordProtected(request, response, next) {
  response.set('WWW-Authenticate', 'Basic realm="My ToDo App"');
  if (request.headers.authorization == 'Basic Z2FuZXNoOjMxRGVjMTk4NiQ=') {
    next();
  } else {
    response.status(401).send('Unauthorized!')
  }
}



app.get('/', function(request, response) {
  
  db.collection('items').find().toArray(function(err, items) {    
    response.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Simple To-Do App</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    </head>
    <body>
      <div class="container">
        <h1 class="display-4 text-center py-1">To-Do App</h1>
        
        <div class="jumbotron p-3 shadow-sm">
          <form id="todo-form" method="POST" action="/create-item">
            <div class="d-flex align-items-center">
              <input id="todo-input" name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
              <button class="btn btn-primary">Add New Item</button>
            </div>
          </form>
        </div>
        
        <ul id="todo-list" class="list-group pb-5">
        </ul>    
      </div>
      <script>
        var items = ${JSON.stringify(items)};
      </script>
      <script src="https://unpkg.com/axios/dist/axios.min.js"></script>  
      <script src="browser.js"></script>
    </body>
    </html>
    `);    
  });
});

app.post('/create-item', function(request, response) {
  const safeText = sanitizeHtml(request.body.text, {
    allowedTags: [],
    allowedAttributes: []
  })
  db.collection('items').insertOne({text: safeText}, function (err, info) {
    response.json(info.ops[0])
  })
})

app.post('/update-item', function(request, response) {
  const safeText = sanitizeHtml(request.body.text, {
    allowedTags: [],
    allowedAttributes: []
  })
  db.collection('items').findOneAndUpdate({_id: new mongodb.ObjectId(request.body.id)}, {$set: {text: safeText}}, function(err, result) {
    response.send('Success!')
  })
})

app.post('/delete-item', function(request, response) {

  db.collection('items').deleteOne({_id: new mongodb.ObjectId(request.body.id)}, function() {
    response.send('Success!')
  })
})

