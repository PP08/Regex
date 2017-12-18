var express = require('express');
var app = express();
app.use(express.static('./static'))

// app.get('/', function(req, res){
//     res.sendfile('./static/index.html');
// });

app.listen(8081, function(){
    console.log('app is listening on port 8081');
});