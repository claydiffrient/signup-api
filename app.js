var express = require('express');
var people = require('./routes/people');
var slots = require('./routes/slots');
var app = express();

app.configure(function()
{
   app.use(express.bodyParser());
   app.use(app.router);
});

app.get('/people', people.findAll);
app.get('/people/:id', people.findById);
app.post('/people', people.addPerson);
app.put('/people/:id', people.updatePerson);
app.delete('/people/:id', people.deletePerson);
app.get('/slots', slots.findAll);
app.get('/slots/:id', slots.findById);
app.post('/slots', slots.addSlot);
app.put('/slots/:id', slots.updateSlot);
app.delete('/slots/:id', slots.deleteSlot);

app.get('/', function(req, res)
{
   res.writeHeader(200, {'Content-Type': 'text/plain'});
   res.write("Thanks for connecting.  Please issue a command");
   res.end();
});



app.listen(process.env.PORT || 3000);

