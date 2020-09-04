const express = require('express');
const router = express.Router();
const {
    Link
} = require("../models")

router.get('/', async(req, res) => {
    const { accountId } = req
    const link = await Link.findAll({ where: { accountId } });
    return res.jsonOK(link);
});

router.get('/:id', async(req, res) => {
    const { accountId } = req
    const { id } = req.params;
    const link = await Link.findOne({
        where: { id, accountId }
    });
    if (!link) return res.jsonNotFound(null);
    return res.jsonOK(link);
})

router.post('/', async(req, res) => {
    const { accountId, body } = req

    const {
        label,
        url,
        isSocial
    } = body;

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
    const { accountId, body } = req
    const {
        id
    } = req.params;
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
    const { accountId } = req
    const { id } = req.params;
    const link = await Link.findOne({ where: { id, accountId } });
    if (!link) return res.jsonNotFound();
    await link.destroy();
    return res.jsonOK();
});

module.exports = router;