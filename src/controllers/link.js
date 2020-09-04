const express = require('express');
const router = express.Router();
const {
    Link
} = require("../models")

router.get('/', async(req, res) => {
    const accountId = 1 //=req.id;
    const link = await Link.findAll({ where: { accountId } });
    return res.jsonOK(link);
});

router.get('/:id', async(req, res) => {
    const accountId = 1 //=req.id;
    const { id } = req.params;
    const link = await Link.findOne({
        where: { id, accountId }
    });
    if (!link) return res.jsonNotFound(null);
    return res.jsonOK(link);
})

router.post('/', async(req, res) => {
    const accountId = 2 //= req.id;  

    const {
        label,
        url,
        isSocial
    } = req.body;

    const image = 'https://github.com/vncsmntr.png'

    const link = await Link.create({
        label,
        url,
        isSocial,
        image,
        accountId
    })
    return res.jsonOK(link)
})

router.put('/:id', async(req, res) => {
    const accountId = 1; //= req.id; 
    const {
        id
    } = req.params;
    const {
        body
    } = req;
    const fields = ['label', 'url', 'isSocial'];
    const link = await Link.findOne({
        where: { id, accountId }
    });
    if (!link) return res.jsonNotFound(null);
    fields.map(fieldName => {
        const newValue = body[fieldName]
        if (newValue) link[fieldName] = newValue;
    });
    await link.save();

    return res.jsonOK(link);
});

router.delete('/:id', async(req, res) => {
    const accountId = 1
    const { id } = req.params;
    const link = await Link.findOne({ where: { id, accountId } });
    if (!link) return res.jsonNotFound();
    await link.destroy();
    return res.jsonOK();
});

module.exports = router;