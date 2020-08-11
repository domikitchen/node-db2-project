const express = require('express');
const knex = require('knex');
const { response } = require('../api/server');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './data/car-dealer.db3'
  },
  useNullAsDefault: true
});

const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
        .then(cars => {
            res.status(200).json(cars);
        })
        .catch(error => {
            res.status(500).json({ error: "Something went wrong retreiving the cars" });
        });
});

router.get('/:id', (req, res) => {
    const carId = req.params.id;

    db('cars').where({ id: carId })
        .then(car => {
            res.status(200).json(car);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "Something went wrong while trying to receive your data" });
        });
});

router.post('/', (req, res) => {
    const newCar = req.body;

    db('cars').insert(newCar)
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "Something went wrong while storing this data" });
        });
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    const carId = req.params.id;

    db('cars').where({ id: carId }).update(changes)
        .then(thing => {
            if(thing){
                res.status(201).json({ message: "Sucessfully updated!" });
            }
            else{
                res.status(404).json({ message: "ID not found" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "Something went wrong while updating your data" });
        });
});

router.delete('/:id', (req, res) => {
    const carId = req.params.id;

    db('cars').where({ id: carId }).del()
        .then(id => {
            if(id){
                res.status(200).json({ message: "Sucessfully removed" });
            }
            else{
                res.status(404).json({ message: "ID not found" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "Something went wrong while removing this data" });
        });
});

module.exports = router;