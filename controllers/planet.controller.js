const express = require('express')
const PlanetModel = require("../models/planet.model")
const {query, body, param, validationResult} = require("express-validator")
const router = express.Router()

// /**
//  * @swagger
//  * /api/planet/multiple:
//  *   post:
//  *     tags: ["Planet"]
//  *     description: Insert multiple planets
//  *     requestBody:
//  *      required: true
//  *      content:
//  *       application/json:
//  *        schema:
//  *         type: array
//  *         items: 
//  *          type: object
//  *          $ref: '#/components/schemas/Planet'
//  *     responses:
//  *       200:
//  *         description: Success
//  *       400:
//  *         description: Error
//  */
// router.post('/multiple', async (req, res) => {
//     try {
//         planets = req.body
//         planets.forEach(async (element) => {
//             let planet = new PlanetModel(element)
//             planet = await planet.save()
//         });
//         res.send(`${planets.length} planets inserts !`)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

/**
 * @swagger
 * /api/planet:
 *   post:
 *     tags: ["Planet"]
 *     description: Get all planets
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         $ref: '#/components/schemas/Planet'
 *     responses:
 *       200:
 *         description: Success
 */
 router.post('/', async (req, res) => {
    try {
        req.body.forEach(async (element) => {
            let planet = new PlanetModel(element.fields)
            planet = await planet.save()
            // res.status(201).send({planet: planet})
        });
        res.send("ok")
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * @swagger
 * /api/planet:
 *   get:
 *     tags: ["Planet"]
 *     description: Get all planet
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.get('/', async (req, res) => {
    const planets = await PlanetModel.find({},null)
    res.send(planets)
})

/**
 * @swagger
 * /api/planet/{id}:
 *   get:
 *     tags: ["Planet"]
 *     description: Get planet by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The planet id
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
    const planet = await PlanetModel.findOne({_id: req.params.id})
    if (!planet) {
        return res.status(404).send({message: 'planet not found'})
    }
    res.send({planet: planet})
}
)

/**
 * @swagger
 * /api/planet/{id}:
 *   put:
 *     tags: ["Planet"]
 *     description: Modify planet by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The planet id
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         $ref: '#/components/schemas/Planet'
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
        const planet = await PlanetModel.findOneAndUpdate({_id: req.params.id}, req.body)
        planet.save()
        res.status(201).send({planet: planet})
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * @swagger
 * /api/planet:
 *   delete:
 *     tags: ["Planet"]
 *     description: Delete all Planets
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.delete('/', async (req, res) => {
    try {
        const planets = await PlanetModel.find({})
        planets.forEach(async (element) => {
            await element.delete()
        })
        res.send("All Planets has been deleted !")
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * @swagger
 * /api/planet/{id}:
 *   delete:
 *     tags: ["Planet"]
 *     description: Delete planet by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The planet id
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
    const planet = await PlanetModel.findOne({_id: req.params.id})
    if (!planet) {
        return res.status(404).send({planet: 'planet not found'})
    }
    try {
        await planet.delete()
        res.status(201).send({planet: planet})
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router