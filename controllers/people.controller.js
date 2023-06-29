const express = require('express')
const PeopleModel = require("../models/people.model")
const {query, body, param, validationResult} = require("express-validator")
const router = express.Router()
  
// /**
//  * @swagger
//  * /api/people/multiple:
//  *   post:
//  *     tags: ["People"]
//  *     description: Insert multiple people
//  *     requestBody:
//  *      required: true
//  *      content:
//  *       application/json:
//  *        schema:
//  *         type: array
//  *         items: 
//  *          type: object
//  *          $ref: '#/components/schemas/People'
//  *     responses:
//  *       200:
//  *         description: Success
//  *       400:
//  *         description: Error
//  */
//  router.post('/multiple', async (req, res) => {
//     try {
//         peoples = req.body
//         peoples.forEach(async (element) => {
//             let people = new PeopleModel(element)
//             people = await people.save()
//         });
//         res.send(`${peoples.length} peoples inserts !`)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

/**
 * @swagger
 * /api/people:
 *   post:
 *     tags: ["People"]
 *     description: Insert people
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         $ref: '#/components/schemas/People'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
 router.post('/', body("name").trim().escape(), async (req, res) => {
    try {
        let people = new PeopleModel(req.body)
        people = await people.save()
        res.status(201).send({people: people})
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * @swagger
 * /api/people:
 *   get:
 *     tags: ["People"]
 *     description: Get all peoples
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.get('/', async (req, res) => {
    try {
        const peoples = await PeopleModel.find({},null)
        res.send(peoples)
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * @swagger
 * /api/people/{id}:
 *   get:
 *     tags: ["People"]
 *     description: Get people by id
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         $ref: '#/components/schemas/People'
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
        const people = await PeopleModel.findOne({_id: req.params.id})
        if (!people) {
            return res.status(404).send({message: 'people not found'})
        }
        res.send({people: people})
    }
)

/**
 * @swagger
 * /api/people/{id}:
 *   put:
 *     tags: ["People"]
 *     description: Modify people by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The people id
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         $ref: '#/components/schemas/People'
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
        const people = await PeopleModel.findOneAndUpdate({_id: req.params.id}, req.body)
        people.save()
        res.status(201).send({people: people})
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * @swagger
 * /api/people:
 *   delete:
 *     tags: ["People"]
 *     description: Delete all peoples
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.delete('/', async (req, res) => {
    try {
        const peoples = await PeopleModel.find({})
        peoples.forEach(async (element) => {
            await element.delete()
        })
        res.send("All peoples has been deleted !")
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * @swagger
 * /api/people/{id}:
 *   delete:
 *     tags: ["People"]
 *     description: Delete people by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The people id
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
    const people = await PeopleModel.findOne({_id: req.params.id})
    if (!people) {
        return res.status(404).send({people: 'people not found'})
    }
    try {
        await people.delete()
        res.status(201).send({people: people})
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router