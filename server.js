var Express = require('express');
var proxy = require('express-http-proxy');
let App = Express();

// direct to static files with html extensions
App.use(Express.static('html/',{extensions:['html']}));

// reverse proxy for 2 identities
App.use('/farmer', proxy('localhost:3001/'));
App.use('/processor', proxy('localhost:3002/'));
App.use('/certifier', proxy('localhost:3003/'));
App.use('/wholesaler', proxy('localhost:3004/'));


let port = process.env.PORT || 3000;
App.listen(port, () => console.log(`Server listening on port ${port}!`))
