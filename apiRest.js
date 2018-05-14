const express = require("express");
const request = require("request");
const api = express.Router();
//autor
const autor = { name: 'Carlos', lastname: 'Vizcaya' };
api.get("/items", (req, res) => {
  let RespuestaBusqueda = {
    author: {
      name: autor.name,
      lastname: autor.lastname
    },
    categories: [],
    items: []
  }
  if (req.query.q) {
    let query = req.query.q;
    Request(
      `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`
    )
      .then(function (body) {
        if (body.filters.length > 0) {
          var categorias = body.filters.find(x => x.id === "category");
          if (categorias.values[0].path_from_root.length > 0)
            categorias.values[0].path_from_root.map(e => {
              RespuestaBusqueda.categories.push(e.name);
            });
        }
        if (body.results.length > 0) {
          var items = body.results.map(item => {
            var condition = "";
            if (item.attributes.length > 0) {
              var attributes = item.attributes.find(x => x.id === "ITEM_CONDITION");
              condition = attributes.value_name
            }
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
        picture: body.thumbnail,
        condition: condition,
        free_shipping: body.shipping.free_shipping,
        sold_quantity: body.sold_quantity,
        description: "",
        categories: [],
      };
      return Request(
        `https://api.mercadolibre.com/categories/${body.category_id}`
      );
    })
    .then(function (categ) {
      let categories = categ.path_from_root;
      if (categories.length > 0) {
        categories.forEach(category => {
          itemResp.item.categories.push(category.name);
        })
      }
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