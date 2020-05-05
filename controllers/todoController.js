var bodyParser = require('body-parser');
var mongoose =require('mongoose');

// connect to the database
mongoose.connect('mongodb+srv://test:test123@todo-ojeab.mongodb.net/test?retryWrites=true&w=majority')

// create a schema - this is a blueprint

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item: 'buy flowers'}).save(function(err){
//     if (err) throw err;
//     console.log('item saved');
// });

// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding butt'}]
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.get('/todo', function(req, res){
        // get data from mongoDB and pass it to the view
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todos: data});
        });
        
    });

    app.post('/todo', urlencodedParser , function(req, res){
        // get data from the view and add it to MongoDB
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data)
        })
        
    });

    app.delete('/todo/:item', function(req, res){
        // delete requested item from MongoDB
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err;
            res.json(data)
        })
        
    });

};