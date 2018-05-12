
const express= require('express');
const request= require('request');
const webpack= require('webpack');
//import webpackDevMiddleware from 'webpack-dev-middleware';
const webpackConfig =require('./webpack.config');

//inicializando paquetes
const app = express();
const path = require('path');

//declaramos el puerto
app.set('port', process.env.PORT || 3000);
//importamos rutas del api
const api= require('./apiRest.js')
app.use('/api', api);

app.use(express.static(path.join(__dirname, 'public')));
//Raiz
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '.', 'public', 'index.html'));
});

app.listen(app.get('port'), () => {
console.log("Servidor en ejecucion en el puerto:" + app.get('port') );
});

