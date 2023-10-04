var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const {sequelize}= require('./models/index');
var app = express();



app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
sequelize.sync().then(()=>{
    app.listen(process.env.PORT,()=>{
    console.log('express running')
    });
});
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req,res, next)=>{
    const err = new Error('Not found');
    err.status=404;
    next(err);
});

app.use((error, req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        message:error.message
    });
})
module.exports = app;
