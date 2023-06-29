const express = require('express')
const SpecieModel = require("../models/specie.model")
const {query, body, param, validationResult} = require("express-validator")
const router = express.Router()
  
// /**
//  * @swagger
//  * /api/specie/multiple:
//  *   post:
//  *     tags: ["Specie"]
//  *     description: Insert multiple species
//  *     requestBody:
//  *      required: true
//  *      content:
//  *       application/json:
//  *        schema:
//  *         type: array
//  *         items: 
//  *          type: object
//  *          $ref: '#/components/schemas/Specie'
//  *     responses:
//  *       200:
//  *         description: Success
//  *       400:
//  *         description: Error
//  */
// router.post('/multiple', async (req, res) => {
//     try {
//         species = req.body
//         species.forEach(async (element) => {
//             let specie = new SpecieModel(element)
//             specie = await specie.save()
//         });
//         res.send(`${species.length} species inserts !`)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

/**
 * @swagger
 * /api/specie:
 *   post:
 *     tags: ["Specie"]
 *     description: Get all species
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         $ref: '#/components/schemas/Specie'
 *     responses:
 *       200:
 *         description: Success
 */
 router.post('/', async (req, res) => {
    try {
        req.body.forEach(async (element) => {
            let specie = new SpecieModel(element.fields)
            specie = await specie.save()
            // res.status(201).send({specie: specie})
        });
        res.send("ok")
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * @swagger
 * /api/specie:
 *   get:
 *     tags: ["Specie"]
 *     description: Get all specie
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.get('/', async (req, res) => {
    const species = await SpecieModel.find({},null)
    res.send(species)
})

/**
 * @swagger
 * /api/specie/{id}:
 *   get:
 *     tags: ["Specie"]
 *     description: Get specie by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The specie id
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.get('/:id', 
param('id')
    .notEmpty()
    .withMessage('id is required')
    .isMongoId()
    .withMessage('id needs to be a mongodb id'),
(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next()
},
async (req, res) => {
    const specie = await SpecieModel.findOne({_id: req.params.id})
    if (!specie) {
        return res.status(404).send({message: 'specie not found'})
    }
    res.send({specie: specie})
}
)

/**
 * @swagger
 * /api/specie/{id}:
 *   put:
 *     tags: ["Specie"]
 *     description: Modify specie by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The specie id
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         $ref: '#/components/schemas/Specie'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.put('/:id', 
param('id')
    .notEmpty()
    .withMessage('id is required')
    .isMongoId()
    .withMessage('id needs to be a mongodb id'),
body(),
async (req, res) => {
    try {
        const specie = await SpecieModel.findOneAndUpdate({_id: req.params.id}, req.body)
        specie.save()
        res.status(201).send({specie: specie})
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * @swagger
 * /api/specie:
 *   delete:
 *     tags: ["Specie"]
 *     description: Delete all Species
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.delete('/', async (req, res) => {
    try {
        const species = await SpecieModel.find({})
        species.forEach(async (element) => {
            await element.delete()
        })
        res.send("All Species has been deleted !")
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * @swagger
 * /api/specie/{id}:
 *   delete:
 *     tags: ["Specie"]
 *     description: Delete specie by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The specie id
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.delete('/:id',
    param('id')
        .notEmpty()
        .withMessage('id is required')
        .isMongoId()
        .withMessage('id needs to be a mongodb id'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next()
    },
    async (req, res) => {
    const specie = await SpecieModel.findOne({_id: req.params.id})
    if (!specie) {
        return res.status(404).send({specie: 'specie not found'})
    }
    try {
        await specie.delete()
        res.status(201).send({specie: specie})
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router