var mongodb = require('mongodb');
var url = require('url');
var mongo = process.env.MONGOHQ_URL || "mongodb://localhost:27017/db";

exports.findAll = function(req, res)
{
   mongodb.connect(mongo, function(err, conn)
   {
      conn.collection('slots', function(err, coll)
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
      conn.collection('slots', function(err, coll)
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

exports.addSlot = function(req, res)
{
   var slot = req.body;
   mongodb.connect(mongo, function(err, conn)
   {
      conn.collection('slots', function(err, coll)
      {
         coll.insert(slot, {safe:true}, function(err, result)
         {
            if (err)
            {
               res.send({'Error':'An error has occurred'});
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

exports.updateSlot = function(req, res)
{
   var id = req.params.id;
   var slot = req.body;
   mongodb.connect(mongo, function(err, conn)
   {
      conn.collection('slots', function(err, coll)
      {
         coll.update(
            {'_id':new BSON.ObjectID(id)},
            slot,
            {safe:true},
            function(err, result)
            {
               if (err)
               {
                  res.send({'Error':'An error occurred.'});
               }
               else
               {
                  res.send(slot);
               }
            });
      });
   });

}

exports.deleteSlot = function(req, res)
{
   var id = req.params.id;
   mongodb.connect(mongo, function(err, conn)
   {
      conn.collection('slots', function(err, coll)
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