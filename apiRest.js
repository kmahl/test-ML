const express =require("express");
const request =require("request");
const api = express.Router();
//autor
const autor = { name: 'Carlos', lastname: 'Vizcaya' };
api.get("/items", (req, res) => {
  console.log(req.query.q)
  let RespuestaBusqueda = {
    autor: {
      name: autor.name,
      lastname: autor.lastname
    },
    categories: [],
    items: []
  };
  Request(
    `https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}&limit=4`
  )
    .then(function(body) {
      if (body.filters.length > 0) {
        var categorias = body.filters.find(x => x.id === "category");
        if (categorias.values[0].path_from_root.length > 0)
          categorias.values[0].path_from_root.forEach(e => {
            RespuestaBusqueda.categories.push(e.name);
          });
      }
      if (body.results.length > 0) {
        var items = body.results.forEach(item => {
          RespuestaBusqueda.items.push({
            id: item.id,
            title: item.title,
            price: {
              currency: item.currency_id,
              amount: item.price,
              decimals: 0
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping
          });
        });
      }
      return res.json(RespuestaBusqueda);
    })
    .catch(function(err) {
      console.log(err);
    });
});
//obtener producto por ID
api.get("/items/:id", (req, res) => {
  let item = {
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
      description: ""
    }
  };
  Request(`https://api.mercadolibre.com/items/${req.params.id}`)
    .then(function(body) {
      item.item = {
        id: body.id,
        title: body.title,
        price: {
          currency: body.currency_id,
          amount: body.price,
          decimals: 0
        },
        picture: body.thumbnail,
        condition: body.condition,
        free_shipping: body.shipping.free_shipping,
        sold_quantity: body.sold_quantity
      };
      return Request(
        `https://api.mercadolibre.com/items/${req.params.id}/description`
      );
    })
    .then(function(params) {
      item.item.description = params.plain_text;
      res.json(item);
    })
    .catch(function(err) {
      console.log(err);
    });
});

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
module.exports = api;