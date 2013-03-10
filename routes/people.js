var mongodb = require('mongodb');
var url = require('url');
var mongo = process.env.MONGOHQ_URL || "mongodb://localhost:27017/db";
var BSON = mongodb.BSONPure;



exports.findAll = function(req, res)
{
   mongodb.connect(mongo, function(err, conn)
   {
      conn.collection('people', function(err, coll)
      {
         coll.find().toArray(function(err, items)
         {
            res.send(items);
         });
      });
   });
}

exports.findById = function(req, res)
{
   var id = req.params.id;
   mongodb.connect(mongo, function(err, conn)
   {
      conn.collection('people', function(err, coll)
      {
         coll.findOne(
            {'_id':new BSON.ObjectID(id)},
            function(err, item)
            {
               res.send(item);
            });
      });
   });
}

exports.addPerson = function(req, res)
{
   var person = req.body;
   mongodb.connect(mongo, function(err, conn)
   {
      conn.collection('people', function(err, coll)
      {
         coll.insert(person, {safe:true}, function(err, result)
         {
            if (err)
            {
               res.send({'Error': 'An error has occurred'});
            }
            else
            {
               console.log('Success: ' + JSON.stringify(result[0]));
               res.send(result[0]);
            }
         });
      });
   });
}

exports.updatePerson = function(req, res)
{
   var id = req.params.id;
   var person = req.body;
   mongodb.connect(mongo, function(err, conn)
   {
      conn.collection('people', function(err, coll)
      {
         coll.update(
            {'_id':new BSON.ObjectID(id)},
            person,
            {safe:true},
            function(err, result)
            {
               if (err)
               {
                  res.send({'Error':'An error occurred.'});
               }
               else
               {
                  res.send(person);
               }
            });
      });
   });
}

exports.deletePerson = function(req, res)
{
   var id = req.params.id;
   mongodb.connect(mongo, function(err, conn)
   {
      conn.collection('people', function(err, coll)
      {
         coll.remove(
            {'_id': new BSON.ObjectID(id)},
            {safe: true},
            function(err, result)
            {
               if (err)
               {
                  res.send({'Error':'An error occurred.'});
               }
               else
               {
                  res.send(req.body);
               }
            });
      });
   });
}