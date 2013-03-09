var express = require('express');
var mongodb = require('mongodb');
var url = require('url');
var app = express();

var mongourl = url.parse(process.env.MONGOHQ_URL);
var dbName = mongourl.pathname.replace(/^\//, '');
var mongo = process.env.MONGOHQ_URL;

app.get('/', function(req, res)
{
   record_visit(req, res);
});
app.listen(process.env.PORT || 5000);

var record_visit = function(req, res)
{
   require('mongodb').connect(mongo, function(err, conn)
   {
      conn.collection('ips', function(err, coll)
      {
         var object_to_insert = { 'ip': req.connection.remoteAddress, 'ts': new Date()};
         coll.insert(object_to_insert, {safe:true}, function(err)
         {
            res.writeHeader(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(object_to_insert));
            res.end('\n');
         });
      });
   });
}