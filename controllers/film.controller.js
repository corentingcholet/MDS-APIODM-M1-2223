const express = require('express')
const FilmModel = require("../models/film.model")
const {query, body, param, validationResult} = require("express-validator")
const router = express.Router()

// /**
//  * @swagger
//  * /api/film/multiple:
//  *   post:
//  *     tags: ["Film"]
//  *     description: Insert multiple films
//  *     requestBody:
//  *      required: true
//  *      content:
//  *       application/json:
//  *        schema:
//  *         type: array
//  *         items: 
//  *          type: object
//  *          $ref: '#/components/schemas/Film'
//  *     responses:
//  *       200:
//  *         description: Success
//  *       400:
//  *         description: Error
//  */
// router.post('/multiple', async (req, res) => {
//     try {
//         films = req.body
//         films.forEach(async (element) => {
//             let film = new FilmModel(element)
//             film = await film.save()
//         });
//         res.send(`${films.length} films inserts !`)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

/**
 * @swagger
 * /api/film:
 *   post:
 *     tags: ["Film"]
 *     description: Get all films
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         $ref: '#/components/schemas/Film'
 *     responses:
 *       200:
 *         description: Success
 */
 router.post('/', async (req, res) => {
    try {
        req.body.forEach(async (element) => {
            let film = new FilmModel(element.fields)
            film = await film.save()
            // res.status(201).send({film: film})
        });
        res.send("ok")
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * @swagger
 * /api/film:
 *   get:
 *     tags: ["Film"]
 *     description: Get all film
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.get('/', async (req, res) => {
    const films = await FilmModel.find({},null)
    res.send(films)
})

/**
 * @swagger
 * /api/film/{id}:
 *   get:
 *     tags: ["Film"]
 *     description: Get film by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The film id
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
    const film = await FilmModel.findOne({_id: req.params.id})
    if (!film) {
        return res.status(404).send({message: 'film not found'})
    }
    res.send({film: film})
}
)

/**
 * @swagger
 * /api/film/{id}:
 *   put:
 *     tags: ["Film"]
 *     description: Modify film by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The film id
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         $ref: '#/components/schemas/Film'
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
        const film = await FilmModel.findOneAndUpdate({_id: req.params.id}, req.body)
        film.save()
        res.status(201).send({film: film})
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * @swagger
 * /api/film:
 *   delete:
 *     tags: ["Film"]
 *     description: Delete all Films
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.delete('/', async (req, res) => {
    try {
        const films = await FilmModel.find({})
        films.forEach(async (element) => {
            await element.delete()
        })
        res.send("All Films has been deleted !")
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * @swagger
 * /api/film/{id}:
 *   delete:
 *     tags: ["Film"]
 *     description: Delete film by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The film id
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
    const film = await FilmModel.findOne({_id: req.params.id})
    if (!film) {
        return res.status(404).send({film: 'film not found'})
    }
    try {
        await film.delete()
        res.status(201).send({film: film})
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router