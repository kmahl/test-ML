const webpack =require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require("path");
//parametros de configuracion de webpack
module.exports = {
  //entry es la ruta inicial a donde debe dirigirse webpack para generar el bundle
  entry: "./src/index.jsx",
  //salida donde se generará el bundle
  output: {
    //directorio donde se creara el archivo
    path: path.resolve(__dirname, "public"),
    //nombre del archivo
    filename: "bundle.js",
    //configuracion recomendada, repara el bug "Uncaught SyntaxError: Unexpected token < (bundle.js:1)" en algunas rutas
    publicPath: '/'
  },
  module: {
    //extraido de la documentación de webpack: Estas reglas pueden modificar cómo se crea el módulo. 
    //Pueden aplicar cargadores al módulo o modificar el analizador.
    //los loaders pueden interpretar el codigo o formato que se encuentran en los archivos
    rules: [
        {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['es2015']
              }
            }
          },
        {
          test: /\.scss$/,
            use: [
                "style-loader", 
                "css-loader", 
                "sass-loader"
            ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'images/'
              }  
            }
          ]
        }
    ]
  },
  plugins: [
    //genera el archivo html en la carpeta public importando el script del bundle de salida
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    //elimina la carpeta public cada vez que se realiza un build
    new CleanWebpackPlugin(['public'], {verbose:true})
  ],
  //configuracion recomendada en el issue "https://github.com/request/request/issues/1529" 
  //que elimino un error que tenia al intentar compilar
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
