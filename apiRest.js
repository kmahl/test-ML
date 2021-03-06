const express = require("express");
const request = require("request");

//autor para agregarlo en los JSON
const autor = { name: 'Carlos', lastname: 'Vizcaya' };
//se declara la variable que se le asignara a "module.exports" con todas las rutas del api
const api = express.Router();
//GET para la busqueda de productos 
api.get("/items", (req, res) => {
  //Se instancia el objeto vacio (Se pudo crear una clase pero a modo practico este objeto cumple la funcion)
  let RespuestaBusqueda = {
    author: {
      name: autor.name,
      lastname: autor.lastname
    },
    categories: [],
    items: []
  }
  //se verifica si en el URI se está realizando una consulta en formato ?q=query
  if (req.query.q) {
    let query = req.query.q;
    //se llama a la función creada al final Request(url) la cual retorna una nueva promesa
    Request(
      `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`
    )
      //si la respuesta fue exitosa el resolve envia el parametro recibido al then y con el se realiza la carga de datos
      //para luego enviar la respuesta en formato JSON
      .then(function (body) {
        //condicional para obtener las categorias ya que vi que se encuentran dentro de "filters" en un objeto con ID "category"
        //que contiene un arreglo "values" de un solo objeto que contiene la lista de categorias en "path_from_root" 
        if (body.filters.length > 0) {
          var categorias = body.filters.find(x => x.id === "category");
          if (categorias.values[0].path_from_root.length > 0)
            categorias.values[0].path_from_root.map(e => {
              RespuestaBusqueda.categories.push(e.name);
            });
        }
        //el arreglo de productos se encuentra en results
        if (body.results.length > 0) {
          var items = body.results.map(item => {
            //dentro de la lista de productos cada uno tiene una propiedad "condition" pero este está en ingles,
            //pero dentro de los atributos existe un objeto con ID="ITEM_CONDITION" que posee la condicion en español
            var condition = "";
            if (item.attributes.length > 0) {
              var attributes = item.attributes.find(x => x.id === "ITEM_CONDITION");
              if(attributes)
                condition = attributes.value_name;
                else
                condition = "";
            }
            //para obtener el precio y los decimales por separado realice un "split" y asi enviar cada uno por separado
            var fullPrice = item.price.toString().split('.')
            RespuestaBusqueda.items.push({
              id: item.id,
              title: item.title,
              location: item.address.state_name,
              price: {
                currency: item.currency_id,
                amount: fullPrice[0],
                decimals: fullPrice[1] || 0,
              },
              picture: item.thumbnail,
              condition: condition,
              free_shipping: item.shipping.free_shipping
            });
          });
        }
        return res.json(RespuestaBusqueda);
      })
      .catch(function (err) {
        console.log(err);
      });
  } else {
    sendError(res, 'Query invalida');
  }
});
//obtener producto por ID
api.get("/items/:id", (req, res) => {
  let itemResp = {
    author: {
      name: autor.name,
      lastname: autor.lastname
    },
    item: {
      id: "",
      title: "",
      price: {
        currency: "",
        amount: 0,
        decimals: 0
      },
      picture: "",
      condition: "",
      free_shipping: "",
      sold_quantity: 0,
      description: "",
      categories: [],
    }
  };
  //se realiza el primer request para obtener el item completo por ID
  Request(`https://api.mercadolibre.com/items/${req.params.id}`)
    .then(function (body) {
      var condition = "";
      if (body.attributes.length > 0) {
        var attributes = body.attributes.find(x => x.id === "ITEM_CONDITION");
        condition = attributes.value_name
      }
      var fullPrice = body.price.toString().split('.')
      itemResp.item = {
        id: body.id,
        title: body.title,
        price: {
          currency: body.currency_id,
          amount: fullPrice[0],
          decimals: fullPrice[1] || 0,
        },
        picture: body.pictures[0].url,
        condition: condition,
        free_shipping: body.shipping.free_shipping,
        sold_quantity: body.sold_quantity,
        description: "",
        categories: [],
      };
      //se retorna realizando otro Request para obtener la categoria del producto que será usada en el breadcrumb
      return Request(
        `https://api.mercadolibre.com/categories/${body.category_id}`
      );
    })
    //si retorna la segunda promesa se asigna la propiedad categories
    .then(function (categ) {
      let categories = categ.path_from_root;
      if (categories.length > 0) {
        categories.forEach(category => {
          itemResp.item.categories.push(category.name);
        })
      }
      //se realiza un tercer llamado para obtener la descripcion detallada del producto
      return Request(
        `https://api.mercadolibre.com/items/${req.params.id}/description`
      );
    })
    .then(function (params) {
      itemResp.item.description = params.plain_text;
      res.json(itemResp);
    })
    .catch(function (err) {
      console.log(err);
    });
});
/**
 * Funcion que realiza un request y retorna una promesa.
 * @param {string} uri - Uri a realizar la consulta.
 */
function Request(uri) {
  return new Promise(function (resolve, reject) {
    request({
      method: 'GET',
      url: uri,
      json: true
    },
      function (error, response, body) {
        if (!error && response.statusCode === 200)
          resolve(body)
        else
          reject(error)
      }
    )
  });
}
module.exports= api