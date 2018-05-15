
const express= require('express');
const request= require('request');
const webpack= require('webpack');
const path = require('path');
const webpackConfig =require('./webpack.config');
//inicializa express que está basado en connect de node el cual se encarga del manejo de servidores HTTP
const app = express();
//importamos rutas del api, de esta forma las rutas que se encuentran dentro del archivo "apiRest.js"
const api= require('./apiRest.js')
//y se van a poder llamar como: /api/(ruta-interta-apiRest)
app.use('/api', api);
//se establece la ruta para los archivos estaticos, como las imagenes y estilos dentro de la carpeta public
app.use(express.static(path.join(__dirname, 'public')));
//Raiz, se asegura de que cualquier llamado devuelva el index
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '.', 'public', 'index.html'));
});
//declaramos el puerto
app.set('port', process.env.PORT || 3000);
//se escuchan las respuestas que vengan del puerto 3000 o alguno asignado
app.listen(app.get('port'), () => {
console.log("Servidor en ejecucion en el puerto:" + app.get('port') );
});

