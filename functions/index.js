const functions = require('firebase-functions');

var express = require('express');
var path = require('path');

var app = express();

var publicDir = path.join(__dirname, 'public');

app.set('port', process.env.PORT || 3000);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('dataDir', path.join(__dirname, 'data'));

app.set('dynamicCache', 20*60);
app.set('semiCache', 60*60);
app.set('staticCache', 12*60*60);

app.locals.siteTitle = 'Coronavirus Dashboard';

app.use(express.static(publicDir));

app.use(require('./routes/index'));
app.use(require('./routes/newsfeed'));
app.use(require('./routes/cluster'));
app.use(require('./routes/resources'));
app.use(require('./routes/database'));
// app.use(require('./routes/resources'));
// app.use(require('./routes/prevention'));
app.use(require('./routes/helpline'));
app.use(require('./routes/faqs'));
app.use(require('./routes/about'));



exports.app = functions.https.onRequest(app);
