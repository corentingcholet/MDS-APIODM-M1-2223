const express = require('express')
const StarshipModel = require("../models/starship.model")
const {query, body, param, validationResult} = require("express-validator")
const router = express.Router()
  
// /**
//  * @swagger
//  * /api/starship/multiple:
//  *   post:
//  *     tags: ["Starship"]
//  *     description: Insert multiple starships
//  *     requestBody:
//  *      required: true
//  *      content:
//  *       application/json:
//  *        schema:
//  *         type: array
//  *         items: 
//  *          type: object
//  *          $ref: '#/components/schemas/Starship'
//  *     responses:
//  *       200:
//  *         description: Success
//  *       400:
//  *         description: Error
//  */
// router.post('/multiple', async (req, res) => {
//     try {
//         starships = req.body
//         starships.forEach(async (element) => {
//             let starship = new StarshipModel(element)
//             starship = await starship.save()
//         });
//         res.send(`${starships.length} starships inserts !`)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

/**
 * @swagger
 * /api/starship:
 *   post:
 *     tags: ["Starship"]
 *     description: Get all starships
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         $ref: '#/components/schemas/Starship'
 *     responses:
 *       200:
 *         description: Success
 */
 router.post('/', async (req, res) => {
    try {
        req.body.forEach(async (element) => {
            let starship = new StarshipModel(element.fields)
            starship = await starship.save()
            // res.status(201).send({starship: starship})
        });
        res.send("ok")
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * @swagger
 * /api/starship:
 *   get:
 *     tags: ["Starship"]
 *     description: Get all starship
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.get('/', async (req, res) => {
    const starships = await StarshipModel.find({},null)
    res.send(starships)
})

/**
 * @swagger
 * /api/starship/{id}:
 *   get:
 *     tags: ["Starship"]
 *     description: Get starship by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The starship id
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
    const starship = await StarshipModel.findOne({_id: req.params.id})
    if (!starship) {
        return res.status(404).send({message: 'starship not found'})
    }
    res.send({starship: starship})
}
)

/**
 * @swagger
 * /api/starship/{id}:
 *   put:
 *     tags: ["Starship"]
 *     description: Modify starship by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The starship id
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         $ref: '#/components/schemas/Starship'
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
        const starship = await StarshipModel.findOneAndUpdate({_id: req.params.id}, req.body)
        starship.save()
        res.status(201).send({starship: starship})
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * @swagger
 * /api/starship:
 *   delete:
 *     tags: ["Starship"]
 *     description: Delete all Starships
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.delete('/', async (req, res) => {
    try {
        const starships = await StarshipModel.find({})
        starships.forEach(async (element) => {
            await element.delete()
        })
        res.send("All Starships has been deleted !")
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * @swagger
 * /api/starship/{id}:
 *   delete:
 *     tags: ["Starship"]
 *     description: Delete starship by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The starship id
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
    const starship = await StarshipModel.findOne({_id: req.params.id})
    if (!starship) {
        return res.status(404).send({starship: 'starship not found'})
    }
    try {
        await starship.delete()
        res.status(201).send({starship: starship})
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router