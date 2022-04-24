var express = require('express');
var app = express();
var storage = require('./storage')
 


app.use(express.json());

//GET
app.get('/api/todos', function(req,res){
    res.send(storage)
});



//POST
app.post ('/api/todos', function(req,res){
    const text = req.body.text;
    if (text ===''){
        res.status(400).send('Error: text is empty')
    };
    const id = Math.floor((Math.random() * 100) + 1);
    storage[id] = {
        text: text,
        done: false
    };
    res.send('todo added');
});


//Optional Update
app.put ('/api/todos/:id', function(req,res) {
    const id = req.params.id;
    if (id in storage) {
            if (req.body.text == undefined || req.body.text == '') {
                storage[id].done = req.body.done;
            }else if (req.body.done == undefined || req.body.done == '') {
                storage[id].text = req.body.text;
            }else {
                storage[id].text = req.body.text;
                storage[id].done = req.body.done;
            } 

        const text = req.body.text;
        const done = req.body.done;
        
        if  (text ==='' && done===''){
            res.status(400).send('Error: text and done are empty')
        } else if (text ===''){
            res.status(400).send('Error: text is empty')
        }else if (done===''){
            res.status(400).send('Error: done is empty')
        };
        res.send('Data updated');
        return
            
    }
    res.status(400).send('Bad request');
});


//DELETE
app.delete('/api/todos/:id',function(req,res){
    const id = req.params.id;
    if (id in storage) {
        const text = req.body.text;
        const done = req.body.done;

        delete storage[id]
        res.send('Data deleted')
        
    } else {
        res.send(400).send('Bad request')
        return
    }
    
});


module.exports= {app}
