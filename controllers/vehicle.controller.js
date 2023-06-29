const express = require('express')
const VehicleModel = require("../models/vehicle.model")
const {query, body, param, validationResult} = require("express-validator")
const router = express.Router()
  

// /**
//  * @swagger
//  * /api/vehicle/multiple:
//  *   post:
//  *     tags: ["Vehicle"]
//  *     description: Insert multiple vehicles
//  *     requestBody:
//  *      required: true
//  *      content:
//  *       application/json:
//  *        schema:
//  *         type: array
//  *         items: 
//  *          type: object
//  *          $ref: '#/components/schemas/Vehicle'
//  *     responses:
//  *       200:
//  *         description: Success
//  *       400:
//  *         description: Error
//  */
// router.post('/multiple', async (req, res) => {
//     try {
//         vehicles = req.body
//         vehicles.forEach(async (element) => {
//             let vehicle = new VehicleModel(element)
//             vehicle = await vehicle.save()
//         });
//         res.send(`${vehicles.length} vehicles inserts !`)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

/**
 * @swagger
 * /api/vehicle:
 *   post:
 *     tags: ["Vehicle"]
 *     description: Get all vehicles
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       200:
 *         description: Success
 */
 router.post('/', async (req, res) => {
    try {
        req.body.forEach(async (element) => {
            let vehicle = new VehicleModel(element.fields)
            vehicle = await vehicle.save()
            // res.status(201).send({vehicle: vehicle})
        });
        res.send("ok")
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * @swagger
 * /api/vehicle:
 *   get:
 *     tags: ["Vehicle"]
 *     description: Get all vehicle
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.get('/', async (req, res) => {
    const vehicles = await VehicleModel.find({},null)
    res.send(vehicles)
})

/**
 * @swagger
 * /api/vehicle/{id}:
 *   get:
 *     tags: ["Vehicle"]
 *     description: Get vehicle by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The vehicle id
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
    const vehicle = await VehicleModel.findOne({_id: req.params.id})
    if (!vehicle) {
        return res.status(404).send({message: 'vehicle not found'})
    }
    res.send({vehicle: vehicle})
}
)

/**
 * @swagger
 * /api/vehicle/{id}:
 *   put:
 *     tags: ["Vehicle"]
 *     description: Modify vehicle by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The vehicle id
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         $ref: '#/components/schemas/Vehicle'
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
        const vehicle = await VehicleModel.findOneAndUpdate({_id: req.params.id}, req.body)
        vehicle.save()
        res.status(201).send({vehicle: vehicle})
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * @swagger
 * /api/vehicle:
 *   delete:
 *     tags: ["Vehicle"]
 *     description: Delete all Vehicles
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.delete('/', async (req, res) => {
    try {
        const vehicles = await VehicleModel.find({})
        vehicles.forEach(async (element) => {
            await element.delete()
        })
        res.send("All Vehicles has been deleted !")
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * @swagger
 * /api/vehicle/{id}:
 *   delete:
 *     tags: ["Vehicle"]
 *     description: Delete vehicle by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The vehicle id
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
    const vehicle = await VehicleModel.findOne({_id: req.params.id})
    if (!vehicle) {
        return res.status(404).send({vehicle: 'vehicle not found'})
    }
    try {
        await vehicle.delete()
        res.status(201).send({vehicle: vehicle})
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router