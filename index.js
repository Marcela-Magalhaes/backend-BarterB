require('dotenv').config();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const userRouter = require('./src/routes/userRouter');
const productsRouter = require('./src/routes/productsRouter');
const categoryRouter = require('./src/routes/categoryRouter');

// Connecting with mongodb
mongoose.set('useFindAndModify', false);
mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('DB connected'))
    .catch(err => console.log('Connection error', err));

const app = express();

app.set('port', process.env.PORT || process.env.OPTIONAL_PORT);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static(path.join(__dirname, 'public/imgs')));
app.use(morgan('dev'));

// Routes
app.use('/user', userRouter);
app.use('/products', productsRouter);
app.use('/categories', categoryRouter);


// Starting the server
app.listen(app.get('port'), () => {
    console.log('Running on port', app.get('port'));
});