const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

//inicializations
const app = express();//iniciar express

//settings 
app.set('port', process.env.PORT || 4000);
app.set('views',path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
    //configurar el motor de plantilla handlebars
    defaultLayout: 'main', 
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');//usar el motor de plantilla

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))//para solo aseptar texto simple y no imagenes 
app.use(express.json());//para enviar y recibir json

//Global variables
app.use((req, res, next) =>{
    next();
})

//routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));

//public


//starting the server
app.listen(app.get('port'), ()=>{
    console.log('Server on Port: ', app.get('port'));
})
