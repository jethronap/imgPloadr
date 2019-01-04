const path = require('path');
const routes = require('./routes');
const exphbs = require('express-handlebars');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const errorHandler = require('errorhandler');
const moment = require('moment');
const multer = require('multer');

module.exports = (app)=>{
    app.use(morgan('dev'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }));

    app.engine('handlebars', exphbs.create({
        defaultLayout: 'main',
        layoutsDir:  `${app.get('views')}/layouts`,
        partialsDir: [ `${app.get('views')}/partials`],
        helpers: {
            timeago: (timestamp)=>{
                //console.log(timestamp.now);
                return moment(timestamp).startOf('minute').fromNow();
            }
        }
    }).engine);
    app.set('view engine', 'handlebars');

    app.use(morgan('dev'));
    app.use(multer({ dest: path.join(__dirname, 'public/upload/temp')}).single('file'));
    app.use(methodOverride());
    app.use(cookieParser('some-secret-value-here'));
    routes(app);

    app.use('/public/', express.static(path.join(__dirname, '../public')));

    if ('development' === app.get('env')) {
       app.use(errorHandler());
    }

    return app;
};
