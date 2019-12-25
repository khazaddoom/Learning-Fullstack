let express = require('express');
let mongodb = require('mongodb');
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

})



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
          <form method="POST" action="/create-item">
            <div class="d-flex align-items-center">
              <input name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
              <button class="btn btn-primary">Add New Item</button>
            </div>
          </form>
        </div>
        
        <ul class="list-group pb-5">
          ${items.map(function(item) {
            return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">${item.text}</span>
            <div>
              <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
              <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
          </li>`
          }).join('')}
        </ul>    
      </div>
      <script src="https://unpkg.com/axios/dist/axios.min.js"></script>  
      <script src="browser.js"></script>
    </body>
    </html>
    `);    
  });
});

app.post('/create-item', function(request, response) {
  db.collection('items').insertOne({text: request.body.item}, function() {
    response.redirect('/')
  })
})

app.post('/update-item', function(request, response) {
  db.collection('items').findOneAndUpdate({_id: new mongodb.ObjectId(request.body.id)}, {$set: {text: request.body.text}}, function(err, result) {
    response.send('Success!')
  })
})

app.post('/delete-item', function(request, response) {

  
  
  response.send(`You clicked on ${request.body.id}`);
})

