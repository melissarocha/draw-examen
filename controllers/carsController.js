const express = require('express');
const Car = require('../models/car');

function index(req, res, next){
  const page = req.params.page ? req.params.page : 1;
  Car.paginate({}, {
    page: page,
    limit: 3
  }, (err, objs) => {
    if (err) {
      res.json({
        error: true,
        message: 'No se puedieron extraer los carros.',
        objs: {}
      });
    } else {
      res.json({
        error: false,
        message: 'Lista de Carros',
        objs: objs
      });
    }
  });
}

// function.findOnde(req, res, next){
//   const id = req.params.productId;
//   Car.findOne({_id: id})
// }
// router.get("/:productId", (req, res, next) => {
//   const id = req.params.productId;
//   Product.findOne({_id: id})
//     .exec()
//     .then(doc => {
//       console.log("From database", doc);
//       if (doc) {
//         res.status(200).json(doc);
//       } else {
//         res
//           .status(404)
//           .json({ message: "No valid entry found for provided ID" });
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// });


function create(req, res, next){
  const model = req.body.model;
  const description = req.body.description;
  const status = req.body.status;
  const color = req.body.color;

  let car = new Car();
  car.model = model;
  car.description = description;
  car.status = status;
  car.color = color;

  car.save((err, objs)=>{
    if(err){
      res.json({
        error: true,
        message: 'No se pudo guardar el carro',
        objs: {}
      });
    }else{
      res.json({
        error: false,
        message: 'Carro Guardado',
        objs: {}
      });
    }
  });
}


function update(req, res, next){
  const model = req.body.model;
  const description = req.body.description;
  const status = req.body.status;
  const color = req.body.color;
}

function remove(req, res, next){
  const id = req.params.id;

  if(id){
    Car.remove({
      _id:id
    }, function(err){
      if(err){
        res.json({
          error: true,
          message: 'No se pudo eliminar el carro',
          objs: {}
        });
      });
    }else{
      res.json({
        error: false,
        message: 'Carro eliminado con Éxito',
        objs: {}
      });
    }
  }else{
    res.json({
      error: true,
      message: 'No existe carro',
      objs: {}
    });
  }
}

module.exports{
  index,
  create,
  update,
  remove
}
