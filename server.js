var Express = require('express');
var proxy = require('express-http-proxy');
let App = Express();

//static files
App.use(Express.static('html/template/'));

//reverse proxy
App.use('/farmer', proxy('localhost:3001/'));
App.use('/processor', proxy('localhost:3002/'));
App.use('/certifier', proxy('localhost:3003/'));


let port = process.env.PORT || 3000;
App.listen(port, () => console.log(`Server listening on port ${port}!`))
