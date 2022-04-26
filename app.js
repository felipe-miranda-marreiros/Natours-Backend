const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//Middlers
app.use(morgan('dev'));
app.use(express.json());
//Podemos enviar arquivos estaticos usando express.static(<caminho>)
app.use(express.static(`${__dirname}/public/`));

//Routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
