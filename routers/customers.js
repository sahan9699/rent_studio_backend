const express = require('express');
const {Customer,validateCustomer} = require('./../models/customer');

const router = express.Router();

router.get('/', async (req,res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async(req,res) => {
    const customer = await Customer.findById(req.body.id);
    if(!customer) return res.status(404).send('The customer with the given id was not found');

    res.send(customer);
});

router.post('/', async (req,res) => {
    const result = validateCustomer(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })
    await Customer.save();
    res.send(customer);
});

router.put('/:id', async (req,res) => {
    const result = validateCustomer(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    const customer =  await Customer.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!customer) return res.status(404).send("The customer with the given id was not found.");
    res.send(customer);
});

router.delete("/:id", async (req,res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(404).send("The genre with the given id was not found.");
 
    res.send(customer);
});

module.exports = router;